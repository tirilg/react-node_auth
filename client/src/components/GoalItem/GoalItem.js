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
        description
    } = props.goal;

    
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
    }

    return (
        <div id={id} key={id} className="GoalItem container">
            <h2>{goal}</h2>
            {created_at && <p className="date">{formattedDate}</p>}
            {description && <p>{description}</p>}
            <div>
                <img onClick={() => deleteGoal(id)} src={deleteButton}></img>
            </div>
            {/* <button onClick={() => deleteGoal(id)}>Delete</button> */}
        </div>
    )
}