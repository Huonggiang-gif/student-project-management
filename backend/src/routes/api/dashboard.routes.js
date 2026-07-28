const express = require("express");
const router = express.Router();
const dashboardController = require("../../controllers/api/dashboard.controller");
const { authMiddleware } = require("../../middleware/auth.middleware");

router.get(
    "/stats",
    authMiddleware,
    dashboardController.getDashboardStats
);

router.get(
    "/lecturer",
    authMiddleware,
    dashboardController.getLecturerDashboard
);

router.get(
    "/student",
    authMiddleware,
    dashboardController.getStudentDashboard
);

module.exports = router;