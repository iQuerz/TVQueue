import {
    Box,
    Button,
    Card,
    CardHeader,
    MenuItem,
    Modal,
    Rating,
    Select,
    TextField,
    Typography,
    } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
  
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "50%",
        bgcolor: "var(--white)",
        boxShadow: 24,
        p: 4,
    };
  
    function ReviewModal(props) {

        const [reviewVal, setReviewVal] = useState(0);
        const [reviewText, setReviewText] = useState("");
    
        function submitReview(){
            //fetch ka serveru
        }

        return (
        <>
            <Modal open={props.open}>
                <Card sx={style} className="flex-down seperate-children-small">
                    <Typography variant="h3" textAlign={"center"}>Leave a review</Typography>
                    <Rating max={10} onChange={(event) => {setReviewVal(event.target.value)}}></Rating>
                    <Typography textAlign={"center"}>How did you like this movie/show? Tell others about it. No spoilers!</Typography>
                    <TextField multiline fullWidth onChange={(event)=>{setReviewText(event.target.value)}}></TextField>
                    <Typography variant="h5" width={"80%"} textAlign={"left"}></Typography>
                    <Box className="flex-right seperate-children-small">
                        <Button variant="contained" size="large" onClick={()=>{submitReview();props.onClick(false)}}>Submit</Button>
                        <Button variant="contained" size="large" color="error" onClick={()=>{props.onClick(false)}}>Cancel</Button>
                    </Box>
                </Card>
            </Modal>
        </>
        );
    }

    export default ReviewModal