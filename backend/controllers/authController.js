//SignIn
// get token and profile - email address
// use email address to query database to get userid, return to front-end
const userProfileService = require("../services/userProfileService.js");
const express = require("express");
const passport = require("passport");
const path = require("path");
const router = express.Router();
const env = require("dotenv");

env.config({ path: path.resolve(__dirname, "../.env") });

// auth login
// router.get('/login', async (req,res) => {
//     res.render('login');
// })

//auth logout
router.get("/signout", async (req, res) => {
  //handle with passport
  res.send("signingout");
});

//Linkdein SignIn
router.get(
  "/linkedin",
  passport.authenticate("linkedin", { state: "123", passReqToCallback: true }));

//callback route for linkedin to redirect to
router.get('/linkedin/redirect', passport.authenticate('linkedinOpenId', {
  // successRedirect: process.env.FRONT_END_BASE_URL + "/account-screen",
  failureRedirect: process.env.FRONT_END_BASE_URL + '/signin', failureMessage: true
}), (req, res) => {
  if (req.user.is_verified) {
    res.redirect(process.env.FRONT_END_BASE_URL); // Redirect to home if verified
  } else {
    res.redirect(process.env.FRONT_END_BASE_URL + '/account-screen'); // Redirect to screen if not verified
  }
});

router.get("/current-user", async (req, res) => {
  try {
    console.log("current user: ", req.user);
    return res.json(req.user);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post("/account-screen", async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    const user = req.body;
    const dbUser = {};
    if (user.first_name && user.first_name.trim() != '') {
      dbUser.first_name = user.first_name.trim();
    }
    if (user.last_name && user.last_name.trim() != '') {
      dbUser.last_name = user.last_name.trim();
    }
    if (user.organization_name && user.organization_name.trim() != '') {
      dbUser.organization = { name: user.organization_name.trim() };
    }
    dbUser.id = req.user.id;
    const profile = await userProfileService.updateUserProfile(dbUser);

    return res.json(profile);
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
