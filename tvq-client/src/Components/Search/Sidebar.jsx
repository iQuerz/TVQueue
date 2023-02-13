import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Utility from "../../Utility";

function SideBar(props){
    const [tags,setTags] = useState([]);
    useEffect(()=>{
        //handleTagsFetch();
        getAllTags();
    },[])

    function getAllTags(){
        Utility.fetchData("http://localhost:3000/genres")
        .then(data => {
            setTags(data)
            props.onChange(data[0])
        })
        .catch(error => console.error(error));
    }
    function handleTagsFetch(){
        setTags([
            {id: 1, name: "Horror"},
            {id: 2, name: "Action"},
            {id: 3, name: "Comedy"},
            {id: 4, name: "Drama"},
            {id: 5, name: "Sci-Fi"},
            {id: 6, name: "Thriller"},
            {id: 7, name: "Mystery"},
            {id: 8, name: "Romance"},
            {id: 9, name: "Adventure"},
            {id: 10, name: "Fantasy"}
          ])
          console.log(tags)
    }
    //trenutno je jako lose uradjen css sidebar nije autoamcki podesen da bude ispod navbar nego je stavljen fixed amount odakle da krece da se ne zbunis 
    return(
        <Box className="sidebar flex-down">
            <Typography variant="h4" sx={{color:"var(--orange)!important",textAlign:"center"}}>FILTER TAGS</Typography>
            {
                tags.map((tag,index) =>{
                    return <Button onClick={()=>{
                        props.onChange(tag)
                    }} key={index} className="sidebar-nav-button"><h2>{tag.name}</h2></Button>
                })
            }
        </Box>
    );
}
export default SideBar