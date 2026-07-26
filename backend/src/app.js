const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

// Cho phép frontend truy cập
app.use(cors());

app.use(express.json());

<<<<<<< Updated upstream
const authRoutes = require("./routes/api/auth.route")
app.use("/api/auth", authRoutes)

const userRoute = require("./routes/api/user.route")
app.use("/api/users", userRoute)
=======
app.use(
    "/uploads",
    express.static(path.join(__dirname, "../uploads"))
)

const authRoutes = require("./routes/api/auth.route");
const reportRoute = require("./routes/api/report.route");
const progressRoute = require("./routes/api/progress.route");
const evaluationRoute = require("./routes/api/evaluation.route");

app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoute);
app.use("/api/progress", progressRoute);
app.use("/api/evaluations", evaluationRoute);
>>>>>>> Stashed changes

module.exports = app;

console.log(
    path.join(__dirname, "../uploads")
)