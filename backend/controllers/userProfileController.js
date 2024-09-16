const express = require("express");
const router = express.Router();
const userProfileService = require("../services/userProfileService.js");

//swagger documentation in swaggerDoc.yaml with path: /api/userprofile

router.post("/", async function createUserProfile(req, res) {
  const userData = req.body;
  try {
    const userProfile = await userProfileService.createUserProfile(userData);
    res.status(201).json(userProfile);
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});



router.get("/primaryEmail:primaryEmail", async function getUserProfileByPrimaryEmail(req, res) {
  try {
    const primaryEmail = req.params.primaryEmail;
    console.log(primaryEmail);
    const userProfile = await userProfileService.getUserProfileByPrimaryEmail(primaryEmail);
    if (userProfile === null)
      return res.status(404).json("No user profile found");
    else
      return res.json(userProfile);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});


router.get("/", async function getAllUserProfiles(req, res) {
  try {

    const userProfiles = await userProfileService.getAllUserProfiles();
    if (userProfiles.length === 0)
      return res.status(404).json("No users profiles found");
    else
      return res.json(userProfiles);
  }
  catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

router.put("/:id", async function updateUserProfile(req, res) {
  try {
    const userProfile = req.body;
    console.log(userProfile);
    console.log(req.params.id);
    const updatedUserProfile = await userProfileService.updateUserProfileById(req.params.id, userProfile);
    res.json(updatedUserProfile);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.put("/", async function updateUserProfile(req, res) {
  try {
    const userProfile = req.body;
    console.log(userProfile);
    const updatedUserProfile = await userProfileService.updateUserProfile(userProfile);
    res.json(updatedUserProfile);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
