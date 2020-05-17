const router = require("express").Router();
const Goal = require(__dirname + "/../models/Goal.js");

// get all goals of the signed in user
router.get("/goals", async (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).send({ response: "you need to log in" });
    }
    const { id } = req.session.user;
    const goals = await Goal.query().select().where({ user_id: id }).orderBy("created_at", "desc");
    return res.json(goals); 
});

// create a new goal
router.post("/goals", async (req, res) => {
    if (!req.session.user) {
        return res.status(401).send({ response: 'you need to log in' });
    }

    const { goal, description } = req.body;

    if (!goal) {
        return res.status(404).send({ response: "Missing goal title" });
    }

    if (goal && goal.length > 100) {
        return res.status(404).send({ response: "Goal title is too long" });
    }

    if (description && description.length > 200) {
        return res.status(404).send({ response: "Description is too long" });
    }
    
    try {
        const userId = req.session.user.id;
        const newGoal = await Goal.query().insert({
            goal: goal,
            description: description,
            user_id: userId
        });

        return res.json(newGoal);
    } catch (error) {
        return res.status(500).send('something went wrong');
    }

});

// delete a goal
router.delete("/goals", async (req, res) => {
    if (!req.session.user) {
        return res.status(500).send({ response: 'you need to log in' });
    }

    const { id } = req.body;

    try {
        const goal = await Goal.query().deleteById(id);
        return res.json(goal);
    } catch (error) {
        return res.status(500).send('something went wrong');
    }
})

// Update goal complete status
router.patch("/goals", async (req, res) => {
    if (!req.session.user) {
        return res.status(500).send({ response: 'you need to log in' });
    }
    const { id, completed } = req.body;
    
    try {
        const goal = await Goal.query().findById(id).patch({
            completed: completed
        })
        res.json(goal);
    } catch(error) {
        return res.status(500).send('something went wrong');
    }
})

module.exports = router;