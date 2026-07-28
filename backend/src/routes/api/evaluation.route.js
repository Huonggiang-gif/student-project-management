const express = require("express")
const router = express.Router()

const evaluationController = require("../../controllers/api/evaluation.controller")
const {authMiddleware} = require("../../middleware/auth.middleware")
const roleMiddleware = require("../../middleware/role.middleware")

// Lấy chi tiết đánh giá
router.get("/detail/:id", 
    authMiddleware,
    roleMiddleware.authorize("admin", "student", "lecturer"),
    evaluationController.getEvaluationById)

// Lấy danh sách đánh giá theo đề tài
router.get("/topic/:topic_id", 
    authMiddleware,
    roleMiddleware.authorize("admin", "student", "lecturer"),
    evaluationController.getEvaluations)

// Thêm đánh giá
router.post("/", 
    authMiddleware,
    roleMiddleware.authorize( "lecturer"),
    evaluationController.createEvaluation)

// Cập nhật đánh giá
router.put("/:id",
    authMiddleware,
    roleMiddleware.authorize("lecturer"),
    evaluationController.updateEvaluation)

// Xóa đánh giá
router.delete("/:id", 
    authMiddleware,
    roleMiddleware.authorize("admin", "lecturer"),
    evaluationController.deleteEvaluation)

module.exports = router