"""
LLM API Server

This Flask server provides endpoints for interacting with Perplexity AI's LLM API.
It handles user authentication, chat completion requests, and database logging.
"""

import logging
import os
import random
import sys
import threading
from functools import wraps

import mysql.connector
import requests
import simplejson as json
from dotenv import load_dotenv
from flask import Flask, request, Response
from flask import jsonify
from pydantic import ValidationError
from waitress import serve
from json_repair import repair_json

from llm_prompts import ask_llm_prompt as ask_prompt
from llm_prompts import update_ask_llm as u_prompt
from llm_prompts import followup_prompt as f_prompt
from llm_prompts.out_formats import AskLLMFormat, SuggestedActionModel
from llm_prompts.out_formats import get_message, clean_output_content, get_actions, get_missing_actions
from llm_prompts.out_formats import output_format



def init_logger():
    """
    Initialize and configure a logger for the application.

    Returns:
        logging.Logger: Configured logger instance that outputs to stdout.
    """
    logger = logging.getLogger(__name__)
    logger.setLevel(logging.INFO)  # Changed from WARNING to INFO
    if not logger.handlers:  # Prevent duplicate handlers
        formatter = logging.Formatter(
            fmt="%(asctime)s %(name)s.%(levelname)s: %(message)s",
            datefmt="%Y.%m.%d %H:%M:%S"
        )
        handler = logging.StreamHandler(stream=sys.stdout)
        handler.setFormatter(formatter)
        logger.addHandler(handler)
    return logger


load_dotenv()
LLM_API_KEY = os.getenv("LLM_API_KEY")
PERPLEXITY_API = 'https://api.perplexity.ai/chat/completions'


# Headers for Perplexity API requests
# Contains authorization token and content type for JSON responses
pplx_header = {
    'Authorization': f'Bearer {LLM_API_KEY}',
    'Content-Type': 'application/json'
}


# Temperature settings for different LLM tasks
# Lower values (closer to 0) produce more deterministic/focused responses
# Higher values allow for more creativity/variety
temperature = {
    'ask-llm': 0.05,
    'follow-up-generator': 0.1,
    'update-ask-llm': 0.05
}


# Function to create the payload for Perplexity's Sonar models
# Configures request with proper model, messages, temperature and output format
sonar_payload = lambda msg, option, stream=False: {
    "model": "sonar",
    "messages": msg,
    "temperature": temperature[option],
    "search_domain_filter": [
        "example.com"
    ],
    # https://docs.perplexity.ai/guides/structured-outputs
    "response_format": {
        "type": "json_schema",
        "json_schema": {"schema": output_format[option]},
    },
    "stream": stream
}

pplx_payload = sonar_payload


# Flask Application
app = Flask(__name__)
lock = threading.Lock()
logger = init_logger()
LOGGER_INFO = False


@app.before_request
def log_request_info():
    """
    Flask before_request handler that logs information about incoming requests.

    Logs the request method for all requests. If LOGGER_INFO is True, also logs:
    - Complete request URL
    - Request headers
    - Request body (if present)
    """
    logger.info('Request: %s', request.method)
    if LOGGER_INFO:
        logger.info('Request: %s %s', request.method, request.url)
        logger.info('Headers: %s', request.headers)
        if request.data:
            logger.info('Body: %s', request.data)


@app.after_request
def log_response_info(response):
    """
    Flask after_request handler that processes outgoing responses.

    Currently, disabled logging of response status code (commented out).

    Args:
        response: The Flask response object being returned

    Returns:
        The unchanged response object
    """
    # logger.info('Response: %s', response.status)
    return response



def create_db_connection(db):
    """
    Creates and returns a MySQL database connection.

    Args:
        db (str): The name of the database to connect to.

    Returns:
        mysql.connector.connection: An active database connection

    Note:
        Uses environment variable DB_PWD for the database password.
    """
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password=os.getenv("DB_PWD"),
        database=db
    )


def handle_cors(f):
    """
    Decorator that handles CORS (Cross-Origin Resource Sharing) for Flask routes.

    This decorator:
    1. Handle OPTIONS requests by returning an appropriate response with CORS headers
    2. Allows requests from any origin (*)
    3. Allows OPTIONS, GET, and POST methods
    4. Allows the Content-Type header

    Args:
        f (callable): The route function to wrap

    Returns:
        callable: The wrapped function that handles CORS
    """
    @wraps(f)
    def wrapper(*args, **kwargs):
        if request.method == 'OPTIONS':
            return Response(status=204, headers={
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
                'Access-Control-Allow-Headers': 'Content-Type'
            })
        return f(*args, **kwargs)
    return wrapper



