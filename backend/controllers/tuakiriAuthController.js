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

// auth login
// router.get('/login', async (req,res) => {
//     res.render('login');
// })

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
  failureRedirect: "https://www.academicfellows.com/signin", failureMessage: true
}), (req, res) => {
  
    res.redirect("https://www.academicfellows.com/search-profile"); // Redirect to search page if verified
  
});

router.get("/current-user", async (req, res) => {
  try {
    console.log("current user: ", req.user);
    return res.json(req.user);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post("/test", async (req, res) => {
  try {
    console.log("test");
    await createAccountEmailService.sendBusinessAccountVerifiedEmail('tableliu@hotmail.com');
    return res.json("test");
  } catch (error) {
    return res.status(500).json(error);
  }
});

//end point to update user password
router.put("/updatePassword/:id", async function updatePassword(req, res)  {
  try
  {
    const id = req.params.id;
    const hashedPassword = await passwordService.hashPassword(req.body.password);
    const userprofileObject = { id: id, password: hashedPassword, password_update_datetime: new Date() };
    const updatedUser = await userProfileService.updateUserProfile(userprofileObject);
    return res.json(updatedUser);
  } 
  catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});


module.exports = router;
