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
import MediaItem from "../Components/Custom/MediaItem";
import MediaList from "../Components/Custom/MediaList";

function ProfilePage() {
  const email = useRef("Piksi@email.com");
  const name = useRef("Ivan Bogosavljevic");
  const picture = useRef(
    "https://images.pexels.com/photos/2213575/pexels-photo-2213575.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
  );
  const [watchedMedia, setWatchedMedia] = useState([]);
  const [toWatchMedia, setToWatchMedia] = useState([]);
  const [currentlyWatching, setCurrentlyWatching] = useState([]);

  useEffect(() => {
    handleWatchedMediaChange();
    handleToWatchMediaChange();
    handleCurrentyluWatchingChange();
  }, []);
  function handleWatchedMediaChange() {
    setWatchedMedia([
      {
        name: "Shrek",
        picture:
          "https://m.media-amazon.com/images/M/MV5BOGZhM2FhNTItODAzNi00YjA0LWEyN2UtNjJlYWQzYzU1MDg5L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1000_.jpg",
      },
      {
        name: "Avatar: The Way of Water",
        picture:
          "https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_FMjpg_UX1000_.jpg",
      },
      {
        name: "The Dark Knight",
        picture:
          "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UX1000_.jpg",
      },
      {
        name: "Inception",
        picture:
          "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_FMjpg_UX1000_.jpg",
      },
      {
        name: "The Godfather",
        picture:
          "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UX214_CR0,0,214,317_AL_.jpg",
      },
      {
        name: "The Shawshank Redemption",
        picture:
          "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX214_CR0,0,214,317_AL_.jpg",
      },
    ]);
  }
  function handleToWatchMediaChange() {
    setToWatchMedia([
      {
        name: "Breaking Bad",
        picture:
          "https://m.media-amazon.com/images/M/MV5BYTU3NWI5OGMtZmZhNy00MjVmLTk1YzAtZjA3ZDA3NzcyNDUxXkEyXkFqcGdeQXVyODY5Njk4Njc@._V1_.jpg",
      },
      {
        name: "Game of Thrones",
        picture:
          "https://m.media-amazon.com/images/M/MV5BMjE3NTQ1NDg1Ml5BMl5BanBnXkFtZTgwNzY2NDA0MjI@._V1_FMjpg_UX214_CR0,0,214,317_AL_.jpg",
      },
      {
        name: "The Sopranos",
        picture:
          "https://m.media-amazon.com/images/I/818TrulDKmL._AC_SL1500_.jpg",
      },
      {
        name: "The Wire",
        picture:
          "https://ntvb.tmsimg.com/assets/p7892928_b_h10_ab.jpg?w=960&h=540",
      },
      {
        name: "Friends",
        picture:
          "https://m.media-amazon.com/images/M/MV5BNDVkYjU0MzctMWRmZi00NTkxLTgwZWEtOWVhYjZlYjllYmU4XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_FMjpg_UX214_CR0,0,214,317_AL_.jpg",
      },
      {
        name: "The Last of us",
        picture:
          "https://image.api.playstation.com/vulcan/ap/rnd/202206/0720/eEczyEMDd2BLa3dtkGJVE9Id.png",
      },
    ]);
  }
  function handleCurrentyluWatchingChange() {
    setCurrentlyWatching([
      {
        name: "Shrek",
        picture:
          "https://m.media-amazon.com/images/M/MV5BOGZhM2FhNTItODAzNi00YjA0LWEyN2UtNjJlYWQzYzU1MDg5L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1000_.jpg",
      },
      {
        name: "Avatar: The Way of Water",
        picture:
          "https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_FMjpg_UX1000_.jpg",
      },
      {
        name: "The Dark Knight",
        picture:
          "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UX1000_.jpg",
      },
      {
        name: "Inception",
        picture:
          "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_FMjpg_UX1000_.jpg",
      },
      {
        name: "The Godfather",
        picture:
          "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UX214_CR0,0,214,317_AL_.jpg",
      },
      {
        name: "The Shawshank Redemption",
        picture:
          "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX214_CR0,0,214,317_AL_.jpg",
      },
    ]);
  }
  return (
    <Container>
      <Avatar
        alt={name.current}
        src={picture.current}
        sx={{ width: 112, height: 112 }}
      />

      <Typography variant="h5">{name.current}</Typography>
      <Typography variant="body1">Email: {email.current}</Typography>

      <Typography variant="h5" component="h2">
        Watched Movies
      </Typography>
      <Box>
            <MediaList media={watchedMedia}></MediaList>
            <MediaList media={toWatchMedia}></MediaList>
            <MediaList media={currentlyWatching}></MediaList>
      </Box>
    </Container>
  );
}

export default ProfilePage;
