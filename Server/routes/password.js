const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcrypt");

// CHANGE PASSWORD
router.put("/change/:id", (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const { id } = req.params;

  const sql = "SELECT * FROM users WHERE id = ?";

  db.query(sql, [id], async (err, result) => {
    if (result.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = result[0];

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Current password incorrect",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updateSql = "UPDATE users SET password = ? WHERE id = ?";

    db.query(updateSql, [hashedPassword, id], (err) => {
      if (err) {
        return res.status(500).json({
          message: "Password update failed",
        });
      }

      res.json({
        success: true,
        message: "Password updated successfully",
      });
    });
  });
});

module.exports = router;