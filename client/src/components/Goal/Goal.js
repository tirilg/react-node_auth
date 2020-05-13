import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import "./Goal.css";

export default function Goal() {
    const [goals, setGoals] = useState();
    const [newGoal, setNewGoal] = useState();
    const [loading, setLoading] = useState(true);



/*     async function fetchGoals() {
        await fetch('http://localhost:8080/goals', {
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            setGoals(data);
            setLoading(false);
        })
    } */

    useEffect(() => {

        async function fetchGoals() {
            const response = await axios.get("http://localhost:8080/goals");
            const data = await response.data;
            console.log(response)
            console.log(data)
            setGoals(data);
            setLoading(false);
            
           /* console.log(data) */
        }
        fetchGoals();
        /* async function fetchGoals() {
            try {
                const res = await fetch('http://localhost:8080/goals', {
                    credentials: 'include'
                })
                const data = await res.json();
                setGoals(data);
                setLoading(false);
            } catch(error) {
                console.log(error)
            }
        } 
        fetchGoals();

        */

       /*  fetch('http://localhost:8080/goals', {
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            setGoals(data);
            setLoading(false);
        }) */
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
                    <button>Create goal</button>
                </div>

                {!loading ? (
                    <div>
                        {goals.map(goal => (
                                <div id={goal.id} key={goal.id} className="goal">
                                    <h2>{goal.goal}</h2>
                                    {goal.created_at && <p>{goal.created_at}</p>}
                                    {goal.description && <p>{goal.description}</p>}
                                </div>
                        ))}
                    </div>
            ) : (
                <p>Loading goals...</p>
            )}
          </div>
        </>
    )
}