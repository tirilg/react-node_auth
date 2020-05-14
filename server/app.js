// Import and initialize express
const express = require("express");
const app = express();

// Import Express session 
const session = require('express-session');

// Import rate limiter
const rateLimit = require('express-rate-limit');

// Import cors
const cors = require('cors');


// Express allows POST data in JSON format
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Initialize cors
app.use(
  cors({
    origin: ['http://localhost:8080', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
  })
);

// Initialize session
app.use(
  session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true,
  })
);
  
// Set up routes with our server instance 
const usersRoute = require("./routes/users.js");
const goalsRoute = require("./routes/goals.js");
app.use(usersRoute);
app.use(goalsRoute);



// Set up the database
const Knex = require('knex');
const knexFile = require("./knexfile.js");
const knex = Knex(knexFile.development);

const { Model } = require('objection');

// Give knex instance to objection
Model.knex(knex)



// Limit the amount of requests on the auth routes 
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 4 // limit each IP to 4 requests per windowMS 
})

/* app.use("/users/login", authLimiter); */
/* app.use("/users/signup", authLimiter); */


// Start the server
const port = process.env.PORT || 8080;

app.listen(port, (error) => {
    if (error) {
        console.log("error running the server");
        return;    
    }
    console.log("the server is running on port", port);
});
