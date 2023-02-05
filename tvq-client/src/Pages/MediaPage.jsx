import { Card,Box,Paper,Typography, Avatar, Button } from "@mui/material";
import { useRef } from "react";
import TagBubble from "../Components/Custom/TagBubble";


function MediaPage() {
    const media = useRef(
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
                <img src={media.current.picture} className="media-image"></img>
                <Box className="flex-down" marginLeft={"1em"}>
                    <Typography variant="h2">{media.current.name} ({media.current.date.substring(0,4)})</Typography>
                    <Typography variant="h4">{media.current.rating}/10</Typography>
                    <Box className="flex-right" sx={{flexWrap:"wrap"}}>
                        {
                            media.current.tags.map((tag, index) =>{
                                return (<TagBubble tag={tag} key={index}></TagBubble>);
                            })
                        }
                    </Box>
                </Box>
            </Box>

            <Box className="media-section">
                <Typography variant="h6">{media.current.description}</Typography>
            </Box>

            <Typography variant="h5" className="media-section">Directors: &nbsp;
                {
                    media.current.directors.map((director,index) => {
                            if(index<media.current.directors.length-1){
                                return (director + ", ")
                            }
                            return(director)
                        }
                    )
                }
            </Typography>

            <Box className="media-section">
                <Typography width={"100%"} variant="h4">Cast:</Typography>
                {
                    media.current.actors.map((actor,index) => {
                        return(<Typography variant="h6" key={index}>{actor}</Typography>)
                    })
                }
            </Box>

            <Box className="media-section">
                <Typography width={"100%"} variant="h4">Reviews: <Button variant="contained" size="large">Add Yours</Button></Typography>
                {
                    media.current.reviews.map((review,index) => {
                        return(<Typography variant="h6" key={index}>{review.value}, "{review.comment}"</Typography>)
                    })
                }
            </Box>
        </Box>
    );
}

export default MediaPage;
