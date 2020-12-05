import React, { useState } from "react";
// Material-UI Dialog imports:
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
// Material-UI FAB imports:
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

// importing <Activities /> just to test re-rendering on form submit.
import Activities from "./Activities";
import { hitAPI } from "../api";

const NewActivityForm = (props) => {
  const [activityName, setActivityName] = useState("");
  const [activitiyDescription, setActivityDescription] = useState("");
  const [open, setOpen] = useState(false);

  const { masterActivitiesList, setMasterActivitiesList } = props;
  // console.log("<NewActivityForm/>", masterActivitiesList)

  //   open/close Dialog form:
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const sendData = {
    name: activityName,
    description: activitiyDescription,
  };

  const addToActivityList = (newActivity) => {
    const activityListClone = [...masterActivitiesList, newActivity];
    setMasterActivitiesList(activityListClone);
    setActivityName("");
    setActivityDescription("");
  };

  console.log(masterActivitiesList);

  const filteredActivities = () => {
    return masterActivitiesList.filter((activity) => {
      return activity.name.toLowerCase().includes(activityName.toLowerCase());
    });
  };

  return (
    <div id="NewActivityForm">
      <Fab
        color="primary"
        aria-label="add"
        onClick={handleClickOpen}
        style={{
          position: "fixed",
          bottom: "1.5rem",
          right: "1.5rem",
        }}
      >
        <AddIcon />
      </Fab>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create New Activity</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Activity Name"
            type="name"
            fullWidth
            value={activityName}
            onChange={(e) => setActivityName(e.target.value)}
          />
          <DialogContentText>Error message can go here.</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Activity Description"
            type="name"
            fullWidth
            value={activitiyDescription}
            onChange={(e) => setActivityDescription(e.target.value)}
          />
          <DialogContentText>Error message can go here.</DialogContentText>
          <DialogContentText>
            The activity is {activityName}.
            {filteredActivities() == true ? "ACTIVITY ALREADY EXISTS" : null}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
              setActivityName("");
              setActivityDescription("");
            }}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={(event) => {
              event.preventDefault();
              hitAPI("POST", "/activities", sendData)
                .then((data) => {
                  const newActivity = data;
                  addToActivityList(newActivity);
                  console.log(data);
                  handleClose();
                })
                .catch((err) => console.error(err));
            }}
            color="primary"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* 1) Write a function that will filter over activities */}
      {/* 
      <form
        className="form-activity"
        style={{ border: "1px solid black" }}
        onSubmit={(event) => {
          event.preventDefault();
          hitAPI("POST", "/activities", sendData)
            .then((data) => {
              const newActivity = data;
              addToActivityList(newActivity);
              console.log(data);
            })
            .catch((err) => console.error(err));
          console.log(sendData);
        }}
        // event.preventDefault();
        // onSubmit= fetchAPI(`${BASE_URL}/activities`, "POST", sendData)
        // addToMasterActivityList(activity)
        // reset form fields (set....(""))
      >
        <h3>Create New Activity:</h3>
        <p>
          Activity Name:
          <input
            type="text"
            placeholder="Activity Name"
            // style={{ width: "100%"}}
            value={activityName}
            onChange={(e) => setActivityName(e.target.value)}
          />
        </p>
        <p>
          Activity Description:
          <textarea
            type="text"
            placeholder="Activity Description"
            value={activitiyDescription}
            onChange={(e) => setActivityDescription(e.target.value)}
          />
        </p>
        <button id="form-activity-submit">SUBMIT</button>
      </form>
*/}
    </div>
  );
};
export default NewActivityForm;
/*
endpoint info: method="POST", "/activities"
payload = { "name": "name", "description": "description"}
*/
