import {
    Card,
    CardActionArea,
    CardMedia,
    Typography,
    CardContent,
    Button,
    CardActions,
    Rating,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import {useNavigate } from "react-router-dom";

function MediaItem(props) {
    const [hover, setHover] = useState(false);

    const navigate = useNavigate();
    function showMore(){
        //ovde cemo i guess u local storage da stavimo media koju je izabrao i na onaj sajt cemo da fethujemo podatke o njemu i guess
        window.localStorage.setItem('pickedMedia', props.media.name) //bice id 
        navigate("/media")
    }
    return (
        <Card className={props.className} sx={{ minWidth:"12em", width:"12em", height:"23em" }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}>
            <Box className="flex-down" sx={{justifyContent:"space-between", height:"100%"}}>
                <CardActionArea>
                    <CardMedia
                        sx={{ height: "15em" }}
                        title={props.media.name}
                        image={props.media.picture}
                    />
                </CardActionArea>
                <CardContent>
                    <Typography variant="h6" component="div">
                        {props.media.name}
                    </Typography>
                    
                </CardContent>
                <Rating name="read-only" value={props.media.rating} readOnly />
                <CardActions className="flex-right">         
                    <Button onClick={showMore} size="medium">More</Button>
                    <Button size="medium">Add to</Button>
                </CardActions>
            </Box>
        </Card>
    );
}

export default MediaItem;