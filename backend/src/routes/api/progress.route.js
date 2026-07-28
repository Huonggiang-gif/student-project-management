const express = require("express");
const router = express.Router();

const progressController = require("../../controllers/api/progress.controller");
const { authMiddleware } = require("../../middleware/auth.middleware");
const roleMiddleware = require("../../middleware/role.middleware");

// Lấy tất cả tiến độ
router.get(
    "/",
    authMiddleware,
    roleMiddleware.authorize("admin", "lecturer", "student"),
    progressController.getAllProgress
);

// Lấy chi tiết tiến độ
router.get(
    "/detail/:id",
    authMiddleware,
    roleMiddleware.authorize("admin", "lecturer", "student"),
    progressController.getProgressById
);

// Lấy danh sách tiến độ theo đề tài
router.get(
    "/:topicId",
    authMiddleware,
    roleMiddleware.authorize("admin", "lecturer", "student"),
    progressController.getProgress
);

// Sinh viên thêm tiến độ
router.post(
    "/",
    authMiddleware,
    roleMiddleware.authorize("student"),
    progressController.createProgress
);

// Giảng viên nhận xét
router.put(
    "/:id/comment",
    authMiddleware,
    roleMiddleware.authorize("lecturer"),
    progressController.updateComment
);

// Admin xóa tiến độ
router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware.authorize("admin"),
    progressController.deleteProgress
);

module.exports = router;