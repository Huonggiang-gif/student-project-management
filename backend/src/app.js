const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

// Cho phép frontend truy cập
app.use(cors());

// Parse JSON
app.use(express.json());

const authRoutes = require("./routes/api/auth.route");
const topicRoutes = require("./routes/api/topic.route");
const reportRoute = require("./routes/api/report.route");
const progressRoute = require("./routes/api/progress.route");
const evaluationRoute = require("./routes/api/evaluation.route");
const userRoutes = require("./routes/api/user.route");

app.use("/api/auth", authRoutes);
app.use("/api/topics", topicRoutes);
app.use("/api/reports", reportRoute);
app.use("/api/progress", progressRoute);
app.use("/api/evaluations", evaluationRoute);
app.use("/api/users", userRoutes);

app.use(
    "/uploads",
    express.static(path.join(__dirname, "../uploads"))
)

module.exports = app;
