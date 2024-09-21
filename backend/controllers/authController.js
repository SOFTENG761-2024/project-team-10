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

router.post('/email-signin', async (req, res) => {
  passport.authenticate('local', { session: true }, (err, user, info) => {
    if (err) {
      return res.status(500).json(err);
    }
    if (!user) {
      return res.status(401).json(info);
    }
    
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.json(user);
    });
  })(req, res);
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
    if (user.email && user.email.trim() != '') {
      dbUser.primary_email = user.email.trim();
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

router.get("/verify/:is_verified", async function getAllVerifiedUserProfiles(req, res) {
  try {
    let is_verified = req.params.is_verified ?
      (req.params.is_verified.toLowerCase() === 'true' ? true : false) :
      false;
    const userProfiles = await userProfileService.getAllVerifiedUserProfiles(is_verified);
    if (userProfiles.length === 0)
      return res.status(404).json("No users profiles found");
    else {
      let resultobj = userProfiles.map((userProfile) => {
        return {
          id: userProfile.id,
          usertype: userProfile.usertype.name,
          first_name: userProfile.first_name,
          last_name: userProfile.last_name,
          email: userProfile.primary_email,
          is_verified: userProfile.is_verified,
          organization: userProfile.organization?.name,
        };
      });
      return res.json(resultobj);
    }

  }
  catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

router.post("/verify/:id", async function verifyUserProfile(req, res) {
  try {
    const id = req.params.id;
    // initiate password
    const password = passwordService.generateRandomPassword();
    const hashedPassword = await passwordService.hashPassword(password);

    const userprofileObject = { id: id, is_verified: true, password: hashedPassword };
    const result = await userProfileService.updateUserProfile(userprofileObject);
    // Send email to user
    // Use a message queue to send emails in production
    const userProfile = await userProfileService.getUserProfileById(id);
    await createAccountEmailService.sendBusinessAccountVerifiedEmail(userProfile.primary_email, password);
    return res.json(result.is_verified);
  } catch (error) {
    console.log(error);
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


module.exports = router;
