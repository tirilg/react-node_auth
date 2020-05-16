import React, { useState } from 'react';
import "./GoalItem.css"
import deleteButton from "../../img/delete.svg"

export default function GoalItem(props) {

    const {
        goals,
        setGoals
    } = props;

    const {
        id,
        goal,
        created_at,
        description,
        completed
    } = props.goal;

    const [error, setError] = useState('');
    
    // Date format
    const date = new Date(created_at);
    const formattedDate = date.toLocaleDateString("en-us", {weekday: "long", day: 'numeric', month: 'long', year: "numeric"});

    function deleteGoal(id) {
        fetch('http://localhost:8080/goals', {
            credentials: 'include',
            method: "DELETE",
            headers: {
                Accept: "application/json",
                        "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            const index = goals.findIndex(x => x.id === id);
            const newGoals = [...goals];
            newGoals.splice(index, 1);
            setGoals(newGoals);
        })
        .catch(error => {
            setError(error);
        })
    }

    function updateGoalStatus(id) {
        console.log(id);
        const index = goals.findIndex(x => x.id === id);
        const newGoals = [...goals];
        newGoals[index].completed = newGoals[index].completed ? false : true;
        setGoals(newGoals);

        console.log(completed)
        fetch('http://localhost:8080/goals', {
            credentials: 'include',
            method: "PATCH",
            headers: {
                Accept: "application/json",
                        "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id,
                completed: newGoals[index].completed
            })
        })
        .then(res => res.json())
        .then(data => {
            /* console.log(data) */
        })
        .catch(error => {
            setError(error);
        })
    }

    return (
        <div id={id} key={id} className="GoalItem container">
            <h2>{goal}</h2>
            {created_at && <p className="date">{formattedDate}</p>}
            {description && <p>{description}</p>}
            <div>
                <div> 
                    {completed === 'true' ? <button type="button" onClick={() => updateGoalStatus(id)}>Completed</button> : <button type="button" onClick={() => updateGoalStatus(id)}>Complete</button>}
                    <img onClick={() => deleteGoal(id)} src={deleteButton}></img>
                </div>
                <div>  
                </div>
            </div>
        </div>
    )
}