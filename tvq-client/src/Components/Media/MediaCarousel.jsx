import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";

function MediaCarousel(props) {

    //kada uctiamo sajt da se otvori prvi izbor
    useEffect(()=>{
        HandleLatestMovies();
    },[])
  function HandleLatestMovies() {
    props.onChange([
      {
        name: "Shrek",
        picture:
          "https://m.media-amazon.com/images/M/MV5BOGZhM2FhNTItODAzNi00YjA0LWEyN2UtNjJlYWQzYzU1MDg5L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1000_.jpg",
        description:
          "A mean lord exiles fairytale creatures to the swamp of a grumpy ogre, who must go on a quest and rescue a princess for the lord in order to get his land back.",
      },
      {
        name: "Avatar: The Way of Water",
        picture:
          "https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_FMjpg_UX1000_.jpg",
        description:
          "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na'vi race to protect their home.",
      },
      {
        name: "The Dark Knight",
        picture:
          "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UX1000_.jpg",
        description:
          "With the help of allies Lt. Jim Gordon and DA Harvey Dent, Batman has been able to keep a tight lid on crime in Gotham City. But when a vile young criminal calling himself the Joker suddenly throws the town into chaos, the Caped Crusader begins to tread a fine line between heroism and vigilantism.",
      },
      {
        name: "Inception",
        picture:
          "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_FMjpg_UX1000_.jpg",
        description:
          "Dom Cobb is a skilled thief, the absolute best in the dangerous art of extraction: stealing valuable secrets from deep within the subconscious during the dream state, when the mind is at its most vulnerable.",
      },
      {
        name: "The Godfather",
        picture:
          "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UX214_CR0,0,214,317_AL_.jpg",
        description:
          "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
      },
      {
        name: "The Shawshank Redemption",
        picture:
          "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX214_CR0,0,214,317_AL_.jpg",
        description:
          "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
      },
    ]);
  }
  function HandleLatestShows() {
    props.onChange([
      {
        name: "Breaking Bad",
        picture:
          "https://m.media-amazon.com/images/M/MV5BYTU3NWI5OGMtZmZhNy00MjVmLTk1YzAtZjA3ZDA3NzcyNDUxXkEyXkFqcGdeQXVyODY5Njk4Njc@._V1_.jpg",
        description:
          "A high school chemistry teacher, who is diagnosed with cancer, turns to a life of crime to secure his family's financial future.",
      },
      {
        name: "Game of Thrones",
        picture:
          "https://m.media-amazon.com/images/M/MV5BMjE3NTQ1NDg1Ml5BMl5BanBnXkFtZTgwNzY2NDA0MjI@._V1_FMjpg_UX214_CR0,0,214,317_AL_.jpg",
        description:
          "Nine noble families fight for control over the mythical lands of Westeros, while a forgotten race returns after being dormant for thousands of years.",
      },
      {
        name: "The Sopranos",
        picture:
          "https://m.media-amazon.com/images/I/818TrulDKmL._AC_SL1500_.jpg",
        description:
          "A New Jersey mob boss, Tony Soprano, deals with personal and professional issues in his home and business life.",
      },
      {
        name: "The Wire",
        picture:
          "https://ntvb.tmsimg.com/assets/p7892928_b_h10_ab.jpg?w=960&h=540",
        description:
          "A multi-layered examination of Baltimore's drug scene, seen through the eyes of drug dealers, and law enforcement.",
      },
      {
        name: "Friends",
        picture:
          "https://m.media-amazon.com/images/M/MV5BNDVkYjU0MzctMWRmZi00NTkxLTgwZWEtOWVhYjZlYjllYmU4XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_FMjpg_UX214_CR0,0,214,317_AL_.jpg",
        description:
          "Follows the personal and professional lives of six friends living in Manhattan.",
      },
      {
        name: "The Last of us",
        picture:
          "https://image.api.playstation.com/vulcan/ap/rnd/202206/0720/eEczyEMDd2BLa3dtkGJVE9Id.png",
        description:
          "After a global pandemic destroys civilization, a hardened survivor takes charge of a 14-year-old girl who may be humanity's last hope.",
      },
    ]);
  }
  function HandleOurPicks() {}
  function HandleTrending() {}
  function HandleUpcoming() {}
  function HandleRecentlyViewed() {}
    return (
        <header className="media-carousel-header">
            <nav>
                <Button onClick={HandleLatestMovies}>Latest movies</Button>
                <Button onClick={HandleLatestShows}>Latest shows</Button>
                <Button onClick={HandleOurPicks}>Our picks</Button>
                <Button onClick={HandleTrending}>Trending</Button>
                <Button onClick={HandleUpcoming}>Upcoming</Button>
                <Button onClick={HandleRecentlyViewed}>Recently Viewed</Button>
            </nav>
        </header>
    );
}
export default MediaCarousel;
