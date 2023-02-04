//napravicemo kada implementiramo kategorije i tako to

import { Typography,Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../Components/Login/RegisterForm";
import { useState, useRef } from "react";
import { useEffect } from "react";

function RegisterPage() {
    const email = useRef();
    const password = useRef();
    const confirmPassword = useRef();
    const name = useRef();
    const sessionID = useRef(); // ili token kako god ga budemo nazvali 
    const [picture, setPicture] = useState("");
    const navigate = useNavigate();

    function handlePictureUrlChange(event){
        setPicture(event.target.value)
    }
    function tryRegister(){
        console.log(email.current.value);
        console.log(password.current.value);
        console.log(confirmPassword.current.value);
        console.log(name.current.value);
        console.log(picture);
    }
    function handleFetchSuccess(){
        navigate('/')
    }
    return(
        <Box className="flex-down" marginTop={'5em'}>
            <Typography variant="h1">Register</Typography>
            <div className="flex-right seperate-children-big">                     
                <RegisterForm email={email} name={name} picutre={picture} password={password} confirmPassword={confirmPassword} 
                onPicutreURLChange={handlePictureUrlChange}
                clickHandler={tryRegister}></RegisterForm>
            </div>   
        </Box>

    )
}

export default RegisterPage
