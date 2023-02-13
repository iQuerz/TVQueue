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
    getFabUtilityClass,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import {useNavigate } from "react-router-dom";
import Utility from "../../Utility";

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
        console.log(props.media)
        localStorage.setItem('pickedMedia', props.media._id) //bice id 
        navigate("/media")
    }
    //body za svaki idem pojedinacno
    const body = {
        _id: props.media._id,
        name: props.media.name,
        picture: props.media.picture
    }
    function addToWatchlist(){
        console.log(body)
        Utility.fetchData("http://localhost:3000/api/accounts/me/playlists/watchlater","POST",body)
        .then(data => {
            if(data.status == 400)
            {
                console.log("Already in play list")
            }
            if(data.status == 403)
                navigate("/login")
        })
    }
    function addToCurrentlyWatching(){
        Utility.fetchData("http://localhost:3000/api/accounts/me/playlists/watching","POST",body)
        .then(data => {
            if(data.status == 400)
            {
                console.log("Already in play list")
            }
            if(data.status == 403)
                navigate("/login")
        })
    }
    function addToWatched(){
        Utility.fetchData("http://localhost:3000/api/accounts/me/playlists/watched","POST",body)
        .then(data => {
            if(data.status == 400)
            {
                console.log("Already in play list")
            }
        if(data.status == 403)
            navigate("/login")
        })
    }


    return (
        <Card className={props.className} sx={{ minWidth:"12em", width:"12em", height:"23em" }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}>
            <Box className="flex-down" sx={{justifyContent:"space-between", height:"100%", flexGrow:"0", flexShrink:"0"}}>

                <CardActionArea>
                    <CardMedia
                        sx={{ height: "15em" }}
                        title={props.media.name}
                        image={props.media.picture ? props.media.picture : props.media.mediaPicture}
                    />
                </CardActionArea>

                <CardContent>
                    <Typography className="clickable-link" variant="h6" height={"3em"} onClick={showMore} overflow={"hidden"} title={props.media.name}>
                        {props.media.name ? props.media.name : props.media.mediaName}
                    </Typography>
                </CardContent>

                <Box className="flex-down" height={"4.5em"}>
                    <Rating name="read-only"  value={props.media.rating} title={props.media.rating}  max={10} readOnly/>
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