const express = require("express");
const router = express.Router();

const topicController = require("../../controllers/api/topic.controller");
const { authMiddleware } = require("../../middleware/auth.middleware");
const roleMiddleware = require("../../middleware/role.middleware");

// Lấy danh sách đề tài
router.get(
    "/",
    authMiddleware,
    roleMiddleware.authorize(
        "admin",
        "lecturer",
        "student"
    ),
    topicController.getTopics
);

// Lấy chi tiết đề tài
router.get(
    "/:id",
    authMiddleware,
    roleMiddleware.authorize("admin", "lecturer", "student"),
    topicController.getTopicById
);

// Sinh viên đăng ký đề tài
router.post(
    "/",
    authMiddleware,
    roleMiddleware.authorize("student"),
    topicController.createTopic
);

// Cập nhật đề tài
router.put(
    "/:id",
    authMiddleware,
    roleMiddleware.authorize("admin", "student"),
    topicController.updateTopic
);

// Xóa đề tài
router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware.authorize("admin"),
    topicController.deleteTopic
);

// Duyệt đề tài
router.patch(
    "/:id/approve",
    authMiddleware,
    roleMiddleware.authorize("admin"),
    topicController.approveTopic
);

// Từ chối đề tài
router.patch(
    "/:id/reject",
    authMiddleware,
    roleMiddleware.authorize("admin"),
    topicController.rejectTopic
);

module.exports = router;