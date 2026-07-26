const express = require("express");
const cors = require("cors");

const app = express();

// Cho phép frontend truy cập
app.use(cors());

app.use(express.json());

const authRoutes = require("./routes/api/auth.route");
const topicRoutes = require("./routes/api/topic.route");
const progressRoutes = require("./routes/api/progress.routes");
const userRoutes = require("./routes/api/user.route");

app.use("/api/auth", authRoutes);
app.use("/api/topics", topicRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/users", userRoutes);

module.exports = app;