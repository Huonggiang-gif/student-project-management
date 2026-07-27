const express = require("express")
const router = express.Router()

const reportController = require("../../controllers/api/report.controller")
const upload = require("../../middleware/upload.middleware")

// Lấy chi tiết một báo cáo
router.get("/detail/:id", reportController.getReportById)

// Lấy danh sách báo cáo theo đề tài
router.get("/:projectId", reportController.getReports)

// Nộp báo cáo
router.post("/",
    upload.single("report_file"),   // report_file là tên field sau này frontend gửi lên
    reportController.createReport)

// Cập nhật trạng thái báo cáo
router.put("/:id/status", reportController.updateStatus)

// Xóa báo cáo
router.delete("/:id", reportController.deleteReport)

module.exports = router