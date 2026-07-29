const reportModel = require("../../models/report.model")

// Lấy danh sách báo cáo theo đề tài
async function getReports(req, res) {
    const { topic_id } = req.params
    try {
        const reports = await reportModel.findReportsByTopic(topic_id)
        res.json(reports)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Lỗi khi lấy danh sách báo cáo"
        })
    }
}
// Lấy chi tiết báo cáo
async function getReportById(req, res) {
    const { id } = req.params
    try {
        const report = await reportModel.findReportById(id)
        if (!report) {
            return res.status(404).json({
                message: "Không tìm thấy báo cáo"
            })
        }
        res.json(report)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Lỗi khi lấy báo cáo"
        })
    }
}
// Lấy báo cáo của sinh viên thuộc giảng viên
async function getReportsByLecturer(req, res) {
    try {
        const lecturer_id = req.user.id
        const reports = await reportModel.findReportsByLecturer(lecturer_id)
        res.json(reports)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Lỗi khi lấy báo cáo của giảng viên"
        })
    }
}
// Xem tất cả báo cáo
async function getAllReports(req, res) {
    try {
        const reports = await reportModel.getAllReports()
        res.json(reports)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
// Nộp báo cáo
async function createReport(req, res) {
    try {
        const { topic_id } = req.body
        // Kiểm tra topic_id
        if (!topic_id) {
            return res.status(400).json({
                message: "Vui lòng chọn đề tài"
            })
        }
        // Kiểm tra file
        if (!req.file) {
            return res.status(400).json({
                message: "Vui lòng chọn file PDF"
            })
        }
        // Kiểm tra đề tài có tồn tại không
        const topic = await reportModel.findReportsByTopic(topic_id)
        if (!topic) {
            return res.status(404).json({
                message: "Đề tài không tồn tại"
            })
        }
        // Thông tin file
        const file_name = req.file.filename
        const file_url = "/uploads/" + req.file.filename
        const file_size = (req.file.size / 1024 / 1024).toFixed(2) + " MB"
        const result = await reportModel.createReport(
            topic_id,
            file_name,
            file_url,
            file_size
        )
        res.status(201).json({
            message: "Nộp báo cáo thành công",
            report_id: result.insertId,
            report: {
                topic_id,
                file_name,
                file_url,
                file_size,
                status: "submitted"
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Lỗi khi nộp báo cáo"
        })
    }
}
// Cập nhật trạng thái
async function updateStatus(req, res) {
    const { id } = req.params
    const { status } = req.body
    try {
        if (!status) {
            return res.status(400).json({
                message: "Vui lòng nhập trạng thái"
            })
        }
        if (!["submitted", "reviewed", "needs_revision"].includes(status)) {
            return res.status(400).json({
                message: "Trạng thái không hợp lệ"
            })
        }
        const report = await reportModel.findReportById(id)
        if (!report) {
            return res.status(404).json({
                message: "Không tìm thấy báo cáo"
            })
        }
        await reportModel.updateReportStatus(id, status)
        res.json({
            message: "Cập nhật trạng thái thành công"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Lỗi khi cập nhật trạng thái"
        })
    }
}
// Xóa báo cáo
async function deleteReport(req, res) {
    const { id } = req.params
    try {
        const report = await reportModel.findReportById(id)
        if (!report) {
            return res.status(404).json({
                message: "Không tìm thấy báo cáo"
            })
        }
        await reportModel.deleteReport(id)
        res.json({
            message: "Xóa báo cáo thành công"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Lỗi khi xóa báo cáo"
        })
    }
}

module.exports = {
    getReports,
    getReportById,
    getReportsByLecturer,
    getAllReports,
    createReport,
    updateStatus,
    deleteReport
}