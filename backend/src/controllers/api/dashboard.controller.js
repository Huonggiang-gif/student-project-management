const Dashboard = require("../../models/dashboard.model");

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