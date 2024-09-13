const express = require("express");
const router = express.Router();
const publicationService = require("../services/publicationService.js");

//swagger documentation in swaggerDoc.yaml with path: /api/publication

router.post("/", async function addPublicationForUser(req, res)
{
  const publicationData=req.body;
  try{
    const publication = await publicationService.createUserPublication(publicationData);
    res.status(201).json(publication);
  }
     catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});



router.get("/userId:userId", async function getPublicationsByUserId(req, res) {
  try 
  {
    const userId = req.params.userId;
    const publication = await publicationService.getPublicationsById(userId);
    if(publication === null || publication.length ===0)
      return res.status(404).json("No publication found");
    else
      return res.json(publication);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);

  }
});
module.exports = router;
