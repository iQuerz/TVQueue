import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function SideBar(props){
    const [tags,setTags] = useState([]);
    useEffect(()=>{
        handleTagsFetch();
    },[])

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
        <div className="sidebar">
            {
                tags.map((tag,index) =>{
                    return <Button onClick={()=>{
                        props.onChange(tag)
                    }} key={index} className="sidebar-nav-button"><h2>{tag.name}</h2></Button>
                })
            }
        </div>
    );
}
export default SideBar