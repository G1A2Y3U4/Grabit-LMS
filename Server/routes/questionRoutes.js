const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Utility: shuffle
function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

// 🔥 MOCK TEST (20 + 20 + 20)
router.get("/mock/test", (req, res) => {
  const sql = `
    SELECT 
      q.id,
      q.question_text,
      q.option_a,
      q.option_b,
      q.option_c,
      q.option_d,
      q.correct_answer,
      q.difficulty,
      t.id AS topic_id,
      t.name AS topic_name,
      c.name AS category_name
    FROM questions q
    JOIN topics t ON q.topic_id = t.id
    JOIN categories c ON t.category_id = c.id
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.log("Mock fetch error:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch mock test questions",
      });
    }

    if (!result || result.length === 0) {
      return res.json({
        success: true,
        questions: [],
      });
    }

    // 🔥 Split into 3 sections
    const quant = shuffleArray(
      result.filter((q) => q.category_name === "Quantitative Aptitude")
    ).slice(0, 20);

    const reasoning = shuffleArray(
      result.filter((q) => q.category_name === "Logical Reasoning")
    ).slice(0, 20);

    const verbal = shuffleArray(
      result.filter((q) => q.category_name === "Verbal Ability")
    ).slice(0, 20);

    const finalQuestions = [...quant, ...reasoning, ...verbal];

    res.json({
      success: true,
      total: finalQuestions.length,
      questions: finalQuestions,
    });
  });
});

// 🔥 TOPIC-WISE
router.get("/:topic", (req, res) => {
  const topicName = decodeURIComponent(req.params.topic);

  const sql = `
    SELECT 
      q.id,
      q.question_text,
      q.option_a,
      q.option_b,
      q.option_c,
      q.option_d,
      q.correct_answer,
      q.difficulty
    FROM questions q
    JOIN topics t ON q.topic_id = t.id
    WHERE t.name = ?
  `;

  db.query(sql, [topicName], (err, result) => {
    if (err) {
      console.log("Topic fetch error:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch topic questions",
      });
    }

    res.json({
      success: true,
      questions: result,
    });
  });
});

module.exports = router;