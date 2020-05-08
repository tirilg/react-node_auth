const router = require("express").Router();

const bcrypt = require("bcrypt");
const saltRounds = 10; 

const User = require("../models/User");


bcrypt.hash("password", saltRounds, (error, hashedPassword) => {
    if(error) {
        console.log(error)
    }
    console.log(hashedPassword)
}) 

bcrypt.compare("password", "$2b$10$YoHngHbbp2BhsytGdrIhsuw.51/9CC8FcawC2SBqSeHyjAneFkYWW", (error, isSame) => {
    if(error) {
        console.log(error)
    }
    console.log(isSame)
})



// User - login
router.post("/users/login", async (req, res) => {
    const { username, password } = req.body;

    if(username && password) {
        //has password and username
        const users = await User.query().select().where({ username: username }).limit(1);
        const user = users[0];

        if(!user) {
            return res.status(404).send({ response: "wrong username" })
        }

        bcrypt.compare(password, user.password, (error, isSame) => {
            if(error) {
                return res.status(500).send({});
            }

            if(!isSame) {
                return res.status(404).send({});
            } else {
                return res.send({ username: user.username })
            }
        });
    } else {
        return res.send({ response: "missing username or password" });
    }
});


// User - signup

router.post("/users/register", (req, res) => {
    const { username, password, repeatPassword } = req.body;

    if(username && password && repeatPassword && password === repeatPassword) {
        if(password.length < 8) {
            return res.send({ response: "password does not fulfill the requirements" });
        } else {
            bcrypt.hash(password, saltRounds, async (error, hashedPassword) => {
                if(error) {
                   return res.status(500).send({});
                }
                try {
                    const existingUser = await User.query().select().where({username: username}).limit(1);

                    if(existingUser[0]) {
                        return res.status(404).send({ response: "user already exists" });
                    } else {
                        const newUser = await User.query().insert({
                            username, 
                            password: hashedPassword
                        });
                        return res.status(200).send({ username: newUser.username });
                    }
                } catch(error) {
                    return res.status(500).send({ response: "something went wrong with the database" });
                }
            });
        }

    } else if (password !== repeatPassword) {
        return res.status(404).send({ response: "Password and repeat password does not match "});
    } else {
        return res.status(404).send({ response: "Missing fields" });
    }
})

module.exports = router;