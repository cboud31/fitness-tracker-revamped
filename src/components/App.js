import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import { getToken, clearToken, hitAPI } from "../api";

import {
  Auth,
  Activities,
  Routines,
  // MyRoutines,
  NewActivityForm,
  NewRoutineForm,
  NavButtons,
  Home,
} from "../components";

import "./App.css";
import LoginModal from "../components/LoginModal";
import { Button, AppBar, Toolbar, Modal } from "@material-ui/core";
import MyRoutines from "./MyRoutines";
import HomePage from "./HomePage"

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());
  const [getUserId, setUserId] = useState("");
  const [masterRoutinesList, setMasterRoutineList] = useState([]);
  const [masterActivitiesList, setMasterActivitiesList] = useState([]);
  const [open, setOpen] = useState(false);
  const [loginModalOpen, setloginModalOpen] = useState(false);

  const showModal = () => {
    setloginModalOpen(true);
  };

  const hideModal = () => {
    setloginModalOpen(false);
  };

  // Sets userId after log-in:
  useEffect(() => {
    hitAPI("GET", "/users/me")
      .then((data) => {
        setUserId(data.id);
      })
      .catch((err) => console.error(err));
  }, [isLoggedIn]);

  //  All users regardless of isLoggedIn can view these
  useEffect(() => {
    Promise.all([hitAPI("GET", "/routines"), hitAPI("GET", "/activities")])
      .then((data) => {
        const routines = data[0];
        const activities = data[1];
        setMasterRoutineList(routines);
        setMasterActivitiesList(activities);
        // console.log("All routines", routines);
        // console.log("All activities", activities);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <Router>
      <div className="app">
        <AppBar position="absolute" style={{ background: "#20639B" }}>
          <Toolbar>
            {" "}
            <div className="nav-links">

          
              <NavButtons
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                setloginModalOpen={setloginModalOpen}
              />
           
            </div>
          </Toolbar>
        </AppBar>

        <main className="main-section">

  
            
            {isLoggedIn ? (
              null  
           
            ) : (
              <div>
                <Modal
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  open={loginModalOpen}
                  onClose={hideModal}
                >
                  <div>
                    <Auth setIsLoggedIn={setIsLoggedIn} />
                  </div>
                </Modal>
              </div>
            )}

      
              

      
            <Switch>

           

              <Route path="/activities">
                <Activities masterActivitiesList={masterActivitiesList} />
              </Route>
           

              <Route path = "/routines">
                <Routines
                  masterRoutinesList={masterRoutinesList}
                  setMasterRoutineList={setMasterRoutineList}
                />
                </Route>
                <Route path="/home">
              <HomePage />
            </Route>

                <Route>
                  <MyRoutines masterActivitiesList={masterActivitiesList}
                    masterRoutinesList={masterRoutinesList}
                  />
                </Route>
            
            </Switch>
     
        </main>
        
      </div>
    </Router>

   
  );
};

export default App;
