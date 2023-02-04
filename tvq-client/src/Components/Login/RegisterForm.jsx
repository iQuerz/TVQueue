import { Card, Box, Typography, TextField, Button } from "@mui/material";

function RegisterForm(props)
{
    return (
        <Box maxWidth={"18em"} >
            <Card className="flex-down seperate-children-small padding">
                <Typography variant="h5"> {props.title} </Typography>
                <TextField label={"Email"} variant="outlined" inputRef={props.email}></TextField>
                <TextField label={"Avatar URL"} variant="outlined" value={props.picutre} onChange={props.onPicutreURLChange}></TextField>
                <img className="avatar" src={props.picutre} alt={props.name}></img>
                <TextField label={"Name"} variant="outlined" inputRef={props.name}></TextField>
                <TextField label={"Passowrd"} variant="outlined" inputRef={props.password} type={"password"}></TextField>
                <TextField label={"Confirm Passowrd"} variant="outlined" inputRef={props.confirmPassword} type={"password"}></TextField>
                <Button variant="contained" size="large" onClick={props.clickHandler}>Register</Button>
            </Card>
        </Box>
    )
}

export default RegisterForm