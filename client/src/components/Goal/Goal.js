import React, { useState, useEffect } from 'react';
import "./Goal.css";

export default function Goal() {
    const [goals, setGoals] = useState();
    const [newGoal, setNewGoal] = useState();
    const [newGoalDesc, setNewGoalDesc] = useState();
    const [loading, setLoading] = useState(true);


    function fetchGoals() {
        fetch('http://localhost:8080/goals', {
            credentials: 'include',
            headers: {
                Accept: "application/json",
                        "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            /* console.log(data) */
            setGoals(data);
            setLoading(false);
        })
    }

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
            let newGoals = [...goals];
            newGoals.unshift(data);
            setGoals(newGoals)
            console.log(newGoals)
        })
    }

    useEffect(() => {
        fetchGoals();
    }, []);

    return (
        <>
            <div className="Goal">
                <h1>Goals</h1>
                <div className="createGoal">
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
                    <button onClick={createGoal}>Create goal</button>
                </div>

                {!loading ? (
                    <div>
                        {goals && goals.map(goal => (
                            <div id={goal.id} key={goal.id} className="goal">
                                <h2>{goal.goal}</h2>
                                {goal.created_at && <p>{goal.created_at}</p>}
                                {goal.description && <p>{goal.description}</p>}
                            </div>
                        ))}
                        {goals.length == 0 && <p>No goals yet. Create one now!</p>}
                    </div>
                ) : (
                    <p>Loading goals...</p>
                )}
          </div>
        </>
    )
}