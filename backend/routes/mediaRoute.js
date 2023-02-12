const express = require("express");
const router = express.Router();

const _media = require("../services/mediaService");
const _account = require("../services/accountService");

const _auth = require("../services/authService");
const _mw = require("../helpers/middlewares")

// //Login + Register
// router.post("/register", _auth.register)
// router.post("/login", _auth.login)
// router.get("/logout", _auth.logout)

// //Accounts + Me
// router.route("/me")
//     .get(_mw.access.protect, _account.getMe, _account.getAccount)
//     .patch(_mw.access.protect, _account.getMe, _account.patchAccount)
//     .delete(_mw.access.protect, _account.getMe, _account.deleteAccount)

// router.route("/me/tags")
//     .post(_mw.access.protect, _account.getMe,_account.addFollowingTags)
//     .delete(_mw.access.protect, _account.getMe, _account.removeFollowingTags)
    
//Media
router.route("/")
    .get(_media.getAllMedia)
    .post(_media.createMedia)

router.route("/:mediaId")
    .get(_media.getMedia)
//     .patch(_account.patchAccount)
    .delete(_media.deleteMedia)

//Media + Review
router.route("/:mediaId/reviews")
    .post(_mw.access.protect, _media.addReview)
// //Accounts + Tags
// router.route("/:accountId/tags")
//     .post(_account.addFollowingTags)
//     .patch(_account.updateFollowingTag)
//     .delete(_account.removeFollowingTags)


//Accounts + Playlists

//Accounts + Reviews

module.exports = router;