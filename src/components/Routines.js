import React from 'react';

const Routines = (props) => {
    const {masterRoutinesList, setMasterRoutineList} = props;

    console.log( "Master Routine", masterRoutinesList);



    return (masterRoutinesList.map((routine, indx) => {
        const {activities, creatorName, goal, name} = routine
    
        return <div className="routineCard">
            <h1>Routine Starts here</h1>
            <h2 key={indx}>{name}</h2>
            <h3>{goal}</h3>
            <h4>{creatorName}</h4>
            { activities ? activities.map((activity, index)=> {
                const {name, description, duration, count} = activity;

            return <><h2 key={index}>{name}</h2>
            <h3>{description}</h3>
            <h4>Duration, {duration} mins</h4>
            <h4>Reps, {count}</h4>
                </>
            }):''}
            </div>
    }))
}



export default Routines;