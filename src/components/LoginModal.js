import React, {useState} from 'react'
import ReactDOM from "react-dom";
import {Modal, Button} from "@material-ui/core"
import Auth from "./Auth";
import "./Modal.css"





const LoginModal = (props) =>{

 
  
    const {open, setOpen} = props;

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="paper">
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Open Modal
            </Button>

            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >
                <div>
                 <Auth />
                </div>
            </Modal>
            </div>
      );



}

export default LoginModal