import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import GoalForm from '../GoalForm/GoalForm';
import GoalItem from '../GoalItem/GoalItem';
import "./GoalList.css";

export default function GoalList() {
    const [goals, setGoals] = useState();
    const [loading, setLoading] = useState(true);

    const history = useHistory();

    
    useEffect(() => {
        let isFetching = true

        fetch("http://localhost:8080/goals", {
            credentials: "include",
            headers: {
                Accept: "application/json",
                        "Content-Type": "application/json"
            }
        })
        .then(res => {
            if(isFetching) {
                if(res.status === 401) {
                    return history.push("/");
                } else {
                    return res.json();
                }
            }
        })
        .then(data => {
            if(isFetching) {
                setGoals(data);
                setLoading(false);
            }
        }) 
        return () => isFetching = false;
    }, []);

    return (
        <>
            <div className="GoalList">
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
                        {goals.length === 0 && <p>No goals yet. Create one now!</p>}
                    </div>
                ) : (
                    <p>Loading goals...</p>
                )}
          </div>
        </>
    )
}