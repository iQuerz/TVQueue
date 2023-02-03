import { Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";


function LoginPage(props) {
    
    return(
        <Box className="flex-down" paddingTop={'5em'}>
            <Typography variant="h1" color="textPrimary" textAlign={'center'}>TVQueue</Typography>
            <Typography variant="h4" color="textSecondary" textAlign={'center'} maxWidth={'20em'} marginBottom={'2em'}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pharetra bibendum tempor.
            </Typography>
            <Typography variant="subtitle1" color="textPrimary">
                Don't have an account? <Link to="Register">Sign up!</Link>
            </Typography>
        </Box>
    )
}

export default LoginPage