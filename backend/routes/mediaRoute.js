const express = require("express");
const router = express.Router();

const _media = require("../services/mediaService");
const _account = require("../services/accountService");

const _auth = require("../services/authService");
const _mw = require("../helpers/middlewares")
    
//Media
router.route("/")
    .get(_media.getAllMedia)
    .post(_media.createMedia)

router.route("/:mediaId")
    .get(_media.getMedia)
    .patch(_media.patchMedia)
    .delete(_media.deleteMedia)

//Media + Review
router.route("/:mediaId/reviews")
    .post(_mw.access.protect, _media.addReview)

//Media + Tags
// router.route("/:accountId/tags")
//     .post(_account.addFollowingTags)
//     .patch(_account.updateFollowingTag)
//     .delete(_account.removeFollowingTags)

module.exports = router;