def verify_recaptcha(token, version='v3'):
    """
    Verifies a reCAPTCHA token using Google's verification API.

    Supports both reCAPTCHA v2 and v3 verification modes. For v3 verification,
    also determines if the score is below a threshold (0.5) which would require
    additional v2 verification.

    Args:
        token (str): The reCAPTCHA token to verify
        version (str): The reCAPTCHA version, either 'v2' or 'v3'. Defaults to 'v3'.

    Returns:
        dict: Contains verification results with keys:
            - 'success': Whether verification succeeded (bool)
            - 'score': The verification score (float, v3 only)
            - 'requireV2': Whether v2 verification is needed (bool)

    Note:
        Uses environment variables RECAPTCHA_SECRET_V3 and RECAPTCHA_SECRET_V2
        for the respective secret keys.
    """
    V3_SECRET_KEY = os.getenv('RECAPTCHA_SECRET_V3')
    V2_SECRET_KEY = os.getenv('RECAPTCHA_SECRET_V2')

    secret_key = V3_SECRET_KEY if version == 'v3' else V2_SECRET_KEY
    verification_url = 'https://www.google.com/recaptcha/api/siteverify'

    response = requests.post(verification_url, data={
        'secret': secret_key,
        'response': token
    })

    result = response.json()

    if version == 'v3':
        score = result.get('score', 0)
        return {
            'success': result.get('success', False),
            'score': score,
            'requireV2': score < 0.5  # Threshold for requiring v2 verification
        }
    else:
        return {
            'success': result.get('success', False),
            'requireV2': False
        }



''' 
Endpoint: /llm-log 
'''
@app.route('/llm-log', methods=['POST', 'OPTIONS'], strict_slashes=False)
@handle_cors
def log_data():
    """
    Logs data to the database after verifying reCAPTCHA tokens.

    This endpoint handles both POST and OPTIONS requests for CORS. It validates
    reCAPTCHA tokens if provided, removes the tokens from data before storage,
    and logs the data to the database.

    Request JSON fields:
        recaptcha_token (str, optional): The reCAPTCHA token to verify
        recaptcha_version (str, optional): The version of reCAPTCHA, defaults to 'v3'
        user_id (str): The user identifier

    Returns:
        Response:
            - 200: Data logged successfully
            - 200 with JSON {"requireV2Verification": true}: When v3 score is too low
            - 403: reCAPTCHA verification failed
            - 500: Server error
    """
    cnx = create_db_connection("lam")
    cursor = cnx.cursor()
    try:
        data = request.get_json(force=True)
        token = data.get('recaptcha_token')
        version = data.get('recaptcha_version', 'v3')

        if token:
            verification = verify_recaptcha(token, version)

            if version == 'v3' and verification['requireV2']:
                return jsonify({'requireV2Verification': True}), 200

            if not verification['success']:
                return Response('reCAPTCHA verification failed', status=403)

        # Remove recaptcha data before storing
        data.pop('recaptcha_token', None)
        data.pop('recaptcha_version', None)

        query = "INSERT INTO test_log (user_id,log_data) VALUES (%s, %s)"
        cursor.execute(query, (data['user_id'], json.dumps(data)))
        cnx.commit()
        cnx.close()
        return Response(status=200)
    except Exception as e:
        logger = init_logger()
        logger.info(e)
        try:
            cnx.close()
        except Exception as f:
            return Response(str(f), status=500)
        return Response(str(e), status=500)




