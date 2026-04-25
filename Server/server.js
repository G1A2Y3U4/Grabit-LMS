const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profile");
const passwordRoutes = require("./routes/password");
const questionRoutes = require("./routes/questionRoutes");
const resultRoutes = require("./routes/resultRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/password", passwordRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/results", resultRoutes);

app.get("/", (req, res) => {
  res.send("Server Running 🚀");
});

app.get("/api/test-db", (req, res) => {
  db.query("SELECT 1", (err) => {
    if (err) {
      return res.json({ success: false, error: err });
    }

    res.json({
      success: true,
      message: "Database Connected ✅",
    });
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});