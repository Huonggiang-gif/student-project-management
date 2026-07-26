const express = require("express")
const router = express.Router()

const evaluationController = require("../../controllers/api/evaluation.controller")

// Lấy chi tiết đánh giá
router.get("/detail/:id", evaluationController.getEvaluationById)

// Lấy danh sách đánh giá theo đề tài
router.get("/:topicId", evaluationController.getEvaluations)

// Thêm đánh giá
router.post("/", evaluationController.createEvaluation)

// Cập nhật đánh giá
router.put("/:id", evaluationController.updateEvaluation)

// Xóa đánh giá
router.delete("/:id", evaluationController.deleteEvaluation)

module.exports = router