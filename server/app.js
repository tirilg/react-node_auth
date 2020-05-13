// Import and initialize express
const express = require("express");
const app = express();

// Import Express session and Knex session store
const session = require('express-session');
/* const KnexSessionStore = require("connect-session-knex")(session); */

// Import rate limiter
const rateLimit = require('express-rate-limit');

const cors = require('cors');


// Express allows POST data in JSON format
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// cors
/* app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
      "Access-Control-Allow-Methods",
      "POST,GET,OPTIONS,PUT,DELETE, PATCH"
    );
    next();
}); */



app.use(
  cors({
    origin: ['http://localhost:8080', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true, // enable set cookie
  })
  );
  
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


/* const store = new KnexSessionStore({ knex }); */

// session
/* app.use(
  session({
    secret: "secret",
    name: "user_sid",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 300000
    },
    store: store
  })
); */



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
