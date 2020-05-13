const router = require("express").Router();

const bcrypt = require("bcrypt");
const saltRounds = 10; 

const User = require("../models/User");

const { isAuthenticated } = require(__dirname + "/../helpers/authentication.js");


//check if user is authenticated with a session
router.get("/users/is-authenticated", (req, res) => {
    if (!req.session.user) {
        return res.status(401).send({ response: "Not authenticated" })
    }
    return res.send({ response: "Authenticated", data: req.session.user });
});

//get user credentials as long as they are authenticated
router.get("/users", async (req, res, next) => {
    if(req.session.user) {
        const user = await User.query()
            .select("username", "email")
            .findById(req.session.user.id)
            .throwIfNotFound();
        res.json(user);
    }
    return res.status(403).send({response: "you need to log in"})
});

//get user profile
router.get('/users/profile', async (req, res) => {
    console.log(req.session.user)
    if(!req.session.user) {
        return res.send({ response: "You need to log in" });
    }
    return res.send(req.session.user);
});

// User - login
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
                return res.send({ response: "Authentication successful", user: user });
            }
        });
    } else {
        return res.status(404).send({ response: "Missing username or password" });
    }
});


// User - signup

router.post("/users/signup", async (req, res, next) => {
    const { username, email, password, repeatPassword } = req.body;

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
    

    // try creating the user
    bcrypt.hash(password, saltRounds, async (error, hashedPassword) => {
        if(error) {
           return res.status(500).send({});
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
    try {
        req.session.destroy(error => {
            if(error) {
                return res.status(500).send({ response: "Unable to log out" });
            } else {
                return res.status(200).send({ response: "Successfully logged out" });
            }
        })
    } catch (error) {
        next(error);
    }
});



// Reset password
router.post('/users/reset-password/', async (req, res) => {
    const { id,  newPassword, newRepeatPassword } = req.body

    if (id && newPassword && newRepeatPassword) {
        if(newPassword !== newRepeatPassword){
            return res.status(400).send({ response: "passwords do not match" });
        }

        const existingUser =  await User.query().select().where({ id }).limit(1);
        if(!existingUser[0]){
            return res.status(500).send({ response: "user does not exist"});
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