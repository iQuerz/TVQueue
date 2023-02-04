import {
    Card,
    CardActionArea,
    CardMedia,
    Typography,
    CardContent,
    Button,
    CardActions,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import MediaItem from "./MediaItem";

function MediaList(props) {
    const [hover, setHover] = useState(false);

    return (
        <Box height={"40vh"} width={"70vw"} margin={"3em"}>
            <Typography variant="h4">Featured:</Typography>
            <Card className="padding media-list-container" variant="outlined" sx={{ width:"70vw", backgroundColor:"transparent"}}>
                {
                    props.media.map((media, index) =>{
                        return <MediaItem className="media-list-element" key={index} media={media}/>
                    })
                } 
            </Card>
        </Box>
    );
}

export default MediaList;
