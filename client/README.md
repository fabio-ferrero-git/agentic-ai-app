# Web Application

This is the repository for the web application through which we conducted the user study.

To run the application locally, follow the instructions below.

---

## Project Setup

- Install node and npm if you have not already. During development, node version 20.12.2 was used.
- Run the following command in the project directory for the first time to install all required dependencies:
```sh
npm install
```

### Compile and Hot-Reload for Development
Run the following command:
```sh
npm run dev
```
The application will be available at the address which is displayed in the terminal.<br>
The default address is http://localhost:5173 if port 5173 is available. If this port is already in use, it will automatically select the next available port.

### Note:
#### Please ensure that a job parameter is included in the URL in the following manner:
```
http://localhost:5173/?job=X
```
where `X` is the job you want to simulate. The available jobs are:
- Sales: `X = sales`
- Human Resources: `X = human_resources`
- Data Analysis: `X = data_analysis`
- Design Creative: `X = design_creative`
- Product Management: `X = product_management`
- Research: `X = research`
- Information Technology (IT): `X = it`
- Legal: `X = legal`
- Customer Experience: `X = customer_experience`
- Finance Accounting: `X = finance_accounting`

Example:
```
http://localhost:5173/?job=human_resources
```

#### Server Requirement: The server application must be accessible at the following URL: http://127.0.0.1:5000
