import React, { useState } from "react";
import { auth } from "../api";
import { TextField, Button, Container } from "@material-ui/core";



const Auth = (props) => {
    const { setIsLoggedIn } = props;
  
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);


return (
    <Container>
<form className="loginForm" onSubmit={(event) => event.preventDefault()}>
      <h3>Register or Log In</h3>
      {errorMessage ? <h5 className="error">{errorMessage}</h5> : null}
      <TextField
        type="text"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        placeholder="username"
      />
      <br></br>
      <TextField
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="password"
      />
      <br></br>
      <div>
      <Button 
      
        onClick={async (event) => {
          try {


            const result = await auth(username, password, true);

            setIsLoggedIn(true);
          } catch (error) {
            setErrorMessage(error.message);
            console.log("register attempt")
          }
        }}
      >
        Register
      </Button>
   
   
      <Button 
      
        onClick={async (event) => {
          try {
            const result = await auth(username, password);
            setIsLoggedIn(true);
          } catch (error) {
            setErrorMessage(error.message);
          }
        }}
      >
        Log In
      </Button>
      </div>
     
    </form>
    </Container>
  );
};






export default Auth;