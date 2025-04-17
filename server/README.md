# Server Application

This is the repository for the server application through which we conducted the user study.

To run the application locally, follow the instructions below.

---

## Prerequisites
The code was developed using Python 3.8.18
<br>
Required Python packages can be installed via:
```bash
pip install -r requirements.txt
```

## Running the Server
Start the server with the following command:
```bash
flask --app server run
```

The server will be available at http://localhost:5000 by default.

---
## Project Structure

The project is organized into the following directories and files:
```
/
├── /llm_prompts            # LLM prompts and related files
│   ├── ask_llm_prompt.py
│   ├── followup_prompt.py
│   ├── update_ask_llm.py
│   └── out_formats.py      # Defines output formats   
│
├── .env                    # Environment variables for the server
├── requirements.txt        # Python package dependencies
└── server.py               # Main server application file
```

### Environment Configuration
The project uses a `.env` file for environment configuration. Currently, the file contains placeholders that must be replaced with actual values before running the application.