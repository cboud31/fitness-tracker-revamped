import React, {useState} from 'react';

const NewActivityForm = (props) => {
    const [activityName, setActivityName] = useState("");
    const [activitiyDescription, setActivityDescription] = useState("");

    const {masterActivitiesList, setMasterActivitiesList} = props;

    const sendData = {
        name: activityName,
        description: activitiyDescription
    };
    
    return (
        <div id="NewActivityForm">
            <form
            className="form-activity"
            style={{ border: "1px solid black"}}
            onSubmit={(event) => {
                event.preventDefault();
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
        </div>
    )
}

export default NewActivityForm;

/*
endpoint info: method="POST", "/activities"
payload = { "name": "name", "description": "description"}

*/