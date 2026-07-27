const express = require("express");
const router = express.Router();

const userController = require("../../controllers/api/user.controller");
const {authMiddleware} = require("../../middleware/auth.middleware");
const roleMiddleware = require("../../middleware/role.middleware")

router.get("/", authMiddleware,roleMiddleware.authorize("admin"), userController.getAllUsers);

router.get("/search", authMiddleware,roleMiddleware.authorize("admin"), userController.searchUsers)

router.get("/students", authMiddleware, roleMiddleware.authorize("admin") ,userController.getStudents)

router.get("/lecturers", authMiddleware,roleMiddleware.authorize("admin", "student"), userController.getLecturers)

router.put("/change-password", authMiddleware, userController.changePassword);

router.put("/:id", authMiddleware,roleMiddleware.authorize("admin"), userController.updateUser);

router.get("/:id", authMiddleware,roleMiddleware.authorize("admin"), userController.getUserById);

router.patch("/:id/status", authMiddleware,roleMiddleware.authorize("admin"), userController.updateUserStatus)

router.post("/", authMiddleware, roleMiddleware.authorize("admin"), userController.createUser);
module.exports = router;