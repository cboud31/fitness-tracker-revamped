import React, {useState} from 'react';
// importing <Activities /> just to test re-rendering on form submit.
import Activities from './Activities';
import {hitAPI} from "../api";
const NewActivityForm = (props) => {
    const [activityName, setActivityName] = useState("");
    const [activitiyDescription, setActivityDescription] = useState("");
    const {masterActivitiesList, setMasterActivitiesList} = props;
    console.log("<NewActivityForm/>", masterActivitiesList)
    const sendData = {
        name: activityName,
        description: activitiyDescription
    };
    const addToActivityList = (newActivity) => {
        const activityListClone = [newActivity, ...masterActivitiesList]
        setMasterActivitiesList(activityListClone)
        setActivityName("");
        setActivityDescription("");
    }
    return (
        <div id="NewActivityForm">
            <form
            className="form-activity"
            style={{ border: "1px solid black"}}
            onSubmit={(event) => {
                event.preventDefault();
                hitAPI("POST", "/activities", sendData)
                .then( data => {
                    const newActivity = data;
                    addToActivityList(newActivity);
                    console.log(data)})
                .catch( err => console.error(err) )
                console.log(sendData)}}
            // event.preventDefault();
            // onSubmit= fetchAPI(`${BASE_URL}/activities`, "POST", sendData)
            // addToMasterActivityList(activity)
            // reset form fields (set....(""))
            >
                <h3>Create New Activity:</h3>
                <p>Activity Name:
                    <input
                    type="text"
                    placeholder="Activity Name"
                    // style={{ width: "100%"}}
                    value={activityName}
                    onChange={(e) => setActivityName(e.target.value)}
                     />
                </p>
                <p>Activity Description:
                    <textarea
                    type="text"
                    placeholder="Activity Description"
                    value={activitiyDescription}
                    onChange={(e) => setActivityDescription(e.target.value)} />
                </p>
                <button id="form-activity-submit">SUBMIT</button>
            </form>
            <Activities masterActivitiesList={masterActivitiesList}/>
        </div>
    )
}
export default NewActivityForm;
/*
endpoint info: method="POST", "/activities"
payload = { "name": "name", "description": "description"}
*/