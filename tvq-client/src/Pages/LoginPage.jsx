import { Typography, Box } from "@mui/material";
import { useRef,useState } from "react";
import { Link } from "react-router-dom";
import LoginForm from "../Components/Login/LoginForm";


function LoginPage(props) {
    const email = useRef();
    const password = useRef();
    const Name = useRef();
    const sessionID = useRef(); // ili token kako god ga budemo nazvali 
    const [picture, setPicture] = useState("");
    const [errorMsg, setErrorMsg] = useState();

    //test podaci se lepo prosledjuju u gornju komponentu
    function tryUserLogin(){
        console.log(email.current.value);
        console.log(password.current.value);
        sessionID.current = "testSessionID"
        window.localStorage.setItem('sessionID', sessionID.current.value) // ili token
    }
    return(
        <Box className="flex-down" paddingTop={'5em'}>
            <Typography variant="h1" color="textPrimary" textAlign={'center'}>TVQueue</Typography>
            <Typography variant="h4" color="textSecondary" textAlign={'center'} maxWidth={'20em'} marginBottom={'2em'}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pharetra bibendum tempor.
            </Typography>
            <div className="flex-right seperate-children-big">
                <LoginForm clickHandler={tryUserLogin} email={email} 
                           password={password} ></LoginForm>
            </div>
            <Typography variant="subtitle1" color="red">
                {errorMsg}
            </Typography>
            <Typography variant="subtitle1" color="textPrimary">
                Don't have an account? <Link to="Register">Sign up!</Link>
            </Typography>
        </Box>
    )
}

export default LoginPage