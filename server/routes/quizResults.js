import express from "express";
import verifyJWT from "../middleware/verifyJWT.js";
import categories from "../../client/src/components/Quiz/categories.js";

const router = express.Router();

router.post("/results", verifyJWT, (req, res) => {
  try {
    const { scores } = req.body;

    if (!scores) {
      return res.status(400).json({ error: "No scores provided" });
    }

    let maxScore = 0;
    let topCategory = "";

    for (const category in scores) {
      if (scores[category] > maxScore) {
        maxScore = scores[category];
        topCategory = category;
      }
    }

    const recommendation = categories[topCategory];

    res.json({
      topCategory,
      recommendation,
      scores,
      username: req.user,
    });
  } catch (error) {
    console.error("Error processing quiz results:", error);
    res.status(500).json({ error: "Server error processing quiz results" });
  }
});

export default router;
