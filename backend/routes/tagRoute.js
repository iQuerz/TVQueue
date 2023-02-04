const express = require("express");
const router = express.Router();
const _tag = require("../services/tagService");

router.route("/")
    .get(_tag.getAllTags)
    .post(_tag.createTag)

router.route("/:tagId")
    .get(_tag.getTag)
    .patch(_tag.patchTag)
    .delete(_tag.deleteTag)

router.route("/:tagId/media")
    .get(_tag.getAllCustomMediaFromTag)
    .put(_tag.addCustomMediaToTag)

// router.route("/:tagId/media/:mediaId")


module.exports = router;