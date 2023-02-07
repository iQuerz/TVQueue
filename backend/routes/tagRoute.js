const express = require("express");
const router = express.Router();

const _tag = require("../services/tagService");
const _mw = require("../helpers/middlewares")

//Tags
router.route("/")
    .get(_tag.getAllTags)
    .post(_tag.createTag)

router.route("/:tagId")
    .get(_tag.getTag)
    .patch(_mw.checker.isBodyEmpty, _tag.patchTag)
    .delete(_tag.deleteTag)

//Tags + CustomMedia
router.route("/:tagId/media")
    .get(_tag.filterCustomMediaInTag)
    .post(_mw.checker.isBodyEmpty, _tag.addCustomMediaInTag)

router.route("/:tagId/media/:mediaId")
    .patch(_mw.checker.isBodyEmpty, _tag.updateCustomMediaInTag)
    .delete(_tag.deleteCustomMediaInTag)

module.exports = router;