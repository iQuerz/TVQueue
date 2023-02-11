const express = require("express");
const router = express.Router();

const _account = require("../services/accountService");
const _auth = require("../services/authService");
const _mw = require("../helpers/middlewares")

//Login + Register
router.post("/register", _auth.register)
router.post("/login", _auth.login)
router.get("/logout", _auth.logout)

//Accounts + Me
router.route("/me")
    .get(_mw.access.protect, _account.getMe, _account.getAccount)
    .patch(_mw.access.protect, _account.getMe, _account.patchAccount)
    .delete(_mw.access.protect, _account.getMe, _account.deleteAccount)

router.route("/me/tags")
    .post(_mw.access.protect, _account.getMe,_account.addFollowingTags)
    .delete(_mw.access.protect, _account.getMe, _account.removeFollowingTags)

router.route("/me/playlists/:playlist")
    .post(_mw.access.protect, _account.getMe, _account.addMediaToPlaylist)

router.route("/me/playlists/:playlist/:mediaId")
    .delete(_mw.access.protect, _account.getMe, _account.deleteMediaFromPlaylist)
    
//Accounts
router.route("/")
    .get(_account.getAllAccounts)
    .post(_account.createAccount)

router.route("/:accountId")
    .get(_account.getAccount)
    .patch(_account.patchAccount)
    .delete(_account.deleteAccount)

//Accounts + Tags
router.route("/:accountId/tags")
    .post(_account.addFollowingTags)
    .patch(_account.updateFollowingTag)
    .delete(_account.removeFollowingTags)


//Accounts + Playlists
router.route("/:accountId/playlists/:playlist")
    .post(_account.addMediaToPlaylist)

router.route("/:accountId/playlists/:playlist/:mediaId")
    .delete(_account.deleteMediaFromPlaylist)

//Accounts + Reviews





module.exports = router;