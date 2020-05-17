const router = require("express").Router();
const User = require("../models/User");

// Bcrypt setup
const bcrypt = require("bcrypt");
const saltRounds = 10; 


// Nodemailer setup
const nodemailer = require('nodemailer');
const smtpcredentials = require('../config/smtp_credentials');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: smtpcredentials.auth.user,
        pass: smtpcredentials.auth.pass
    }
});

// Check if user is authenticated with a session
router.get("/users/is-authenticated", (req, res) => {
    if (!req.session.user) {
        return res.status(401).send({ response: "not authenticated" })
    }
    return res.send({ response: "authenticated", data: req.session.user.username });
});

// Get user profile
router.get('/users/profile', async (req, res) => {
    if(!req.session.user) {
        return res.status(401).send({ response: "You need to log in" });
    }
    req.session.user.password = '';
    return res.send(req.session.user);
});

// Login
router.post("/users/login", async (req, res) => {
    const { username, password } = req.body;

    if(username && password) {
        const user = await User.query().findOne({ username: username }); 

        if(!user) {
            return res.status(404).send({ response: "wrong username/password combination" });
        }

        await bcrypt.compare(password, user.password, (error, isSame) => {
            if(error) {
                return res.status(500).send({ response: "validation error" });
            }
            if(!isSame) {
                return res.status(404).send({ response: "wrong username/password combination" });
            } else {
                req.session.user = user;
                return res.send({ response: "authentication successful", user: user });
            }
        });
    } else {
        return res.status(404).send({ response: "missing fields" });
    }
});


// Sign up
router.post("/users/signup", async (req, res, next) => {
    const { username, email, password, repeatPassword } = req.body;

    if(!username || !email || !password || !repeatPassword){
        return res.status(400).send({ response: "missing fields" });
    }

    if (password && password.length < 8) {
        return res.status(400).send({ response: "password does not fulfill the requirements" });
    }
    
    if (password != repeatPassword ) {
        return res.status(400).send({ response: "passwords do not match" });
    }

    if (username && email) {
        const userExists = await User.query()
            .where('username', username)
            .orWhere('email', email);

            if(userExists.length) {
                return res.status(400).send({ response: "username or email already exists" });
            }
    }
    
    bcrypt.hash(password, saltRounds, async (error, hashedPassword) => {
        if(error) {
           return res.status(500).send({ response: "error creating user" });
        }
    
        try {
            const user = await User.query().insert({ username, email, password: hashedPassword });
            return res.status(200).send({ user, response: "user created" });
        } catch(err) {
            next(err);
        }
    });
})


// Log out
router.get("/users/logout", async (req, res, next) => {
    if(!req.session.user) {
        return res.status(401).send({response: "you need to log in"})
    }

    req.session.destroy(error => {
        if(error) {
            return res.status(500).send({ response: "unable to log out" });
        } else {
            return res.status(200).send({ response: "successfully logged out" });
        }
    })
});


// Send reset password email
router.post('/users/send-reset-password', async (req, res) => {
    const { email } = req.body;

    if(!email) {
        return res.status(404).send({ response: "Missing fields" });
    }

    const existingUser = await User.query().select().where({'email': email }).limit(1);
    if(!existingUser[0]) {
        return res.status(404).send({ response: "No existing user with this email" });
    }

    const mailOptions = {
        from: 'kea.test.tiril@gmail.com',
        to: email,
        subject: 'Reset password',
        html: `<div>Reset password <a href="http://localhost:3000/reset-password/${existingUser[0].id}">here</a></div>`
    }

    transporter.sendMail(mailOptions, function(error, info) {
        if(error) {
            return res.status(500).send({ response: "Something went wrong sending the email"});
        } else {
            return res.send({ response: 'Email sent', info: info.response});
        }
    })
})



// Reset password
router.post('/users/reset-password', async (req, res) => {
    const { id,  newPassword, newRepeatPassword } = req.body

    if (id) {
        const existingUser =  await User.query().select().where({ id }).limit(1);
        if(!existingUser[0]){
            return res.status(500).send({ response: "user does not exist"});
        }
    }

    if (newPassword && newRepeatPassword) {
        if (newPassword && newPassword.length < 8) {
            return res.status(400).send({ response: "password does not fulfill the requirements" });
        }
        
        if(newPassword !== newRepeatPassword){
            return res.status(400).send({ response: "passwords do not match" });
        }

        bcrypt.hash(newPassword, saltRounds, async (error, hashedPassword) => {
            if(error){
                return res.status(500).send({ response: "password could not be hashed" });
            }
            try{
                const updatedUser = await User.query().update({ 
                    password: hashedPassword
                }).where({ id })

                return res.status(200).send({ response: "password successfully updated" });
    
            } catch(error){
                return res.status(500).send({ error: "something went wrong with the database"});
            }
        })
    } else {
        return res.status(404).send({ response: "missing fields" });
    }
})

module.exports = router;