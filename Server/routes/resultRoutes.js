const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Save test result
router.post("/save", (req, res) => {
  console.log("REQ BODY:", req.body);

  const {
    user_id,
    test_type,
    section_type,
    topic_name,
    total_questions,
    score,
    wrong_answers,
    percentage,
    time_taken_seconds,
  } = req.body;

  if (
    !user_id ||
    !test_type ||
    !topic_name ||
    total_questions === undefined ||
    score === undefined ||
    wrong_answers === undefined ||
    percentage === undefined ||
    time_taken_seconds === undefined
  ) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields",
    });
  }

  const sql = `
    INSERT INTO test_results (
      user_id,
      test_type,
      section_type,
      topic_name,
      total_questions,
      score,
      wrong_answers,
      percentage,
      time_taken_seconds
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    user_id,
    test_type,
    section_type || null,
    topic_name,
    total_questions,
    score,
    wrong_answers,
    percentage,
    time_taken_seconds,
  ];

  db.query(sql, values, (err) => {
    if (err) {
      console.error("Save result error:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to save result",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Result saved successfully",
    });
  });
});

// Get only logged-in user's results
router.get("/all/:userId", (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "User ID is required",
    });
  }

  const sql = `
    SELECT *
    FROM test_results
    WHERE user_id = ?
    ORDER BY created_at DESC
    LIMIT 20
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("Fetch results error:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch results",
      });
    }

    return res.status(200).json({
      success: true,
      results,
    });
  });
});

module.exports = router;