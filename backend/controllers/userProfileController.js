const express = require("express");
const router = express.Router();
const logger = require("../utils/logger.js");
const userProfileService = require("../services/userProfileService.js");


router.post("/", async function createUserProfile(req, res)
{
  const userData=req.body;
  try{
     console.log(userData); 
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
    const primaryEmail = req.params.primaryEmail.toString();
    const userProfile = await userProfileService.getUserProfileByPrimaryEmail(primaryEmail);

    return res.json(userProfile);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});


router.get("/", async function getAllUserProfiles(req, res) {
  try {

    const userProfiles = await userProfileService.getAllUserProfiles();
    if(userProfiles.length === 0)
        return res.status(404).json("No users profiles found");
    else
        return res.json(userProfiles);
  } 
  catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

module.exports = router;
