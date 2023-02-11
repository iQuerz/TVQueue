import {
    Card,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import MediaItem from "./MediaItem";

function MediaGrid(props) {
    const [hover, setHover] = useState(false);

    return (
        <Box maxHeight={"80vh"}>
            <Card className="media-grid-container" variant="outlined" sx={{maxHeight:"80vh", width:"70vw", backgroundColor:"transparent"}}>
                {
                    props.media.map((media, index) =>{
                        return <MediaItem className="media-grid-element" key={index} media={media}/>
                    })
                } 
            </Card>
        </Box>
    );
}

export default MediaGrid;
