//napravicemo kada implementiramo kategorije i tako to

import { Typography,Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../Components/Login/RegisterForm";
import { useState, useRef } from "react";
import { useEffect } from "react";
import Utility from "../Utility";

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
        const user = {
            email: email.current.value,
            name: name.current.value,
            picture: picture,
            password: password.current.value
        }
        console.log(user)
        Utility.fetchData("http://localhost:3000/api/accounts/register", "POST", user)
        .then(data => {
            if(data)
                navigate("/login");
        })
        .catch(error => console.error(error));
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
