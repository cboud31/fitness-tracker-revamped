import React from "react";

import Routines from "./Routines";
import NewRoutineForm from "./NewRoutineForm";

function addActivity(params) {
  // funtion that adds activity to rotuine
}

function removeActivity(params) {
  // function that removes activity from rotuine
}

function deleteRoutine(params) {
  // function that deletes routine from  masterRoutinelist
}

const MyRoutines = (props) => {
  console.log(props);
  const {masterActivitiesList, masterRoutinesList, setMasterRoutineList} = props;

  return masterRoutinesList.map((routine, index) =>{
    
    const {id, creatorId, activities, creatorname, goal, name} = routine;

    if (creatorId === {/** logged in persons id */}) {
      return (
        <div className="routineCard">
          <h1 key={index}>{name}</h1>
          <h2>Goal: {goal}</h2>
          {activities
            ? activities.map((activity, index) => {
                const { name, description, duration, count } = activity;
                console.log(activity);
  
                return (
                  <div className="activity">
                    <h3 key={index} className="name" onClick={(event) =>{
                        console.log(event);
                        // create function that shows all routines this activity is in
                    }}>
                      Activity: {name}
                    </h3>
                    <h4 className="description">Description: {description}</h4>
                    <h4 className="duration">
                      Duration: {duration} mins. Repeat: {count}
                    </h4>
                  </div>
                );
              })
            : ""}
          <h4 onClick={(event)=>{
              console.log(event);
              // create function that shows all routines by this user
          }}>Created by: {creatorName}</h4>
          <form action="edit"></form>
        </div>
      );
    }
  })



  return (<h1>MyRoutines will go here.</h1>);
};

export default MyRoutines;