''' 
Endpoint: /ask-llm
'''
@app.route('/ask-llm', methods=['POST', 'OPTIONS'], strict_slashes=False)
@handle_cors
def ask_llm_stream():
    """
    Streams LLM responses.

    This endpoint takes input data and a thread context, generates a prompt for the
    LLM, and streams back responses as they become available. It validates responses
    against expected models and sends only new/missing content to reduce bandwidth.

    Request JSON fields:
        dataInput (dict): Input data for the prompt
        thread (list, optional): Previous conversation thread
        exclude_todo (bool, optional): Whether to exclude to-do items, defaults to False

    Returns:
        Response: A streaming response with mime type 'text/event-stream' containing
                 LLM-generated content formatted as JSON in SSE format
    """
    data = request.get_json(force=True)
    data_input = data.get('dataInput')
    thread = data.get('thread')
    exclude_todo = data.get('exclude_todo', False)
    prompt_ask_llm = ask_prompt.prompt_ask_llm(ctx=data_input, thread=thread, exclude_todo=exclude_todo)

    def generate():
        """
        Generator function that yields streamed LLM responses.

        Makes a streaming request to the Perplexity API, processes the incoming
        stream chunks, repairs and validates JSON, and yields only new content
        to the client as Server-Sent Events.

        Yields:
            bytes: Encoded Server-Sent Event data containing JSON responses
        """
        try:
            response = requests.post(
                PERPLEXITY_API,
                headers=pplx_header,
                json=pplx_payload([{'role': 'user', 'content': prompt_ask_llm}], option='ask-llm', stream=True),
                stream=True)

            is_actions_validated = False
            llm_response = []

            if response.status_code == 200:
                for line in response.iter_lines():
                    if line:
                        line = line.decode('utf-8')
                        if line.startswith('data: '):
                            line = line[6:]
                        try:
                            json_chunk = repair_json(line, return_objects=True)
                            if 'choices' in json_chunk and json_chunk['choices']:
                                content = get_message(json_chunk)
                                clean_content = clean_output_content(content, ['```', '\n', 'json']).strip()
                                if clean_content:
                                    content_dict = repair_json(clean_content, return_objects=True)
                                    try:
                                        if not is_actions_validated:
                                            SuggestedActionModel.model_validate(content_dict)
                                            is_actions_validated = True
                                            yield f"data: {json.dumps(content_dict)}\n\n".encode('utf-8')
                                            continue

                                        AskLLMFormat.model_validate(content_dict)
                                        content_dict = get_actions(content_dict)

                                        if llm_response != content_dict:
                                            missing = get_missing_actions(llm_response, content_dict)
                                            for el in missing:
                                                llm_response.append(el)
                                            yield f"data: {json.dumps(missing)}\n\n".encode('utf-8')
                                    except ValidationError:
                                        continue
                        except json.JSONDecodeError:
                            continue
        except Exception as e:
            app.logger.error(f'Error in ask_llm: {str(e)}')
            yield f"data: {json.dumps({'error': 'Internal server error'})}\n\n"

    return Response(
        generate(),
        mimetype='text/event-stream',
        direct_passthrough=True
    )



''' 
Endpoint: /update-ask-llm
'''
@app.route('/update-ask-llm', methods=['POST', 'OPTIONS'])
@handle_cors
def update_ask_llm():
    """
    Updates a previous LLM response based on new input data.

    This endpoint receives data input, generates an update prompt, sends it to the
    Perplexity API, and returns a parsed JSON response.

    Request JSON fields:
        dataInput (dict): Input data containing the content to be updated

    Returns:
        Response: JSON containing the updated LLM response or an error message
            - 200: Successful update with JSON response
            - 400: Missing required fields
            - 500: API request failed
    """
    data = request.get_json(force=True)
    data_input = data.get('dataInput')

    if data_input is None:
        return jsonify({"error": "'original_email' or 'user_response' are required"}), 400
    llm_prompt = u_prompt.prompt_update_ask_llm(data_input)
    try:
        response = requests.post(
            PERPLEXITY_API,
            headers=pplx_header,
            json=pplx_payload([{"role": "user", "content": llm_prompt}], option='update-ask-llm')
        )
        response.raise_for_status()
        follow_up = response.json()['choices'][0]['message']['content'].strip()
        clean_content = follow_up.replace('```json\n', '').replace('\n```', '')
        parsed_follow_up = repair_json(clean_content, return_objects=True)
        return jsonify(parsed_follow_up)

    except requests.exceptions.RequestException as e:
        return jsonify({"error": f"API request failed: {str(e)}"}), 500




