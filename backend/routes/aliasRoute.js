const express = require("express");
const router = express.Router();

const _account = require("../services/accountService");
const _media = require("../services/mediaService");
const _tag = require("../services/tagService");


router.route("/top-:num_text-tags").get(_tag.aliasTopTags, _tag.getAllTags)
router.route("/our-tags").get(_tag.aliasStaticTags, _tag.getAllTags)
router.route("/genres").get(_tag.aliasGenreTags, _tag.getAllTags)


module.exports = router;