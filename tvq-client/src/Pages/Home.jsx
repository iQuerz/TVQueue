import { Card,Box,Paper,Typography } from "@mui/material";
import { useState } from "react";
import MediaGrid from "../Components/Custom/MediaGrid";
import MediaItem from "../Components/Custom/MediaItem";
import MediaList from "../Components/Custom/MediaList";
import MediaCarousel from "../Home/MediaCarousel";


function HomePage() {

    const [displayMedia, setDisplayMedia] = useState([]);
    function handleDisplayMediaChange(media){
        setDisplayMedia(media);
    }

    console.log(displayMedia)
  return (
    <Box className="flex-down">
        <MediaCarousel media={displayMedia} onChange={handleDisplayMediaChange}/>
        <MediaGrid media={displayMedia}></MediaGrid>
        <MediaList media={displayMedia}></MediaList>
    </Box>
  );
}

export default HomePage;
