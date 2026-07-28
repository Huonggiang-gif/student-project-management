const express = require("express")
const router = express.Router()

const reportController = require("../../controllers/api/report.controller")
const upload = require("../../middleware/upload.middleware")

const {authMiddleware} = require("../../middleware/auth.middleware")
const roleMiddleware = require("../../middleware/role.middleware")
// Giảng viên xem báo cáo sinh viên hướng dẫn
router.get(
    "/lecturer",
    authMiddleware,
    roleMiddleware.authorize("lecturer"),
    reportController.getReportsByLecturer
)
// Lấy chi tiết một báo cáo
router.get("/detail/:id", 
    authMiddleware,
    roleMiddleware.authorize("student","lecturer", "admin"),
    reportController.getReportById)

// Lấy danh sách báo cáo theo đề tài
router.get("/topic/:topic_id",
    authMiddleware,
    roleMiddleware.authorize("student", "lecturer", "admin"), 
    reportController.getReports
)

//Xem tất cả báo cáo
router.get(
    "/admin",
    authMiddleware,
    roleMiddleware.authorize("admin"),
    reportController.getAllReports
);

// Nộp báo cáo
router.post("/",
    authMiddleware,
    roleMiddleware.authorize("student"),
    upload.single("report_file"),   // report_file là tên field sau này frontend gửi lên
    reportController.createReport)

// Cập nhật trạng thái báo cáo
router.put("/:id/status", 
    authMiddleware,
    roleMiddleware.authorize("lecturer"),
    reportController.updateStatus)

// Xóa báo cáo
router.delete("/:id", 
    authMiddleware,
    roleMiddleware.authorize("student"),
    reportController.deleteReport)

module.exports = router