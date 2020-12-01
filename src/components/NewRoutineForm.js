import React, { useState } from "react";
// importing <Routines /> just to test re-rendering on form submit.
import Routines from "./Routines";
import { hitAPI } from "../api";
const NewRoutineForm = (props) => {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [isPublic, setIsPublic] = useState(null);
  const { masterRoutinesList, setMasterRoutineList } = props;
  const sendData = {
    name: name,
    goal: goal,
    // isPublic?
  };
  const addToRoutineList = (newRoutine) => {
    const routineListClone = [newRoutine, ...masterRoutinesList];
    setMasterRoutineList(routineListClone);
    setName("");
    setGoal("");
    //   setIsPublic(null)?
  };
  return (
    <div id="NewRoutineForm">
      <form
        className="form-routine"
        style={{ border: "1px solid black" }}
        onSubmit={(event) => {
          event.preventDefault();
          hitAPI("POST", "/routines", sendData)
            .then((data) => {
              const newRoutine = data;
              console.log(newRoutine)
              addToRoutineList(newRoutine);
            })
            .catch((err) => console.error(err));
          console.log(sendData);
          // hitAPI ("POST", "/routines", sendData)
          // update and render masterList
          // reset form fields
        }}
      >
        <h3>Create New Routine</h3>
        <p>
          Routine Name:
          <input
            type="text"
            placeholder="Routine Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </p>
        <p>
          Routine Goal:
          <textarea
            type="text"
            placeholder="Routine Goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
        </p>
        <button id="form-routine-submit">SUBMIT</button>
      </form>
      {/* {I imported <Routines /> here just to test for submittal and re-rendering.} */}
      {/* <Routines masterRoutinesList={masterRoutinesList} /> */}
    </div>
  );
};
export default NewRoutineForm;