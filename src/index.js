// src/index.js

const express = require("express");
const app = express();

app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "UP" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;