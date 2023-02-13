
import { Box, Button, Card, TextField, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import { useState } from "react";
import CheckList from "../Components/Custom/CheckList";
import SelectComponent from "../Components/Custom/SelectComponent";
import Utility from "../Utility";

function AdminPage() {


    useEffect(()=>{
        getAllTags();
        getAllTvShows();
    },[])
    //#region Add Tag
    let [tagName, setTagName] = useState("");
    function onTagNameChange(event){
        setTagName(event.target.value);
    }

    function addTagClick(){
        tryAddTag();
    }
    async function tryAddTag(){
            console.log(tagName)
            const tag = {name: tagName}
            Utility.fetchData("http://localhost:3000/api/tags/","POST",tag)
            .then( data => {
                console.log(data)
            })
    }
    //#endregion

    //#region Edit Tag
    let [tagSearch, setTagSearch] = useState("");
    function onTagSearchChange(event){
        setTagSearch(event.target.value);
    }
    let [newTagName, setNewTagName] = useState("");
    function onNewTagNameChange(event){
        setNewTagName(event.target.value);
    }

    //----------LOAD----------
    //----------LOAD----------
    //----------LOAD----------
    function loadTagClick(){
        tryLoadTag();
    }
    async function tryLoadTag(){

            // const tag = {name: tagSearch}
            // const body = JSON.stringify(tag);
            // Utility.fetchData("http://localhost:3000/api/tags/","POST",tag)
            // .then( data => {
            //     console.log(data)
            // })
    }

    //----------UPDATE----------
    //----------UPDATE----------
    //----------UPDATE----------
    function updateTagClick(){
        tryUpdateTag();
    }
    async function tryUpdateTag(){
        try {
            const tag = {name: newTagName}
            const body = JSON.stringify(tag);
            // const response = await fetch('', {
            //     method: 'POST',
            //     body: body,
            //     headers: { "Content-Type": "application/json"}
            // });
            // const json = await response.json();
            
            // if(response.ok)
            // {
            //     console.log("Tag added")
            //     setTagName("");
            // }
        } catch (error) {
            //setErrorMsg(error)
            console.error(error);
        }
    }

    //----------DELETE----------
    //----------DELETE----------
    //----------DELETE----------
    function deleteTagClick(){
        tryDeleteTag()
    }
    async function tryDeleteTag(){

    }

    //#endregion

    //#region Add Account
    let [accountName, setAccountName] = useState("");
    function onAccountNameChange(event){ setAccountName(event.target.value); }
    let [accountEmail, setAccountEmail] = useState("");
    function onAccountEmailChange(event){ setAccountEmail(event.target.value); }
    let [accountPassword, setAccountPassword] = useState("");
    function onAccountPasswordChange(event){ setAccountPassword(event.target.value); }
    let [accountPicture, setAccountPicture] = useState("");
    function onAccountPictureChange(event){ setAccountPicture(event.target.value); }

    function addAccountClick(){
        tryAddAccount();
    }
    async function tryAddAccount(){
            const account = {
                name: accountName,
                email: accountEmail,
                password: accountPassword,
                picture: accountPicture
            }
            Utility.fetchData("http://localhost:3000/api/accounts/register","POST", account)
        .then(data => {
            console.log(data)
        })
    }
    //#endregion

    //#region Edit Account
    let [accountSearch, setAccountSearch] = useState("");
    function onAccountSearchChange(event){ setAccountSearch(event.target.value); }

    let [newAccountName, setNewAccountName] = useState("");
    function onNewAccountNameChange(event){ setNewAccountName(event.target.value); }
    let [newAccountEmail, setNewAccountEmail] = useState("");
    function onNewAccountEmailChange(event){ setNewAccountEmail(event.target.value); }
    let [newAccountPassword, setNewAccountPassword] = useState("");
    function onNewAccountPasswordChange(event){ setNewAccountPassword(event.target.value); }
    let [newAccountPicture, setNewAccountPicture] = useState("");
    function onNewAccountPictureChange(event){ setNewAccountPicture(event.target.value); }
    let [loadedAccountID, setLoadedAccountID] = useState("");

    function loadAccountClick(){
        tryLoadAccount();
    }
    async function tryLoadAccount(){
        Utility.fetchData("http://localhost:3000/api/accounts?email="+accountSearch)
        .then(data => {
            console.log(data[0])
            if(data[0])
            {
                setLoadedAccountID(data[0]._id)
                setNewAccountName(data[0].name)
                setNewAccountEmail(data[0].email)
                setNewAccountPicture(data[0].picture)

            }
        })
    }

    function deleteAccountClick(){
        Utility.fetchData("http://localhost:3000/api/accounts/"+loadedAccountID,"DELETE")
        .then(data => {
            console.log(data)
        })
    }
    function updateAccountClick(){
        const account = {
            name: newAccountName,
            email: newAccountEmail,
            picture: newAccountPicture
        }
        Utility.fetchData("http://localhost:3000/api/accounts/"+loadedAccountID,"PATCH",account)
        .then(data => {
            console.log(data)
        })
    }
    //#endregion
    //#region Add Actor/Director
    let [actorName, setActorName] = useState("");
    function onActorNameChange(event){ setActorName(event.target.value); }
    let [actorPicture, setActorPicture] = useState("");
    function onActorPictureChange(event){ setActorPicture(event.target.value); }
    const [roleOptions,setRoleOptions] = useState([{_id:"Actor",name:"Actor"},{_id:"Director",name :"Director"}]);
    const [selectedRole,setSelectedRole] = useState([]);
    function hadnleRoleChange(option){
        console.log(option)
        if(option)
        {
            setSelectedRole(option);
        }
    }

    function addActorClick(){
        tryAddActor();
    }
    async function tryAddActor(){

            const roles = {actor:(selectedRole.find(el=>el=="Actor")? true : false),director:(selectedRole.find(el=>el=="Director")?true :false)}
            const account = {
                name: actorName,
                picture: actorPicture,
                roles:roles
            }
            console.log(account)
            Utility.fetchData("http://localhost:3000/api/accounts","POST", account)
        .then(data => {
            console.log(data)
        })
    }
    //#endregion
    //#region Add Show/Movie
    let [mediaName, setMediaName] = useState("");
    function onMediaNameChange(event){ setMediaName(event.target.value); }
    let [mediaDesc, setMediaDesc] = useState("");
    function onMediaDescChange(event){ setMediaDesc(event.target.value); }
    let [mediaDate, setMediaDate] = useState("");
    function onMediaDateChange(event){ setMediaDate(event.target.value); }
    let [mediaPicture, setMediaPicture] = useState("");
    function onMediaPictureChange(event){ setMediaPicture(event.target.value); }
    const typeOptions = useRef([{name:"Movie"},{name :"TV Show"}]);
    const [mediaType,setMediaType] = useState("");

    const [allTags,setAllTags] = useState([]);
    const [allActors,setActors] = useState([]);
    const [selectedTags,setSelectedTags] = useState([]);
    function handleTypeChange(event){
        setMediaType(event);
      }
    function handleSetChecked(options){
        if(options)
        {
            setSelectedTags(options)
        }
    }
    function addMediaClick(){
        tryAddMedia();
    }
    function getAllTags(){
        Utility.fetchData("http://localhost:3000/api/tags")
        .then(data => {
            setAllTags(data)
        })
    }
    function getAllActors(){
        Utility.fetchData("http://localhost:3000/api/accounts")
        .then(data => {
            console.log(data)
            setActors(data)
        })
    }
    async function tryAddMedia(){
        //const tags =[]
          const tags = selectedTags.map(id => {
            const foundTag = allTags.find(tag => tag._id === id);
            return { _id: id, name: foundTag.name };
          });
          console.log(tags)
        const media = {
            name: mediaName,
            type: mediaType.name,
            picture: mediaPicture,
            description: mediaDesc,
            airedDate: mediaDate,
            tags: tags
        }
        Utility.fetchData("http://localhost:3000/api/media","POST", media)
    .then(data => {
        console.log(data)
    })
    }
    //#endregion

    //#region Add Episode
    let [episodeName, setEpisodeName] = useState("");
    function onEpisodeNameChange(event){ setEpisodeName(event.target.value); }
    let [episodeDesc, setEpisodeDesc] = useState("");
    function onEpisodeDescChange(event){ setEpisodeDesc(event.target.value); }
    let [episodeSeason, setEpisodeSeason] = useState("");
    function onEpisodeSeasonChange(event){ setEpisodeSeason(event.target.value); }
    let [episodeNumber, setEpisodeNumber] = useState("");
    function onEpisodeNumberChange(event){ setEpisodeNumber(event.target.value); }
    let [episodeParentOptions, setEpisodeParentOptions] = useState([]);
    let [episodeParent, setEpisodeParent] = useState("");
    function onEpisodeParentChange(event){ setEpisodeParent(event); }
    let [seasonEpisodeString, setSeasonEpisodeString] = useState("");
    function onSeasonEpisodeString(event){ setSeasonEpisodeString(event.target.value); }
    let [episodeDate, setEpisodeDate] = useState("");
    function onEpisodeDateChange(event){ setEpisodeDate(event.target.value); }
    let [episodePicture, setEpisodePicture] = useState("");
    function onEpisodePictureChange(event){ setEpisodePicture(event.target.value); }
    function addEpisodeClick(){
        tryAddEpisode();
    }
    async function tryAddEpisode(){
                //const tags =[]
                const parent = {
                    _id: episodeParent._id,
                    name: episodeParent.name,
                    seasonEpisode: "S#" + episodeSeason+"-E#" + episodeNumber
                }
                const media = {
                    name: episodeName,
                    type: "Episode",
                    picture: episodePicture,
                    description: episodeDesc,
                    airedDate: episodeDate,
                    parent: parent,
                }
                Utility.fetchData("http://localhost:3000/api/media","POST", media)
            .then(data => {
                console.log(data)
            })
    }
    function getAllTvShows(){
        Utility.fetchData("http://localhost:3000/api/media?skip=0&limit=100&type=tvshow")
        .then(data =>{
            setEpisodeParentOptions(data)
        })
    }
    function handleParentChange(){
        
    }
    //#endregion


    return(
        <>
            <Box className="flex-right seperate-children-big padding" sx={{flexWrap:"wrap"}}>

                {/* ADD TAG */}
                <Card className="flex-down seperate-children-small padding">
                    <Typography variant="h5">Add Tag</Typography>
                    <TextField label="Name" value={tagName} onChange={onTagNameChange}></TextField>
                    <Button type="contained" onClick={addTagClick}>Add</Button>
                </Card>

                {/* EDIT TAG */}
                <Card className="flex-down seperate-children-small padding">
                    <Typography variant="h5">Edit Tag</Typography>
                    <TextField label="Search Tag Name" value={tagSearch} onChange={onTagSearchChange}></TextField>
                    <Button type="contained" onClick={loadTagClick}>Load</Button>
                    <TextField label="New Name" value={newTagName} onChange={onNewTagNameChange}></TextField>
                    <Box className="flex-right">
                        <Button type="contained" onClick={deleteTagClick}>Delete</Button>
                        <Button type="contained" onClick={updateTagClick}>Update</Button>
                    </Box>
                </Card>

                {/* ADD ACCOUNT */}
                <Card className="flex-down seperate-children-small padding">
                    <Typography variant="h5">Add Account(register)</Typography>
                    <TextField label="Name" value={accountName} onChange={onAccountNameChange}></TextField>
                    <TextField label="Email" value={accountEmail} onChange={onAccountEmailChange}></TextField>
                    <TextField label="Password" value={accountPassword} onChange={onAccountPasswordChange}></TextField>
                    <TextField label="Picture URL" value={accountPicture} onChange={onAccountPictureChange}></TextField>
                    <Button type="contained" onClick={addAccountClick}>Add</Button>
                </Card>
                

                {/* EDIT ACCOUNT */}
                <Card className="flex-down seperate-children-small padding">
                    <Typography variant="h5">Edit Account</Typography>
                    <TextField label="Email" value={accountSearch} onChange={onAccountSearchChange}></TextField>
                    <Button type="contained" onClick={loadAccountClick}>Load</Button>
                    <TextField label="Name" value={newAccountName} onChange={onNewAccountNameChange}></TextField>
                    <TextField label="Email" value={newAccountEmail} onChange={onNewAccountEmailChange}></TextField>
                    {/* <TextField label="Password" value={newAccountPassword} onChange={onNewAccountPasswordChange}></TextField> */}
                    <TextField label="Picture URL" value={newAccountPicture} onChange={onNewAccountPictureChange}></TextField>
                    <Box className="flex-right">
                        <Button type="contained" onClick={deleteAccountClick}>Delete</Button>
                        <Button type="contained" onClick={updateAccountClick}>Update</Button>
                    </Box>
                </Card>

                {/* ADD ACTOR/DIRECTOR */}
                <Card className="flex-down seperate-children-small padding">
                    <Typography variant="h5">Add Actor/Director</Typography>
                    <TextField label="Name" value={actorName} onChange={onActorNameChange}></TextField>
                    <TextField label="Picture URL" value={actorPicture} onChange={onActorPictureChange}></TextField>
                    <CheckList items={roleOptions} setChecked={hadnleRoleChange}>
                    </CheckList>
                    <Button type="contained" onClick={addActorClick}>Add</Button>
                </Card>

                {/* ADD MOVIE/SHOW */}
                <Card className="flex-down seperate-children-small padding">
                    <Typography variant="h5">Add Show/Movie</Typography>
                    <TextField label="Title" value={mediaName} onChange={onMediaNameChange}></TextField>
                    <TextField label="Description" value={mediaDesc} onChange={onMediaDescChange}></TextField>
                    <Typography>Type :</Typography>
                    <SelectComponent
                        label={"Type"}
                        options={typeOptions.current}
                        onChange={handleTypeChange}
                        />
                    <TextField label="" type={"date"} value={mediaDate} onChange={onMediaDateChange}></TextField>
                    <TextField label="Picture URL" value={mediaPicture} onChange={onMediaPictureChange}></TextField>
                    <CheckList items={allTags} setChecked={handleSetChecked}>
                    </CheckList>
                    <Box className="flex-right">
                        <Button type="contained" onClick={addMediaClick}>Add</Button>
                    </Box>
                </Card>

                {/* ADD EPISODE */}
                <Card className="flex-down seperate-children-small padding">
                    <Typography variant="h5">Add Episode</Typography>
                    <TextField label="Title" value={episodeName} onChange={onEpisodeNameChange}></TextField>
                    <TextField label="Description" value={episodeDesc} onChange={onEpisodeDescChange}></TextField>
                    <TextField label="Season" type={"number"} value={episodeSeason} onChange={onEpisodeSeasonChange}></TextField>
                    <TextField label="Episode" type={"number"} value={episodeNumber} onChange={onEpisodeNumberChange}></TextField>
                    <Typography>Parent:</Typography>
                    <SelectComponent
                        label={"Parent"}
                        options={episodeParentOptions}
                        onChange={onEpisodeParentChange}
                        />                
                    <TextField label="" type={"date"} value={episodeDate} onChange={onEpisodeDateChange}></TextField>
                    <TextField label="Picture URL" value={episodePicture} onChange={onEpisodePictureChange}></TextField>
                    <Box className="flex-right">
                        <Button type="contained" onClick={addEpisodeClick}>Add</Button>
                    </Box>
                </Card>
            </Box>
        </>
    )
}

export default AdminPage