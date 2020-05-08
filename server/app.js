// Import and initialize express
const express = require("express");
const app = express();

// Express allows POST data in JSON format
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Set up the database
const Knex = require('knex');
const knexFile = require("./knexfile.js");
const knex = Knex(knexFile.development);

const { Model } = require('objection');


// Give knex instance to objection
Model.knex(knex)


// Limit the amount of requests on the auth routes 
const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 4 // limit each IP to 4 requests per windowMS 
})

app.use("/users/login", authLimiter);
app.use("/users/regiser", authLimiter);


// Set up routes with our server instance 
const usersRoute = require("./routes/users.js");
app.use(usersRoute);


// Start the server
const port = process.env.PORT || 1111;

app.listen(port, (error) => {
    if (error) {
        console.log("error running the server");    
    }
    console.log("the server is running on port", port);
});