import { Card,Box,Paper,Typography } from "@mui/material";
import { useState } from "react";
import MediaGrid from "../Components/Media/MediaGrid";
import MediaItem from "../Components/Media/MediaItem";
import MediaList from "../Components/Media/MediaList";
import MediaCarousel from "../Components/Media/MediaCarousel";


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
        <MediaList title={"Featured"} media={displayMedia}></MediaList>
    </Box>
  );
}

export default HomePage;
