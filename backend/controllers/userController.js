const express = require("express");
const router = express.Router();
const userService = require("../services/userService.js");

//swagger documentation in swaggerDoc.yaml with path: /api/users

router.post("/", async function createUser(req, res) {
  try {
    const { userName, email, userId, imageUrl } = req.body;

    const user = await userService.createUser({
      userName,
      email,
      userId,
      imageUrl,
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});


router.get("/:userId", async function getUserById(req, res) {
  try {
    const userId = req.params.userId;
    const user = await userService.getUserById(userId);

    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

module.exports = router;