''' 
Endpoint: /follow-up-generator
'''
@app.route('/follow-up-generator', methods=['POST', 'OPTIONS'])
@handle_cors
def generate_follow_up():
    """
    Generates follow-up content based on an email thread and options.

    This endpoint takes an email thread, timestamp, options, and username, generates
    a prompt for the LLM, and returns a parsed JSON response with follow-up content.

    Request JSON fields:
        datetime (str, optional): Timestamp for context
        email_thread (list): Previous email thread messages
        options (dict): Configuration options for follow-up generation
        username (str, optional): Username for personalization

    Returns:
        Response: JSON containing the generated follow-up content or an error message
            - 200: Successful generation with JSON response
            - 400: Missing required fields
            - 500: API request failed
    """
    data = request.get_json(force=True)
    datetime = data.get('datetime', None)
    email_thread = data.get('email_thread', None)
    options = data.get('options', None)
    username = data.get('username', None)

    if email_thread is None or options is None:
        return jsonify({"error": "'original_email' or 'user_response' are required"}), 400

    llm_prompt = f_prompt.prompt_follow_up(email_thread, datetime, options, username)

    try:
        response = requests.post(
            PERPLEXITY_API,
            headers=pplx_header,
            json=pplx_payload([{"role": "user", "content": llm_prompt}], option='follow-up-generator')
        )
        response.raise_for_status()
        follow_up = response.json()['choices'][0]['message']['content'].strip()
        clean_content = follow_up.replace('```json\n', '').replace('\n```', '')

        parsed_follow_up = repair_json(clean_content, return_objects=True)

        return jsonify(parsed_follow_up)

    except requests.exceptions.RequestException as e:
        return jsonify({"error": f"API request failed: {str(e)}"}), 500




@app.route('/create-llm-user', methods=['GET', 'OPTIONS'], strict_slashes=False)
def create_llm_user():
    """
    Creates or retrieves a user for LLM interactions.

    This endpoint handles OPTIONS requests for CORS and GET requests to create new users
    or retrieve existing ones based on prolific_id. It assigns users to experimental
    conditions and scenarios, storing this information in the database.

    URL parameters:
        prolific_id (str): Identifier for the user from Prolific
        job (str): User's job information
        condition (str, optional): Explicitly specified condition to assign

    Returns:
        Response: Text containing user_id, assigned_condition, and assigned_scenario
                  separated by commas, with appropriate status code:
            - 200: Successful creation or retrieval
            - 500: Database error
    """
    logger = init_logger()
    if request.method == 'OPTIONS':
        return Response(status=204, headers={
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS, GET',
            'Access-Control-Allow-Headers': 'Content-Type'
        })
    cnx = create_db_connection("lam")
    cursor = cnx.cursor()
    try:
        # First, let's check if another user with the same prolific_id exists
        cursor.execute("SELECT user_id, assigned_condition, assigned_scenario FROM user_model WHERE prolific_id = %s",
                       (request.args.get('prolific_id'),))
        fetched = cursor.fetchone()
        if fetched is not None:
            user_id, assigned_condition, assigned_scenario = fetched
            return Response(str(user_id) + "," + str(assigned_condition) + "," + str(assigned_scenario), status=200,
                            mimetype='text/plain')
        assigned_scenario = random.choice([0, 1, 2])
        sql = "INSERT INTO user_model (prolific_id, job, assigned_scenario) VALUES (%s,%s, %s)"
        cursor.execute(sql, (request.args.get('prolific_id'), request.args.get('job'), assigned_scenario))
        cnx.commit()
        status = 200
        # Return the user_id of the newly-created user
        cursor.execute("SELECT LAST_INSERT_ID()")
        user_id = cursor.fetchone()[0]

        # There are 3 possible systems
        assigned_condition = user_id % 2 if request.args.get('condition') is None else int(request.args.get('condition'))
        cursor.execute("UPDATE user_model SET assigned_condition = %s WHERE user_id = %s",
                       (assigned_condition, user_id))
        cnx.commit()
    except mysql.connector.Error as error:
        logger.error(error)
        cnx.rollback()
        status = 500
        user_id = None
        assigned_condition = -1
        assigned_scenario = -1
    finally:
        # Close the cursor and database connection
        cursor.close()
        cnx.close()

    return Response(str(user_id) + "," + str(assigned_condition) + "," + str(assigned_scenario), status=status,
                    mimetype='text/plain')



if __name__ == "__main__":
    # waitress_logger = logging.getLogger('waitress')
    # waitress_logger.setLevel(logging.INFO)
    serve(app, host='0.0.0.0', port=3050)
