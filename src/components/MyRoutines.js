import React, { useState } from "react";
import { hitAPI } from "../api";
import "./myRoutines.css";
import {TextField, Button, Card, CardHeader, Typography, CardContent, } from '@material-ui/core'
const MyRoutines = (props) => {
  const {
    masterActivitiesList,
    masterRoutinesList,
    getUserId,
    setMasterActivitiesList,
    setMasterRoutinesList,
  } = props;
 // console.log(masterActivitiesList);
  const [myRoutinesList, setMyRoutinesList] = useState([]);
  const [myActivityList, setMyActivityList] = useState([]);
  const [myActivityCount, setMyActivityCount] = useState([]);
  const [myActivityDuration, setMyActivityDuration] = useState([]);
  function addActivity({ id, name }) {
    // function that adds activity to routine
    const newList = [...myActivityList];
    newList.push(id, name);
    setMyActivityList(newList);
  }
  function removeActivity(event) {
    event.preventDefault();
    hitAPI("DELETE", `/routine_activities/${id}`)
      .then((data) => {
        const newActivity = data;
        setmyActivityList(newActivity);
      })
      .catch((error) => {
        console.error(error);
      });
    //hit the api delete endpoint
    // function that removes activity from routine
  }
  function deleteRoutine({ id }) {
    hitAPI("DELETE", `/routines/${id}`).then(console.log)
  }
  let copyArray = [...masterRoutinesList];
  //console.log(copyArray);
  copyArray = copyArray.filter((routine) => routine.creatorId === getUserId);
  // console.log(copyArray);
  return copyArray.map((routine, index) => {
    const { id, creatorId, activities, creatorName, goal, name } = routine;
console.log("post id", id);
    return (
      <div className="routineCard" style={{"marginTop": "200px"}}>
      
        <h1 key={index}>{name}</h1>
        <h3>Goal: {goal}</h3>
        {activities
          ? activities.map((activity, ind) => {
              const {
                routineActivityId,
                name,
                description,
                duration,
                count,
              } = activity;
              console.log("Activity", activity);
              return (
                <div className="activity" >
                  <h4 className="name" key={ind}>Activity: {name}</h4>
                  <h4 classname="description">Description: {description}</h4>
                  <h4 classname="duration">
                    Duration: {duration} mins. Repeat: {count}
                  </h4>
                  <button
                    type="submit"
                    onClick={(event) => {
                      event.preventDefault();
                      // console.log(id);
                      hitAPI(
                        "DELETE",
                        `/routine_activities/${routineActivityId}`
                      )
                        .then((data) => {
                          const newActivity = data;
                          setMyActivityList(newActivity);
                        })
                        .catch((error) => {
                          console.error(error);
                        });
                    }}
                  >
                    X
                  </button>
                </div>
              );
            })
          : ""}
          <div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            addActivity();
          }}
        >
          <label htmlFor="">
            Add a new activity
            <select name="" id="">
              {masterActivitiesList.map((activity, index) => {
                return <option key={index} value={activity.name}>{activity.name}</option>;
              })}
              {/* <option value={masterActivitiesList}>{masterActivitiesList}</option>
              <option value="something">Something</option> */}
            </select>
          </label>
          <input
            type="text"
            placeholder="count"
            value={myActivityCount}
            onChange={(e) => setMyActivityCount(e.target.value)}
          />
          <input
            type="text"
            placeholder="duration"
            value={myActivityDuration}
            onChange={(e) => setMyActivityDuration(e.target.value)}
          />
          <input type="submit" value="Submit" />
        </form>
        <button onClick={deleteRoutine(id)}>Delete</button>
        </div>
      </div>
    );
  });
};
export default MyRoutines;