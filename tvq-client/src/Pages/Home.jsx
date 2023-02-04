import { Card,Box, Typography } from "@mui/material";
import { useState } from "react";
import MediaItem from "../Components/Custom/MediaItem";
import MediaCarousel from "../Home/MediaCarousel";


function HomePage() {

    const [displayMedia, setDisplayMedia] = useState([]);
    function handleDisplayMediaChange(media){
        setDisplayMedia(media);
    }

    console.log(displayMedia)
  return (
    <Box>
        <MediaCarousel media={displayMedia} onChange={handleDisplayMediaChange}/>
        <Typography> Test lista</Typography>
        <Card className="flex-right" >
            {
                displayMedia.map((media,index) =>{
                    return <MediaItem key={index} media={media}> </MediaItem>
                })
            } 
        </Card>
        <Typography> Test lista</Typography>
        <Card className="flex-right">
            {
                displayMedia.map((media,index) =>{
                    return <MediaItem key={index} media={media}> </MediaItem>
                })
            } 
        </Card>
        <Typography> Test lista</Typography>
        <Card className="flex-right">
            {
                displayMedia.map((media,index) =>{
                    return <MediaItem key={index} media={media}> </MediaItem>
                })
            } 
        </Card>
    </Box>
  );
}

export default HomePage;
