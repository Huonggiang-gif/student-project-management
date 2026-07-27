const express = require("express")
const router = express.Router()

const progressController = require("../../controllers/api/progress.controller")

// Lấy chi tiết tiến độ
router.get("/detail/:id", progressController.getProgressById)

// Lấy danh sách tiến độ theo đề tài
router.get("/:topicId", progressController.getProgress)

// Thêm tiến độ mới
router.post("/", progressController.createProgress)

// Giảng viên nhận xét
router.put("/:id/comment", progressController.updateComment)

// Xóa tiến độ
router.delete("/:id", progressController.deleteProgress)

module.exports = router