import { Card,Box,Paper,Typography, Avatar, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useRef } from "react";
import TagBubble from "../Components/Custom/TagBubble";


function MediaPage() {
    const mediaID = useRef();

    useEffect(()=>{
        //setMedia(JSON.parse(localStorage.getItem('pickedMedia')));
        //prebacio sam u state, ne bi se
        //fetch u media posle
    },[])

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
                    <Typography variant="h2">{media.name} ({media.date ? media.date.substring(0,4) : ""})</Typography>
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

            {media.actors?
                <Box className="media-section">
                    <Typography width={"100%"} variant="h4">Cast:</Typography>
                    {
                        media.actors.map((actor,index) => {
                            return(<Typography variant="h6" key={index}>{actor}</Typography>)
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
