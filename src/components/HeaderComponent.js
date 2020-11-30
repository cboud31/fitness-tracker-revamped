import React from 'react'
import {AppBar, Toolbar, Button} from "@material-ui/core"



const HeaderComponent = () => {



    return(
   
        <AppBar position="absolute" style={{ background: "#20639B" }}>
        <Toolbar> Fitness Tracker 
        <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
  
    )



}

export default HeaderComponent;