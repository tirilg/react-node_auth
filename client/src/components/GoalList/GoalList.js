import React, { useState, useEffect } from 'react';
import "./GoalList.css";
import GoalForm from '../GoalForm/GoalForm';
import GoalItem from '../GoalItem/GoalItem';

export default function GoalList() {
    const [goals, setGoals] = useState();
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
            setGoals(data);
            setLoading(false);
        })
    }

    useEffect(() => {
        fetchGoals();
    }, []);

    return (
        <>
            <div className="GoalList">
                {/* <h1>Goals</h1> */}
                <GoalForm goals={goals} setGoals={setGoals}/>
                {!loading ? (
                    <div className="list">
                        {goals && goals.map(goal => (
                            <GoalItem
                                key={goal.id}
                                goal={goal}
                                goals={goals}
                                setGoals={setGoals}
                            />
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