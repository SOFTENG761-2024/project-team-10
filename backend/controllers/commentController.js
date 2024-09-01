const express = require("express");
const router = express.Router();
const logger = require("../utils/logger.js");
const commentService = require("../services/commentService.js");

//swagger documentation in swaggerDoc.yaml with path: /api/comments 

router.get("/:voteId", async function getCommentsBy(req, res) {
  try {
    const { voteId } = req.params;
    const { isTotalCount } = req.query;
    if (isTotalCount) {
      res.status(200).json(await commentService.getTotalNumRecords({ voteId }));
      return;
    }
  } catch (error) {
    logger.error(JSON.stringify(error));
    if (error.response?.status) {
      res.status(error.response.status).json({ error: error.message });
      return;
    }
    res.status(500).json({ message: error.message });
  }
});


router.get("/:userId/:voteId", async function getCommentsBy(req, res) {
  try {
    const { userId, voteId } = req.params;
    const { page, limit } = req.query;

    const comments = await commentService.getCommentsBy(
      { userId, voteId, commentId: null },
      page,
      limit
    );

    res.json(comments);
  } catch (error) {
    logger.error(JSON.stringify(error));
    if (error.response?.status) {
      res.status(error.response.status).json({ error: error.message });
      return;
    }
    res.status(500).json({ message: error.message });
  }
});


router.post("/:userId/:voteId", async function createComment(req, res) {
  const { comment, isAI } = req.body;
  const { userId, voteId } = req.params;
  try {
    const createdComment = await commentService.createComment({
      userId,
      voteId,
      comment,
      isAI,
    });
    res.status(201).json(createdComment);
  } catch (error) {
    logger.error(error);
    res.status(500).json(error);
  }
});


router.delete("/:commentId", async function deleteComment(req, res) {
  const { commentId } = req.params;
  try {
    const deletedComment = await commentService.deleteComment(commentId);
    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    logger.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
