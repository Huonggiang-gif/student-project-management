const Dashboard = require("../../models/dashboard.model");

//Tổng quan cho Admin
exports.getDashboardStats = async (req, res) => {
    try {
        const stats = await Dashboard.getStats();
        res.json({
            success: true,
            data: stats
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Lỗi server"
        });
    }
};

// Tổng quan cho GV
exports.getLecturerDashboard = async (req, res) => {
    try {
        const stats = await Dashboard.getLecturerStats(req.user.id);
        res.json({
            success: true,
            data: stats
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Lỗi server"
        });
    }
};

// Tổng quan cho sV
exports.getStudentDashboard = async (req, res) => {
    try {
        const stats = await Dashboard.getStudentStats(req.user.id);
        res.json({
            success: true,
            data: stats
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Lỗi server"
        });
    }
};