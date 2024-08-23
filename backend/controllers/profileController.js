const express = require("express");
const router = express.Router();
const profileService = require("../services/profileService.js");

/**
 * @swagger
 * /api/profiles:
 *   post:
 *     tags:
 *     - Profile Controller
 *     consumes: application/json
 *     summary: Create a new profile
 *     parameters:
 *       - in: body
 *         name: body
 *         schema:
 *           type: object
 *           properties:
 *             userId:
 *                 type: string
 *             bio:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Profile created successfully
 *       '500':
 *         description: Internal server error
 */
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

/**
 * @swagger
 * /api/profiles/{userId}:
 *   get:
 *     tags:
 *     - Profile Controller
 *     summary: Get profile by userId
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       '200':
 *         description: Profile found
 *       '404':
 *         description: Profile not found
 *       '500':
 *         description: Internal server error
 */
router.get("/:userId", async function getProfileByUserId(req, res) {
  try {
    const userId = req.params.userId;
    const profile = await profileService.getProfileByUserId(userId);

    return res.json(profile);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

module.exports = router;
