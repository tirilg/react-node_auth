import React, { useState } from 'react';
import "./GoalForm.css"

export default function GoalForm(props) {

    const {
        goals, 
        setGoals
    } = props;

    const [newGoal, setNewGoal] = useState();
    const [newGoalDesc, setNewGoalDesc] = useState();


    // Date formatting
    const date = new Date();
    const formattedDate = date.toLocaleDateString("en-us", {weekday: "long", day: 'numeric', month: 'long', year: "numeric"});

    function createGoal() {
        fetch('http://localhost:8080/goals', {
            credentials: 'include',
            method: 'POST',
            headers: {
                Accept: "application/json",
                        "Content-Type": "application/json"
            },
            body: JSON.stringify({
                goal: newGoal, 
                description: newGoalDesc
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            data.completed = false;
            data.created_at = formattedDate;
            let newGoals = [...goals];
            newGoals.unshift(data);
            console.log("newGoals", newGoals)
            setGoals(newGoals)
        })
    }

    return (
        <div className="GoalForm container">
            <form>
                <input 
                    type="text" 
                    name="title" 
                    placeholder="Goal title" 
                    onChange={e => setNewGoal(e.target.value)}
                />
                <textarea
                    name="description"
                    placeholder="Goal description"
                    onChange={e => setNewGoalDesc(e.target.value)}
                />
                <button type="button" onClick={createGoal}>Create goal</button>
            </form>
        </div>
    )
}