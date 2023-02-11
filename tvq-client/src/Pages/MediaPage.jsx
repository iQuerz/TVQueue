import { Card,Box,Paper,Typography, Avatar, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useRef } from "react";
import SelectComponent from "../Components/Custom/SelectComponent";
import TagBubble from "../Components/Custom/TagBubble";
import Utility from "../Utility";


function MediaPage() {
    const mediaID = useRef();
    const [seasions,setSeasions] = useState([]);
    const [selectedSeasion, setSelectedSeasion] = useState("")
    function handleSelectedSeasionChange(event){
        setSelectedSeasion(event)
    }
    useEffect(()=>{
        //setMedia(JSON.parse(localStorage.getItem('pickedMedia')));
        mediaID.current = localStorage.getItem('pickedMedia');
        console.log(mediaID.current)
        fetchMedia();
    },[])

    function fetchMedia(){
        Utility.fetchData("http://localhost:3000/api/media/"+mediaID.current)
        .then(data =>{
            console.log(data)
            setMedia(data)
            if(data.episodes)
                {
                    const seasonNumbers = data.episodes.map(episode => parseInt(episode.seasonEpisode.split("#")[1].split("-")[0]));
                    const maxSeasonNumber = Math.max(...seasonNumbers);
                    const seasons = Array.from({ length: maxSeasonNumber }, (_, index) => ({ name: `Season ${index + 1}` }));
                    console.log(seasons)
                    setSeasions(seasons);
                }
        })
    }
    const [media, setMedia] = useState(
        {
            name: "Shrek",
            picture: "https://m.media-amazon.com/images/M/MV5BOGZhM2FhNTItODAzNi00YjA0LWEyN2UtNjJlYWQzYzU1MDg5L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1000_.jpg",
            description: "A mean lord exiles fairytale creatures to the swamp of a grumpy ogre, who must go on a quest and rescue a princess for the lord in order to get his land back.",
            directors: ["Andrew Adamson", "Vicky Jenson"],
            actors: ["Mike Myers (Shrek)", "Eddie Murphy (Donkey)", "Cameron Diaz (Fiona)"],
            rating: 7.9,
            date: "2001-04-22",
            reviews: [{value:10,comment:"super"},{value:7,comment:"ok"},{value:10,comment:"super"},{value:7,comment:"ok"},{value:10,comment:"super"},{value:7,comment:"ok"}],
            tags: ["Animation", "Adventure", "Comedy", "Fantasy", "Family", "Romance"]
        }
    );
    return (
        <Box className="flex-down" marginTop={"1em"}>
            <Box className="flex-right" width={"var(--ui-width)"}>
                <img src={media.picture} className="media-image"></img>
                <Box className="flex-down" marginLeft={"1em"}>
                    <Typography variant="h2">{media.name} ({media.airedDate ? media.airedDate.substring(0,4) : ""})</Typography>
                    <Typography variant="h4">{media.rating ? media.rating+"/10" : "no rating"}</Typography>
                    <Box className="flex-right" sx={{flexWrap:"wrap"}}>
                        {media.tags?
                            media.tags.map((tag, index) =>{
                                return (<TagBubble tag={tag} key={index}></TagBubble>);
                            })
                            :""
                        }
                    </Box>
                </Box>
            </Box>

            {media.description ?
                <Box className="media-section">
                    <Typography variant="h6">{media.description}</Typography>
                </Box>
                :""
            }
            {media.episodes?
                <Box>
                    <SelectComponent
                        label={"Seasion"}
                        options={seasions}
                        onChange={handleSelectedSeasionChange}
                        />
                    <Box>
                        {media.episodes.map((episode,index)=>{
                            // if(selectedSeasion == parseInt(episode.sessionEpisode.split("#")[1].split("-")[0]))
                             return(<Typography key={index}> {episode.name + episode.seasonEpisode}</Typography>)
                        })}
                    </Box>
                </Box>
                :""
            }

            {media.directors?
                <Typography variant="h5" className="media-section">Directors: &nbsp;
                    {
                        media.directors.map((director,index) => {
                                if(index<media.directors.length-1){
                                    return (director + ", ")
                                }
                                return(director)
                            }
                        )
                    }
                </Typography>
                :""
            }

            {media.participated?
                <Box className="media-section">
                    <Typography width={"100%"} variant="h4">Cast:</Typography>
                    {
                        media.participated.map((actor,index) => {
                            return(<Typography variant="h6" key={index}>{actor.accountName}</Typography>)
                        })
                    }
                </Box>
                :""
            }

            {media.reviews?
                <Box className="media-section">
                    <Typography width={"100%"} variant="h4">Reviews: <Button variant="contained" size="large">Add Yours</Button></Typography>
                    {
                        media.reviews.map((review,index) => {
                            return(<Typography variant="h6" key={index}>{review.value}, "{review.comment}"</Typography>)
                        })
                    }
                </Box>
                :""
            }
        </Box>
    );
}

export default MediaPage;
