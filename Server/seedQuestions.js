require("dotenv").config();
const mysql = require("mysql2/promise");

const quantQuestions = require("./quant_full_questions.json");
const reasoningQuestions = require("./reasoning_questions.json");
const verbalQuestions = require("./verbal_questions.json");

const allQuestions = [
  ...quantQuestions,
  ...reasoningQuestions,
  ...verbalQuestions
];

async function seedQuestions() {
  let connection;

  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT || 3306
    });

    console.log("MySQL Connected ✅");

    await connection.beginTransaction();

    for (const q of allQuestions) {
      const [topicRows] = await connection.execute(
        "SELECT id FROM topics WHERE name = ? LIMIT 1",
        [q.topic]
      );

      if (topicRows.length === 0) {
        console.log(`Topic not found: ${q.topic}`);
        continue;
      }

      const topicId = topicRows[0].id;

      await connection.execute(
        `INSERT INTO questions
        (topic_id, question_text, option_a, option_b, option_c, option_d, correct_answer, difficulty)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          topicId,
          q.question,
          q.options[0],
          q.options[1],
          q.options[2],
          q.options[3],
          q.answer,
          q.difficulty || "easy"
        ]
      );
    }

    const [beforeCommit] = await connection.execute(
      "SELECT COUNT(*) AS total FROM questions"
    );
    console.log("Count before commit:", beforeCommit[0].total);

    await connection.commit();
    console.log("Transaction committed ✅");

    const [afterCommitSameConn] = await connection.execute(
      "SELECT COUNT(*) AS total FROM questions"
    );
    console.log("Count after commit (same connection):", afterCommitSameConn[0].total);

    await connection.end();

    const verifyConnection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT || 3306
    });

    const [afterCommitNewConn] = await verifyConnection.execute(
      "SELECT COUNT(*) AS total FROM questions"
    );
    console.log("Count after commit (new connection):", afterCommitNewConn[0].total);

    const [sampleRows] = await verifyConnection.execute(
      "SELECT id, question_text FROM questions LIMIT 5"
    );
    console.log("Sample rows:", sampleRows);

    await verifyConnection.end();
  } catch (error) {
    if (connection) {
      try {
        await connection.rollback();
        console.log("Transaction rolled back ❌");
      } catch {}
    }
    console.log("Seed error:", error);
  }
}

seedQuestions();