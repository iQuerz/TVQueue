
import { Box, Button, Card, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";

function AdminPage() {

    //#region Add Tag
    let [tagName, setTagName] = useState("");
    function onTagNameChange(event){
        setTagName(event.target.value);
    }

    function addTagClick(){
        tryAddTag();
    }
    async function tryAddTag(){
        try {
            const tag = {name: tagName}
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
        try {
            const tag = {name: tagSearch}
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
        try {
            const account = {
                name: accountName,
                email: accountEmail,
                password: accountPassword,
                picture: accountPicture
            }
            const body = JSON.stringify(account);
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

    function loadAccountClick(){
        tryLoadAccount();
    }
    async function tryLoadAccount(){
    }

    function deleteAccountClick(){

    }
    function updateAccountClick(){

    }
    //#endregion

    //#region Add Show/Movie
    let [mediaName, setMediaName] = useState("");
    function onMediaNameChange(event){ setMediaName(event.target.value); }
    let [mediaDesc, setMediaDesc] = useState("");
    function onMediaDescChange(event){ setMediaDesc(event.target.value); }
    let [mediaType, setMediaType] = useState("");
    function onMediaTypeChange(event){ setMediaType(event.target.value); }
    let [mediaDate, setMediaDate] = useState("");
    function onMediaDateChange(event){ setMediaDate(event.target.value); }
    let [mediaPicture, setMediaPicture] = useState("");
    function onMediaPictureChange(event){ setMediaPicture(event.target.value); }

    function addMediaClick(){
        tryAddMedia();
    }
    async function tryAddMedia(){
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
    let [episodeParent, setEpisodeParent] = useState("");
    function onEpisodeParentChange(event){ setEpisodeParent(event.target.value); }
    let [episodeType, setEpisodeType] = useState("");
    function onEpisodeTypeChange(event){ setEpisodeType(event.target.value); }
    let [episodeDate, setEpisodeDate] = useState("");
    function onEpisodeDateChange(event){ setEpisodeDate(event.target.value); }
    let [episodePicture, setEpisodePicture] = useState("");
    function onEpisodePictureChange(event){ setEpisodePicture(event.target.value); }

    function addEpisodeClick(){
        tryAddEpisode();
    }
    async function tryAddEpisode(){
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
                    <Typography variant="h5">Add Account</Typography>
                    <TextField label="Name" value={accountName} onChange={onAccountNameChange}></TextField>
                    <TextField label="Email" value={accountEmail} onChange={onAccountEmailChange}></TextField>
                    <TextField label="Password" value={accountPassword} onChange={onAccountPasswordChange}></TextField>
                    <TextField label="Picture URL" value={accountPicture} onChange={onAccountPictureChange}></TextField>
                    <Button type="contained" onClick={addAccountClick}>Add</Button>
                </Card>

                {/* EDIT ACCOUNT */}
                <Card className="flex-down seperate-children-small padding">
                    <Typography variant="h5">Edit Account</Typography>
                    <TextField label="Email" value={accountSearch} onChange={setAccountSearch}></TextField>
                    <Button type="contained" onClick={loadAccountClick}>Load</Button>
                    <TextField label="Name" value={newAccountName} onChange={onNewAccountNameChange}></TextField>
                    <TextField label="Email" value={newAccountEmail} onChange={onNewAccountEmailChange}></TextField>
                    <TextField label="Password" value={newAccountPassword} onChange={onNewAccountPasswordChange}></TextField>
                    <TextField label="Picture URL" value={newAccountPicture} onChange={onNewAccountPictureChange}></TextField>
                    <Box className="flex-right">
                        <Button type="contained" onClick={deleteAccountClick}>Delete</Button>
                        <Button type="contained" onClick={updateAccountClick}>Update</Button>
                    </Box>
                </Card>

                {/* ADD MOVIE/SHOW */}
                <Card className="flex-down seperate-children-small padding">
                    <Typography variant="h5">Add Show/Movie</Typography>
                    <TextField label="Title" value={mediaName} onChange={onMediaNameChange}></TextField>
                    <TextField label="Description" value={mediaDesc} onChange={onMediaDescChange}></TextField>
                    <TextField label="Type (select)" value={mediaType} onChange={onMediaTypeChange}></TextField>
                    <TextField label="" type={"date"} value={mediaDate} onChange={onMediaDateChange}></TextField>
                    <TextField label="Picture URL" value={mediaPicture} onChange={onMediaPictureChange}></TextField>
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
                    <TextField label="Type (select)" value={episodeType} onChange={onEpisodeTypeChange}></TextField>
                    <TextField label="" type={"date"} value={episodeDate} onChange={onEpisodeDateChange}></TextField>
                    <TextField label="Parent (select)" value={episodeParent} onChange={onEpisodeParentChange}></TextField>
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