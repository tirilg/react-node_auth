import React, { useState } from 'react';
import "./GoalForm.css"

export default function GoalForm(props) {

    const {
        goals, 
        setGoals
    } = props;

    const [newGoal, setNewGoal] = useState();
    const [newGoalDesc, setNewGoalDesc] = useState();
    const [error, setError] = useState('');


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
            if(data.response == "Missing goal title") {
                setError('Goal title missing')
            } else if(data.response == "Goal title is too long") {
                setError('Goal title too long')
            } else if(data.response == "Description is too long") {
                setError('Description is too long')
            } else { 
                data.completed = false;
                data.created_at = formattedDate;
                let newGoals = [...goals];
                newGoals.unshift(data);
                setGoals(newGoals);
                setError('');
                document.querySelector('form').reset();
            }

        })
        .catch(error => {
            setError(error);
        })
    }

    return (
        <div className="GoalForm container">
            <form>
                <input className={error.includes("Missing") ? "input-error" : ""}
                    type="text" 
                    name="title"
                    placeholder="Goal title" 
                    maxLength="100"
                    onChange={e => setNewGoal(e.target.value)}
                />
                <textarea
                    name="description"
                    placeholder="Goal description"
                    maxLength="200"
                    onChange={e => setNewGoalDesc(e.target.value)}
                />
                <button type="button" onClick={createGoal}>Create goal</button>
            </form>
            {error ? <p>{error}</p> : ""}
        </div>
    )
}