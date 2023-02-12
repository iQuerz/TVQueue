const express = require("express");
const router = express.Router();

const _account = require("../services/accountService");
const _media = require("../services/mediaService");
const _tag = require("../services/tagService");

//Lepse izgleda sa .route 
router.route("/top-:num_text-tags").get(_tag.aliasTopTags, _tag.getAllTags)
router.route("/our-tags").get(_tag.aliasStaticTags, _tag.getAllTags)
router.route("/genres").get(_tag.aliasGenreTags, _tag.getAllTags)

//Ultimate search?
router.route("/search/:option").get(async(req, res) => {
    
})


module.exports = router;