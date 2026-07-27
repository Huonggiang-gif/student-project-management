const express = require("express");
const router = express.Router();

const { authMiddleware }= require("../../middleware/auth.middleware");
const authController = require("../../controllers/api/auth.controller");

router.post("/login", authController.login);
router.post("/register", authController.register);

router.get("/test", authMiddleware, (req, res) => {
    res.json({
        message: "Token hợp lệ",
        user: req.user
    });
});

module.exports = router;