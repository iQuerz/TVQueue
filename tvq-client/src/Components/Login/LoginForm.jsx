import { Card, Box, Typography, TextField, Button } from "@mui/material";

function LoginForm(props)
{
    return (
        <Box maxWidth={"18em"} >
            <Card className="flex-down seperate-children-small padding">
                <Typography variant="h5"> User Login </Typography>
                <TextField label="Email" variant="outlined"  inputRef={props.email} ></TextField>
                <TextField label="Password" variant="outlined"  inputRef={props.password} type="password" ></TextField>
                <Button variant="contained" size="large" onClick={props.clickHandler}>Login</Button>
            </Card>
        </Box>
    )
}

export default LoginForm