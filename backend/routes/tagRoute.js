const express = require("express");
const router = express.Router();
const _tag = require("../services/tagService");

router.route("/")
    .get(_tag.getAllTags)
    .post(_tag.setTag)

router.route("/:id")
    .get(_tag.getTag)
    .put(_tag.updateTag)
    .patch(_tag.patchTag)
    .delete(_tag.deleteTag)

module.exports = router;