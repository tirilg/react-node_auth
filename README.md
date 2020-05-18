# react-node_auth

A simple Goals web application built with React, Knex, Objection, Express and MySQL.
In order for the server to run, you need to have installed NodeJS, MySQL and Knex globally.
Remember to run the server and client at the same time. 


Follow these steps to run the server: 

1. Log in into your local MySQL DB.
2. Create a database.
3. Navigate to the /server/config/ folder and create a file "db_credentials.js" by copying the template and replace the database name, the username and password with your own credentials.
4. Open an IDE, navigate to the folder /server/ and run "npm install"
5. After all the packages are installed, while still in the server folder, run the following commands in this order: "npm run migrate:rollback", "npm run migrate:latest" and "npm run seed:run"
6. When all the migrations and seeds completed, you can start the server by running "nodemon app.js" and in the terminal the message server is listening on port 8080 should appear.

To make nodemailer work: 

1. Navigate to the /server/config/ folder and create a file "smtp_credentials.js" by copying the template and replacing the auth information with your own. Make sure you have the security setting "Allow less secure apps" turned on in your gmail settings. Could be a good idea to use an email for test purposes in this scenario. 

Follow these steps to run the React project:
1. In your IDE, navigate to client/ and run "npm install" followed by "npm run start" to run the project. 
