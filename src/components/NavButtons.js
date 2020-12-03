import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  useParams,
} from "react-router-dom";

import { Button, AppBar, Toolbar, Modal } from "@material-ui/core";
import { getToken, clearToken, hitAPI } from "../api";
// import {showModal} from "./components/App"

const NavButtons = (props) => {
  const { isLoggedIn, setIsLoggedIn, setloginModalOpen } = props;

  const showModal = () => {
    setloginModalOpen(true);
  };

  const hideModal = () => {
    setloginModalOpen(false);
  };

  return (
    <div id="NavButtons">
      <h3>Fitness Tracker</h3>
      <div className="menu">
        {!isLoggedIn ? (
          // Links to Routines, Activities & Home(?) , Log-in Modal (?)
          <>
            <Link to="#">
              <Button className="nav-button" variant="contained">
                HOME
              </Button>
            </Link>

            <Link to="/routines">
              <Button variant="contained">ROUTINES</Button>
            </Link>

            <Link to="/activities">
              <Button variant="contained">ACTIVITIES</Button>
            </Link>

            <Button
              className="loginButton"
              color="inherit"
              onClick={() => {
                showModal();
              }}
            >
              Login
            </Button>
          </>
        ) : (
          // 3 Above Components + MyRoutines
          <>
            <Link to="#">
              <Button variant="contained" color="default">
                HOME
              </Button>
            </Link>

            <Link to="#">
              <Button variant="contained" color="default">
                MY ROUTINES
              </Button>
            </Link>

            <Link to="/routines">
              <Button variant="contained" color="default">
                ROUTINES
              </Button>
            </Link>

            <Link
              to="/activities"
              style={{
                color: "white",
                textDecoration: "none",
                fontWeight: "bold",
                fontFamily: "Roboto",
              }}
            >
              <Button variant="contained" color="default">
                ACTIVITIES
              </Button>
            </Link>

            <Button
              onClick={() => {
                if (isLoggedIn) hideModal();
                clearToken();
                setIsLoggedIn(false);
              }}
            >
              LOG OUT
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default NavButtons;
