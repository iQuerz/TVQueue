import { Card,Box, Typography } from "@mui/material";
import MediaItem from "../Components/Custom/MediaItem";


function HomePage() {

    const listOfMedia = [
        {name:"The Last of us",
        picture:"https://image.api.playstation.com/vulcan/ap/rnd/202206/0720/eEczyEMDd2BLa3dtkGJVE9Id.png",
        descritpion:"After a global pandemic destroys civilization, a hardened survivor takes charge of a 14-year-old girl who may be humanity's last hope."},
        {name:"Shrek",
        picture:"https://m.media-amazon.com/images/M/MV5BOGZhM2FhNTItODAzNi00YjA0LWEyN2UtNjJlYWQzYzU1MDg5L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1000_.jpg",
        descritpion:"A mean lord exiles fairytale creatures to the swamp of a grumpy ogre, who must go on a quest and rescue a princess for the lord in order to get his land back."},
        {name:"Avatar: The Way of Water",
        picture:"https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_FMjpg_UX1000_.jpg",
        descritpion:"Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na'vi race to protect their home."},
        {name:"The Last of us",
        picture:"https://image.api.playstation.com/vulcan/ap/rnd/202206/0720/eEczyEMDd2BLa3dtkGJVE9Id.png",
        descritpion:"After a global pandemic destroys civilization, a hardened survivor takes charge of a 14-year-old girl who may be humanity's last hope."},
        {name:"Shrek",
        picture:"https://m.media-amazon.com/images/M/MV5BOGZhM2FhNTItODAzNi00YjA0LWEyN2UtNjJlYWQzYzU1MDg5L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1000_.jpg",
        descritpion:"A mean lord exiles fairytale creatures to the swamp of a grumpy ogre, who must go on a quest and rescue a princess for the lord in order to get his land back."},
        {name:"Avatar: The Way of Water",
        picture:"https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_FMjpg_UX1000_.jpg",
        descritpion:"Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na'vi race to protect their home."},
    ]

    console.log(listOfMedia)
  return (
    <Box>
        <Card>HELLO WORLD</Card>
        <Typography> Test lista</Typography>
        <Card className="flex-right">
            {
                listOfMedia.map((media,index) =>{
                    return <MediaItem key={index} media={media}> </MediaItem>
                })
            } 
        </Card>
        <Typography> Test lista</Typography>
        <Card className="flex-right">
            {
                listOfMedia.map((media,index) =>{
                    return <MediaItem key={index} media={media}> </MediaItem>
                })
            } 
        </Card>
        <Typography> Test lista</Typography>
        <Card className="flex-right">
            {
                listOfMedia.map((media,index) =>{
                    return <MediaItem key={index} media={media}> </MediaItem>
                })
            } 
        </Card>
    </Box>
  );
}

export default HomePage;
