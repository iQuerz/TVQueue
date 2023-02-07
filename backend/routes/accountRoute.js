const express = require("express");
const router = express.Router();

const _account = require("../services/accountService");
const _auth = require("../services/authService");
const _mw = require("../helpers/middlewares")
const _role = require("../helpers/roles")

//Login + Register
router.post("/register", _auth.register)
router.post("/login", _auth.login)

//Accounts
router.route("/")
    .get(_mw.access.protect, 
        _mw.access.authorize(_role.Admin), 
        _account.getAllAccounts)
    //.post(_account.createAccount)

// router.route("/:accountId")
//     .get(_account.getTag)
//     .patch(_account.checker.isBodyEmpty, _account.patchTag)
//     .delete(_account.deleteTag)

module.exports = router;