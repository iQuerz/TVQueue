import { Typography, Box, Button } from "@mui/material";
import { useRef,useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginForm from "../Components/Login/LoginForm";
import Utility from "../Utility";


function LoginPage(props) {
    const navigate = useNavigate();
    const emailLogin = useRef();
    const passwordLogin = useRef();
    const Name = useRef();
    const sessionID = useRef(); // ili token kako god ga budemo nazvali 
    const [picture, setPicture] = useState("");
    const [errorMsg, setErrorMsg] = useState();

    //test podaci se lepo prosledjuju u gornju komponentu
    async function tryUserLogin(){

        const user ={
            email: emailLogin.current.value,
            password: passwordLogin.current.value
        }
        console.log(user)
        Utility.fetchData("http://localhost:3000/api/accounts/login", "POST", user)
        .then(data => {
            if(data && data.status != 400)
            {
                props.onLogin();
                navigate("/home");
            }
        })
        .catch(error => console.error(error));
    }
    function getMe(){
        Utility.fetchData("http://localhost:3000/api/accounts/me")
        .then(data => {
            console.log(data)
        }) 
        .catch(error => console.error(error));
    }

    return(
        <Box className="flex-down" paddingTop={'5em'}>
            <Typography variant="h1" color="textPrimary" textAlign={'center'}>TVQueue</Typography>
            <Typography variant="h4" color="textSecondary" textAlign={'center'} maxWidth={'20em'} marginBottom={'2em'}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pharetra bibendum tempor.
            </Typography>
            <div className="flex-right seperate-children-big">
                <LoginForm clickHandler={tryUserLogin} email={emailLogin} 
                           password={passwordLogin} ></LoginForm>
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