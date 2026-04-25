const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ================= SIGNUP =================
exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // 🔍 Check if user exists
    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, result) => {

        if (err) return res.status(500).json({ message: "DB error" });

        if (result.length > 0) {
          return res.status(400).json({ message: "User already exists" });
        }

        // 🔐 Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 💾 Insert user
        db.query(
          "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
          [username, email, hashedPassword],
          (err, result) => {
            if (err) return res.status(500).json({ message: "Insert error" });

            res.json({
              success: true,
              message: "Signup successful",
            });
          }
        );
      }
    );

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// ================= LOGIN =================
exports.login = (req, res) => {
  const { email, password } = req.body;

  console.log("Login attempt:", email, password);

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, result) => {

      console.log("DB result:", result);

      if (err) return res.status(500).json({ message: "DB error" });

      if (result.length === 0) {
        return res.status(400).json({ message: "User not found" });
      }

      const user = result[0];

      // 🔐 Compare password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid password" });
      }

      // 🎟️ Generate JWT token
      const token = jwt.sign(
        { id: user.id },
        "secretKey",
        { expiresIn: "7d" }
      );

      res.json({
        success: true,
        message: "Login successful",
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      });
    }
  );
};