const router = require("express").Router();
const Goal = require(__dirname + "/../models/Goal.js");
const { isAuthenticated } = require(__dirname + "/../helpers/authentication.js");

router.get("/goals", async (req, res, next) => {
    const goals = await Goal.query();
    return res.json(goals); 
});

module.exports = router;