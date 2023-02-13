import { Search } from "@mui/icons-material";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SelectComponent from "../Components/Custom/SelectComponent";
import MediaGrid from "../Components/Media/MediaGrid";
import SideBar from "../Components/Search/Sidebar";
import Utility from "../Utility";
function SearchPage() {
  const [selectedTag, setSelectedTag] = useState("");
  const [displayMedia, setDisplayMedia] = useState([]);
  const filterOptions = useRef([{name :"Any"},{name :"tvshow"},{name:"movie"}]);

  const [hardCodedDataSwap, setHardCodedDataSwap] = useState(true);
  const [filter,setFilter] = useState({name :"Any"});
  const [searchString,setSerachString] = useState("");
  const [fromDate,setFromDate] = useState("");
  const [toDate,setToDate] = useState("");
  const [order, setOrder] = useState(true);
  const [sortMethod, setSortMethod] = useState(true);

  useEffect(() => {
    fetchTag();
  }, [selectedTag]);
  
  useEffect(() => {
    fetchSearch();
  }, [searchString,filter,fromDate,toDate,order,sortMethod]);

  function handleSelectedTagChange(tag) {
    setSelectedTag(tag);
  }
  function fetchTag(){
    console.log(selectedTag)
    if(selectedTag){
        Utility.fetchData("http://localhost:3000/api/tags/"+selectedTag._id)
        .then(data => {
          console.log(data.mediaEmbedded)
          setDisplayMedia(data.mediaEmbedded)
        })
        .catch(error => console.error(error));
      }
  }
  function fetchSearch(){
    const query = createQuerryString()
    console.log(query)
      Utility.fetchData("http://localhost:3000/api/media?skip=0&limit=100&"+query)
      .then(data => {
        console.log(data)
        setDisplayMedia(data)
      })
      .catch(error => console.error(error));
  }
  function createQuerryString() {
    let querry = "";
    if (fromDate)
         querry += "toDate=" + toDate + "&";
    if (filter)
        if(filter.name !== "Any")
        querry += "type=" + filter.name + "&";
    if (searchString)
      if(searchString !== "")
      querry += "name=" + searchString + "&";

    querry += "order=" + (order ? "asc" : "desc") + "&";
    if (fromDate)
         querry += "fromDate=" + fromDate + "&";

    querry += "sort=" + (sortMethod ? "raiting":"airedDate")  + "&";

    console.log(querry)
    return querry;
}
  function handleSerchStringChange(event){
    setSerachString(event.target.value)
  }
  function handleFilterChange(event){
    setFilter(event);
  }
  function handleFromDateChange(event){
    setFromDate(event.target.value)
  }
  function handleToDateChange(event){
    setToDate(event.target.value)
  }
  function handleOrderChange() {
    setOrder(!order);
  }
  function handleSortMethodChange() {
    setSortMethod(!sortMethod);
  }
  return (
    <>
    <Box className="flex-right">
        <Box className="flex-down margin">
            <Box className="flex-right">
                <TextField label="Search" onChange={handleSerchStringChange} variant="outlined" input={searchString}></TextField>
                <SelectComponent
                    label={"Filter"}
                    options={filterOptions.current}
                    onChange={handleFilterChange}/>
                <Typography>from :</Typography>
                <TextField label="" type={"date"} value={fromDate} onChange={handleFromDateChange}></TextField>
                <Typography>to :</Typography>
                <TextField label="" type={"date"} value={toDate} onChange={handleToDateChange}></TextField>
                <Button onClick={handleOrderChange}>
                                    {order ? "ASC" : "DSC"}
                                </Button>
                 <Typography>Sort By :</Typography>
                 <Button onClick={handleSortMethodChange}>
                                    {sortMethod ? "Raiting" : "AirDate"}
                                </Button>
                <Button onClick={fetchSearch}><Search/> </Button>
            </Box>
            <MediaGrid media={displayMedia}></MediaGrid>:
        </Box>
        <SideBar onChange={handleSelectedTagChange}></SideBar>
    </Box>
    </>
  );
}
export default SearchPage;
