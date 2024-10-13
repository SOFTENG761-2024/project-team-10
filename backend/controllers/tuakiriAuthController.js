//SignIn
// get token and profile - email address
// use email address to query database to get userid, return to front-end
const userProfileService = require("../services/userProfileService.js");
const express = require("express");
const passport = require("passport");
const path = require("path");
const router = express.Router();
const env = require("dotenv");
const createAccountEmailService = require("../services/createAccountEmailService.js");
const passwordService = require("../services/passwordService.js");

env.config({ path: path.resolve(__dirname, "../.env") });

//auth logout
router.get("/signout", async (req, res) => {
  //handle with passport
  res.send("signingout");
});

//Tuakiri SignIn
router.get(
  "/tuakiri",
  passport.authenticate("openidconnect", { state: "123", passReqToCallback: true }));

//callback route for Tuakiri to redirect to
router.get('/tuakiri/redirect', passport.authenticate('tuakiriOpenId', {
  failureRedirect: process.env.FRONT_END_BASE_URL + '/signin', failureMessage: true
}), (req, res) => {
  
    res.redirect(process.env.FRONT_END_BASE_URL + '/search-profile'); // Redirect to search page if verified
  
});

router.get("/current-user", async (req, res) => {
  try {
    console.log("current user: ", req.user);
    return res.json(req.user);
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
