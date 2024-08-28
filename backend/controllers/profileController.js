const express = require("express");
const router = express.Router();
const profileService = require("../services/profileService.js");

//swagger documentation in swaggerDoc.yaml with path: /api/profiles 

router.post("/", async function createProfile(req, res) {
  try {
    const { userId, bio } = req.body;

    const profile = await profileService.createProfile({
      userId,
      bio,
    });
    res.status(201).json(profile);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});


router.get("/userId:userId", async function getProfileByUserId(req, res) {
  try {
    const userId = req.params.userId;
    const profile = await profileService.getProfileByUserId(userId);

    return res.json(profile);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});


router.get("/Bio:bio", async function getProfileByBio(req, res) {
  try {
    const bio = req.params.bio;
    console.log(bio);
    const profile = await profileService.getProfileByBio(bio);
    return res.json(profile);
  } 
  catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

module.exports = router;
