import {
  Card,
  Box,
  Container,
  Grid,
  Avatar,
  Typography,
  CardContent,
} from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import MediaItem from "../Components/Media/MediaItem";
import MediaList from "../Components/Media/MediaList";
import Utility from "../Utility";

function ProfilePage() {
  const [email,setEmail] = useState("");
  const [name, setName] = useState("");
  const [picture,setPicture]=useState("");
  const [watchedMedia, setWatchedMedia] = useState([]);
  const [toWatchMedia, setToWatchMedia] = useState([]);
  const [currentlyWatching, setCurrentlyWatching] = useState([]);

  useEffect(() => {
    getMe();
    getMyPlayList();
  }, []);

  function getMe(){
    Utility.fetchData("http://localhost:3000/api/accounts/me")
    .then(data => {
        setEmail(data.email)
        setName(data.name)
        setPicture(data.picture)
    })
    .catch(error => console.error(error)); 
  } 
  function getMyPlayList(){
    Utility.fetchData("http://localhost:3000/api/accounts/me/playlists")
    .then(data => {
        setCurrentlyWatching(data[0].media)
        setToWatchMedia(data[1].media)
        setWatchedMedia(data[2].media)

    })
    .catch(error => console.error(error)); 
  } 

    return (
        <Box className="flex-down">
            <Box className="flex-right margin">
                <Avatar
                    alt={name}
                    src={picture}
                    sx={{ width: 112, height: 112 }}
                />
                <Box className="flex-down margin">
                    <Typography variant="h5">{name}</Typography>
                    <Typography variant="body1">{email}</Typography>
                </Box>
            </Box>
            <Box>
                    <MediaList title="Currently Watching" media={currentlyWatching}></MediaList>
                    <MediaList title="To Watch" media={toWatchMedia}></MediaList>
                    <MediaList title="Watched" media={watchedMedia}></MediaList>
            </Box>
        </Box>
    );
}

export default ProfilePage;
