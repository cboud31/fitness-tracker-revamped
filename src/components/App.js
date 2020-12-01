import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import { getToken, clearToken, hitAPI  } from "../api";
import Auth from "./Auth";
import Routines from "../components/Routines";
import Activities from '../components/Activities';
import NewActivityForm from "../components/NewActivityForm";
import "./App.css"
import LoginModal from "../components/LoginModal"
import {Button,AppBar, Toolbar,Modal} from "@material-ui/core"
import NewRoutineForm from "./NewRoutineForm"
//import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';


const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());
    const [getUserId, setUserId] = useState('')
    const [masterRoutinesList, setMasterRoutineList] = useState([]);
    const [masterActivitiesList, setMasterActivitiesList] = useState([]);
    const [open, setOpen] = useState(false);
    const [loginModalOpen, setloginModalOpen] = useState(false)

    const showModal = () => {
        setloginModalOpen(true)
       };
    
      const hideModal = () => {
        setloginModalOpen(false)
      };

    useEffect(() => {
        // if (!isLoggedIn) {
        //   setMasterRoutineList([]);
        //   return;
        // }
        
          hitAPI("GET", "/users/me")
          .then((data) => {
            setUserId(data.username)
            console.log("username", data.username)
          })
          .catch((err) => console.error(err))
        },[isLoggedIn]);


        //  All users regardless of isLoggedIn can view these
  useEffect(() => {
    Promise.all([hitAPI("GET", "/routines"), hitAPI("GET", "/activities")])
      .then((data) => {
        const routines = data[0];
        const activities = data[1];
        setMasterRoutineList(routines);
        setMasterActivitiesList(activities);
        console.log("All routines", routines);
        console.log("All activities", activities);
      })
      .catch((err) => console.error(err));
  }, []);

       
        
  

          return (
            <Router>
                <div className="app" >
                <AppBar position="absolute" style={{ background: "#20639B" }}>
                    <Toolbar> Fitness Tracker 
                    <div className="nav-links">
            <ul>
              <Link style={{"color":"white",
              "textDecoration":"none", "fontWeight":"bold", "fontFamily":"Roboto"}} to="/">Home</Link>
             
            </ul>
            <ul>
            <Link style={{"color":"white",
              "textDecoration":"none", "fontWeight":"bold", "fontFamily":"Roboto"}}to="/routines">Routines</Link>
             
            </ul>
            <ul>
            <Link style={{"color":"white",
              "textDecoration":"none", "fontWeight":"bold", "fontFamily":"Roboto"}}to="/MyRoutines">My Routines</Link>
           
            </ul>
            <ul>
            <Link style={{"color":"white",
              "textDecoration":"none", "fontWeight":"bold", "fontFamily":"Roboto"}}to="/activities">Activities</Link>
            </ul>
            {!isLoggedIn ? 
                    <Button className="loginButton" color="inherit" onClick={() =>{
                        showModal()
                    }}
                    >Login</Button> :<Button
                        onClick={() => {
                           if(isLoggedIn) 
                           hideModal();
                          clearToken();
                          setIsLoggedIn(false);
                        }}
                      >
                        LOG OUT
                      </Button>
            }
                    </div>
                    </Toolbar>
                </AppBar>
               
                  <div>
                 
                  {isLoggedIn ? (
                  <div>
                      <h1>Thanks for logging in!</h1> 
                      <button
                        onClick={() => {
                          clearToken();
                          setIsLoggedIn(false);
                        }}
                      >
                        LOG OUT
                      </button>
                   </div>
                   
                  ):(
                    <div>
                  
          
          
                  {/* <NewActivityForm 
                  /> */}
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

                 
                 
                 </div>
                
                  )}
                  {/* <Switch>
                <Route path="/routines"> */}
             
                
                
                {/* </Route> 
              */}
              <NewActivityForm  
              masterActivitiesList={masterActivitiesList}
              setMasterActivitiesList={setMasterActivitiesList} />
          
                  {/* <Route path="activities"> */}
                  {/* <Activities masterActivitiesList={masterActivitiesList} /> */}
                  {/* </Route> */}
                
                <NewRoutineForm masterRoutinesList= {masterRoutinesList}
                    setMasterRoutineList={setMasterRoutineList}
                />
                <Routines masterRoutinesList= {masterRoutinesList} 
                    setMasterRoutineList={setMasterRoutineList}
                />
             
                  {/* </Switch> */}
            
          
                  </div>
               </div>
          
              </Router>
              );
              };







export default App;