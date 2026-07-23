const express = require("express");
const cors = require("cors");

const app = express();

// Cho phép frontend truy cập
app.use(cors());

app.use(express.json());

const authRoutes = require("./routes/api/auth.route");

app.use("/api/auth", authRoutes);

module.exports = app;