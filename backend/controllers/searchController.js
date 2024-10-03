const express = require("express");
const router = express.Router();
const userProfileService = require("../services/userProfileService.js");

//swagger documentation in swaggerDoc.yaml with path: /api/search

//Get search results
router.get("/", async function searchProfiles(req, res) {
    try {
      const { keyword } = req.query;
      const searchResults = await userProfileService.searchUserProfilesByKeywords(keyword);
      if (searchResults.length === 0)
        return res.status(404).json("No users profiles found");
      else
        return res.json(searchResults);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  });

  module.exports = router;