const express = require("express");
const router = express.Router();
const warpAsync = require("../utils/warpAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userConteoller = require("../controller/user.js");

router
    .route("/signup")
    .get(userConteoller.renderSignUpForm)
    .post(warpAsync(userConteoller.signUp));

router
    .route("/login")
    .get(userConteoller.renderLoginForm)
    .post(saveRedirectUrl,
    passport.authenticate( "local", {
        failureRedirect: '/login', 
        failureFlash: true,
    }), 
    userConteoller.login );

router.get("/logout", userConteoller.logout);

module.exports = router;