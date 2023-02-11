import { Button, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import MediaGrid from "../Components/Media/MediaGrid";
import SideBar from "../Components/Search/Sidebar";
import Utility from "../Utility";
function SearchPage() {
  const [selectedTag, setSelectedTag] = useState("");
  const [displayMedia, setDisplayMedia] = useState([]);
  const [hardCodedDataSwap, setHardCodedDataSwap] = useState(true);
  const searchString = useRef();
  useEffect(() => {
    fetchTag();
  }, [selectedTag]);
  function handleSelectedTagChange(tag) {
    setSelectedTag(tag);
  }
  function fetchTag(){
    if(selectedTag._id){
        Utility.fetchData("http://localhost:3000/api/tags/"+selectedTag._id)
        .then(data => {
          console.log(data)
          setDisplayMedia(data.mediaEmbedded)
        })
        .catch(error => console.error(error));
      }
  }
  //kada bude bilo mozemo actual tag da fetchujemo
  function fetchTag2() {
    //fetthc(selectedTag)
    if (hardCodedDataSwap) {
      setDisplayMedia([
        {
          name: "Breaking Bad",
          rating: 5,
          picture:
            "https://m.media-amazon.com/images/M/MV5BYTU3NWI5OGMtZmZhNy00MjVmLTk1YzAtZjA3ZDA3NzcyNDUxXkEyXkFqcGdeQXVyODY5Njk4Njc@._V1_.jpg",
          description:
            "A high school chemistry teacher, who is diagnosed with cancer, turns to a life of crime to secure his family's financial future.",
        },
        {
          name: "Game of Thrones",
          rating: 4,
          picture:
            "https://m.media-amazon.com/images/M/MV5BMjE3NTQ1NDg1Ml5BMl5BanBnXkFtZTgwNzY2NDA0MjI@._V1_FMjpg_UX214_CR0,0,214,317_AL_.jpg",
          description:
            "Nine noble families fight for control over the mythical lands of Westeros, while a forgotten race returns after being dormant for thousands of years.",
        },
        {
          name: "The Sopranos",
          rating: 5,
          picture:
            "https://m.media-amazon.com/images/I/818TrulDKmL._AC_SL1500_.jpg",
          description:
            "A New Jersey mob boss, Tony Soprano, deals with personal and professional issues in his home and business life.",
        },
        {
          name: "The Wire",
          rating: 2,
          picture:
            "https://ntvb.tmsimg.com/assets/p7892928_b_h10_ab.jpg?w=960&h=540",
          description:
            "A multi-layered examination of Baltimore's drug scene, seen through the eyes of drug dealers, and law enforcement.",
        },
        {
          name: "Friends",
          rating: 5,
          picture:
            "https://m.media-amazon.com/images/M/MV5BNDVkYjU0MzctMWRmZi00NTkxLTgwZWEtOWVhYjZlYjllYmU4XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_FMjpg_UX214_CR0,0,214,317_AL_.jpg",
          description:
            "Follows the personal and professional lives of six friends living in Manhattan.",
        },
        {
          name: "The Last of us",
          rating: 5,
          picture:
            "https://image.api.playstation.com/vulcan/ap/rnd/202206/0720/eEczyEMDd2BLa3dtkGJVE9Id.png",
          description:
            "After a global pandemic destroys civilization, a hardened survivor takes charge of a 14-year-old girl who may be humanity's last hope.",
        },
        ,
        {
          name: "The Office (US)",
          rating: 4,
          picture:
            "https://roost.nbcuni.com/bin/viewasset.html/content/dam/Peacock/Landing-Pages/library/theoffice/mainpage/office-vertical-art.jpg/_jcr_content/renditions/original.JPEG",
          description:
            "A mockumentary on a group of typical office workers, where the workday consists of ego clashes, inappropriate behavior, and tedium.",
        },
        {
          name: "The Walking Dead",
          rating: 3,
          picture:
            "https://m.media-amazon.com/images/M/MV5BZmU5NTcwNjktODIwMi00ZmZkLTk4ZWUtYzVjZWQ5ZTZjN2RlXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_UY1200_CR83,0,630,1200_AL_.jpg",
          description:
            "Sheriff's deputy Rick Grimes awakens from a coma to find a post-apocalyptic world dominated by flesh-eating zombies.",
        },
        {
          name: "The Crown",
          rating: 3,
          picture: "https://m.media-amazon.com/images/I/71f97nf-u9L.jpg",
          description:
            "Follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the 20th century.",
        },
        {
          name: "Stranger Things",
          rating: 4,
          picture:
            "https://resizing.flixster.com/0xxuABVVuzJrUT130WFHKE-irEg=/ems.cHJkLWVtcy1hc3NldHMvdHZzZWFzb24vNzUyMTFhOTktZTU4Ni00ODkyLWJlYjQtZTgxYTllZmU2OGM0LmpwZw==",
          description:
            "When a young boy disappears, his mother, a police chief, and his friends must confront terrifying supernatural forces in order to get him back.",
        },
        {
          name: "The Big Bang Theory",
          rating: 5,
          picture:
            "https://www.tvguide.com/a/img/catalog/provider/1/1/1-6482810627.jpg",
          description:
            "A woman who moves into an apartment across the hall from two brilliant but socially awkward physicists shows them how little they know about life outside of the laboratory.",
        },
      ]);
    } else {
      setDisplayMedia([
        {
          name: "Shrek",
          rating: 2,
          picture:
            "https://m.media-amazon.com/images/M/MV5BOGZhM2FhNTItODAzNi00YjA0LWEyN2UtNjJlYWQzYzU1MDg5L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1000_.jpg",
          description:
            "A mean lord exiles fairytale creatures to the swamp of a grumpy ogre, who must go on a quest and rescue a princess for the lord in order to get his land back.",
        },
        {
          name: "Avatar: The Way of Water",
          rating: 3,
          picture:
            "https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_FMjpg_UX1000_.jpg",
          description:
            "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na'vi race to protect their home.",
        },
        {
          name: "The Dark Knight",
          rating: 3,
          picture:
            "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UX1000_.jpg",
          description:
            "With the help of allies Lt. Jim Gordon and DA Harvey Dent, Batman has been able to keep a tight lid on crime in Gotham City. But when a vile young criminal calling himself the Joker suddenly throws the town into chaos, the Caped Crusader begins to tread a fine line between heroism and vigilantism.",
        },
        {
          name: "Inception",
          rating: 4,
          picture:
            "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_FMjpg_UX1000_.jpg",
          description:
            "Dom Cobb is a skilled thief, the absolute best in the dangerous art of extraction: stealing valuable secrets from deep within the subconscious during the dream state, when the mind is at its most vulnerable.",
        },
        {
          name: "The Godfather",
          rating: 5,
          picture:
            "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UX214_CR0,0,214,317_AL_.jpg",
          description:
            "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
        },
        {
          name: "The Shawshank Redemption",
          rating: 1,
          picture:
            "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX214_CR0,0,214,317_AL_.jpg",
          description:
            "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        },
        {
          name: "The Lord of the Rings: The Return of the King",
          rating: 4,
          picture:
            "https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UX214_CR0,0,214,317_AL_.jpg",
          description:
            "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
        },
        {
          name: "Pulp Fiction",
          rating: 5,
          picture:
            "https://m.media-amazon.com/images/M/MV5BMTkxMTA5OTAzMl5BMl5BanBnXkFtZTgwNjA5MDc3NjE@._V1_FMjpg_UX214_CR0,0,214,317_AL_.jpg",
          description:
            "The lives of two mob hit men, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
        },
        {
          name: "The Matrix",
          rating: 4,
          picture:
            "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_FMjpg_UX214_CR0,0,214,317_AL_.jpg",
          description:
            "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
        },
        {
          name: "The Silence of the Lambs",
          rating: 3,
          picture:
            "https://m.media-amazon.com/images/M/MV5BMTQ2NzkzMDI4OF5BMl5BanBnXkFtZTcwMDA0NzE1NA@@._V1_FMjpg_UX214_CR0,0,214,317_AL_.jpg",
          description:
            "A young FBI cadet must receive the help of an imprisoned and manipulative cannibal killer to help catch another serial killer, a madman who skins his victims.",
        },
        {
          name: "The Departed",
          rating: 1,
          picture: "https://flxt.tmsimg.com/assets/p162564_p_v8_ag.jpg",
          description:
            "An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang in South Boston.",
        },
        {
          name: "Schindler's List",
          rating: 2,
          picture:
            "https://m.media-amazon.com/images/M/MV5BNDE4OTMxMTctNmRhYy00NWE2LTg3YzItYTk3M2UwOTU5Njg4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
          description:
            "In German-occupied Poland during World War II, Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazi Germans.",
        },
      ]);
    }
    setHardCodedDataSwap(!hardCodedDataSwap);
  }
  function fetchSerac(){
    setDisplayMedia([{
        name: "Game of Thrones",
        rating: 4,
        picture:
          "https://m.media-amazon.com/images/M/MV5BMjE3NTQ1NDg1Ml5BMl5BanBnXkFtZTgwNzY2NDA0MjI@._V1_FMjpg_UX214_CR0,0,214,317_AL_.jpg",
        description:
          "Nine noble families fight for control over the mythical lands of Westeros, while a forgotten race returns after being dormant for thousands of years.",
      }]);
  }
  return (
    <>
      <TextField label="Search" variant="outlined" inputRef={searchString}></TextField>
      <Button onClick={fetchSerac}>Serach</Button>
      <SideBar onChange={handleSelectedTagChange}></SideBar>
      <MediaGrid media={displayMedia}></MediaGrid>
    </>
  );
}
export default SearchPage;
