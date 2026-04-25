const express = require("express");
const router = express.Router();
const db = require("../config/db");

// UPDATE PROFILE
router.put("/update/:id", (req, res) => {
  const { username, email } = req.body;
  const { id } = req.params;

  const sql = `
    UPDATE users 
    SET username = ?, email = ?
    WHERE id = ?
  `;

  db.query(sql, [username, email, id], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ success: false });
    }

    res.json({
      success: true,
      user: { id, username, email },
    });
  });
});

module.exports = router;