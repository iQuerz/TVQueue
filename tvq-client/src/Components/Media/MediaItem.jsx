import {
    Card,
    CardActionArea,
    CardMedia,
    Typography,
    CardContent,
    Button,
    CardActions,
    Rating,
    Menu,
    MenuItem,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import {useNavigate } from "react-router-dom";

function MediaItem(props) {
    const [hover, setHover] = useState(false);

    const [menuAnchor, setMenuAnchor] = useState(null);
    const menuOpen = Boolean(menuAnchor);
    const handleOpenMenu = (event) => {
        setMenuAnchor(event.currentTarget)
    }
    const handleCloseMenu = () =>{
        setMenuAnchor(null);
    }

    const navigate = useNavigate();
    function showMore(){
        //ovde cemo i guess u local storage da stavimo media koju je izabrao i na onaj sajt cemo da fethujemo podatke o njemu i guess
        window.localStorage.setItem('pickedMedia', props.media.name) //bice id 
        navigate("/media")
    }
    function addToWatchlist(){
        alert("not implemented yet")
    }
    function addToCurrentlyWatching(){
        alert("not implemented yet")
    }
    function addToWatched(){
        alert("not implemented yet")
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

                <CardContent height="3.5em">
                    <Typography variant="h6" component="div">
                        {props.media.name}
                    </Typography>
                </CardContent>

                <Box className="flex-down" height={"4.5em"}>
                    <Rating name="read-only" value={props.media.rating} readOnly/>
                    <CardActions className="flex-right">         
                        <Button onClick={showMore} size="medium">More</Button>
                        <Button size="medium" onClick={handleOpenMenu}>Add to</Button>
                        <Menu open={menuOpen} anchorEl={menuAnchor} onClose={handleCloseMenu}>
                            <MenuItem onClick={()=>{addToWatchlist();handleCloseMenu()}}>Watchlist</MenuItem>
                            <MenuItem onClick={()=>{addToWatched();handleCloseMenu()}}>Watched</MenuItem>
                            <MenuItem onClick={()=>{addToCurrentlyWatching();handleCloseMenu()}}>Currently watching</MenuItem>
                        </Menu>
                    </CardActions>
                </Box>
            </Box>
        </Card>
    );
}

export default MediaItem;