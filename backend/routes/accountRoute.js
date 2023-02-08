const express = require("express");
const router = express.Router();

const _account = require("../services/accountService");
const _auth = require("../services/authService");
const _mw = require("../helpers/middlewares")
const _enum = require("../helpers/enums")

//Login + Register
router.post("/register", _auth.register)
router.post("/login", _auth.login)

//Accounts + Me
router.route("/me")
    .get(_mw.access.protect, _account.getMe, _account.getAccount)
    .patch(_mw.access.protect, _account.getMe, _account.patchAccount)
    .delete(_mw.access.protect, _account.getMe, _account.deleteAccount)

router.route("/me/tags")
    .post(_mw.access.protect, _account.getMe,_account.addFollowingTags)
    .delete(_mw.access.protect, _account.getMe, _account.removeFollowingTags)
    
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

//Accounts + Reviews





module.exports = router;