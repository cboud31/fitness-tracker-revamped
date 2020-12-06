import React, { useState } from "react";
import { hitAPI } from "../api";
import "./myRoutines.css";
import NewRoutineForm from "./NewRoutineForm";

const MyRoutines = (props) => {
  const {
    masterActivitiesList,
    masterRoutinesList,
    getUserId,
    setMasterActivitiesList,
    setMasterRoutineList,
  } = props;
  // console.log(masterRoutinesList);

  const [activityId, setActivityId] = useState("");
  const [activityCount, setActivityCount] = useState("");
  const [activityDuration, setActivityDuration] = useState("");

  const sendData = {
    activityId: activityId,
    count: activityCount,
    duration: activityDuration,
  };

  const addActivity = (thisRoutine, newRoutineActivity) => {
    const routinesClone = [...masterRoutinesList];
    const index = routinesClone.findIndex(
      (routine) => routine.id === thisRoutine
    );
    routinesClone[index].activities.push(newRoutineActivity);

    setMasterRoutineList(routinesClone);
  };

  const deleteActivity = (thisRoutine, deletedActivity) => {
    // console.log(deletedActivity);
    const routinesClone = [...masterRoutinesList];
    const index = routinesClone.findIndex(
      (routine) => routine.id === thisRoutine
    );
    routinesClone[index].activities.splice(deletedActivity, 1);

    setMasterRoutineList(routinesClone);
  };

  const deleteRoutine = (id) => {
    const newRoutineList = masterRoutinesList.filter((routine) => {
      return routine.id !== id;
    });
    setMasterRoutineList(newRoutineList);
  };

  let copyArray = [...masterRoutinesList];
  copyArray = copyArray.filter((routine) => routine.creatorId === getUserId);

  return (<>

    <NewRoutineForm setMasterRoutineList={setMasterRoutineList}
    masterRoutinesList={masterRoutinesList}/>
    <div>{
    copyArray.map((routine, index) => {
      const { id, creatorId, activities, creatorName, goal, name } = routine;

      // console.log("routine id", id);
      return (
        <div className="routineCard"
        style= {{"marginTop": "15px"}}>
          <h1 key={index}>{name}</h1>
          <h2>Goal: {goal}</h2>
          {activities
            ? activities.map((activity, index) => {
                const {
                  id,
                  routineActivityId,
                  name,
                  description,
                  duration,
                  count,
                } = activity;
                // console.log("Activity", activity);
                return (
                  <div className="activity" key={index}>
                    <h3 className="name">Activity: {name}</h3>
                    <h4 className="description">Description: {description}</h4>
                    <h4 className="duration">
                      Duration: {duration} mins. Repeat: {count}
                    </h4>
                    <button
                      type="submit"
                      onClick={(event) => {
                        event.preventDefault();
                        hitAPI(
                          "DELETE",
                          `/routine_activities/${routineActivityId}`
                        )
                          .then((data) => {
                            console.log(data);
                            const deletedActivity = data;
                            const thisRoutine = data.routineId;
                            deleteActivity(thisRoutine, deletedActivity);
                          })
                          .catch((error) => {
                            console.error(error);
                          });
                      }}
                    >
                      Delete this Activity
                    </button>
                  </div>
                );
              })
            : ""}

          {/* Form to add activity to MyRoutines*/}
          <div>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                hitAPI("POST", `/routines/${id}/activities`, sendData)
                  .then((data) => {
                    console.log(data);
                    const newRoutineActivity = data;
                    const thisRoutine = data.routineId;
                    addActivity(thisRoutine, newRoutineActivity);
                  })
                  .catch(console.error);
              }}
            >
              <label>
                Add a new activity
                <select
                  id="dropDown"
                  onChange={(e) => setActivityId(e.target.value)}
                >
                  {masterActivitiesList.map((activity, index) => {
                    return (
                      <option key={index} value={activity.id}>
                        {activity.name}
                      </option>
                    );
                  })}
                </select>
              </label>

              <input
                type="number"
                placeholder="count"
                // value={activities.count}
                onChange={(e) => setActivityCount(e.target.value)}
              />

              <input
                type="number"
                placeholder="duration"
                // value={activities.duration}
                onChange={(e) => setActivityDuration(e.target.value)}
              />

              <input type="submit" value="Submit" />
            </form>
          </div>

          {/* button to delete routine */}
          <button
            onClick={(event) => {
              event.preventDefault();
              hitAPI("DELETE", `/routines/${id}`)
                .then((data) => {
                  deleteRoutine(data.id);
                })
                .catch(console.error);
            }}
          >
            Delete this Routine
          </button>
        </div>
      );
    })
}</div>
</>
  );
};

export default MyRoutines;
