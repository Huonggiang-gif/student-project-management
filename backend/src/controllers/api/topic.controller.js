const Topic = require("../../models/topic.model");

// Lấy danh sách đề tài theo quyền
exports.getTopics = async (req, res) => {
    try {
        let data;
        if (req.user.role === "admin") {
            data = await Topic.getAll();
        }
        else if (req.user.role === "lecturer") {
            data = await Topic.getByLecturerId(req.user.id);
        }
        else if (req.user.role === "student") {
            data = await Topic.getByStudentId(req.user.id);
        }
        console.log(data);
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Lỗi server"
        });
    }
};

// Lấy chi tiết
exports.getTopicById = async (req, res) => {
    try {
        const topic = await Topic.getById(req.params.id);
        if (!topic) {
            return res.status(404).json({
                message: "Không tìm thấy đề tài"
            });
        }
        if (
            req.user.role === "lecturer" &&
            Number(topic.lecturer_id) !== Number(req.user.id)
        ) {
            return res.status(403).json({
                message: "Bạn không có quyền xem đề tài này."
            });
        }
        if (
            req.user.role === "student" &&
            Number(topic.student_id) !== Number(req.user.id)
        ) {
            return res.status(403).json({
                message: "Bạn không có quyền xem đề tài này."
            });
        }
        res.json(topic);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Lỗi server"
        });
    }
};

// Tạo đề tài
exports.createTopic = async (req, res) => {
    try {
        const {
            title,
            description
        } = req.body;
        const result = await Topic.createTopic([
            title,
            description,
            "pending"
        ]);
        res.status(201).json({
            message: "Tạo đề tài thành công",
            id: result.insertId
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Lỗi server"
        });
    }
};

// Cập nhật đề tài
exports.updateTopic = async (req, res) => {
    try {
        const topic = await Topic.getById(req.params.id);
        if (req.user.role === "lecturer") {
            if (Number(topic.lecturer_id) !== Number(req.user.id)) {
                return res.status(403).json({
                    message: "Bạn không có quyền sửa đề tài này."
                });
            }
        }
        if (!topic) {
            return res.status(404).json({
                message: "Không tìm thấy đề tài"
            });
        }

        // =============================
        // Quyền của sinh viên
        // =============================
        if (req.user.role === "student") {
            // Chỉ được sửa đề tài của mình
            if (topic.student_id !== req.user.id) {
                return res.status(403).json({
                    message: "Bạn không có quyền sửa đề tài này"
                });
            }
            // Chỉ được sửa khi chưa được duyệt
            if (
                topic.status !== "pending" &&
                topic.status !== "rejected"
            ) {
                return res.status(403).json({
                    message: "Đề tài đã được duyệt hoặc đang thực hiện nên không thể chỉnh sửa."
                });
            }
            // Sinh viên KHÔNG được đổi trạng thái
            const data = [
                req.body.title,
                req.body.description,
                req.body.lecturer_id,
                topic.status
            ];
            await Topic.update(req.params.id, data);
            return res.json({
                message: "Cập nhật thành công"
            });
        }
        // Giảng viên/Admin chỉ được sửa nội dung khi đề tài chưa thực hiện
        if (
            (req.user.role === "lecturer" || req.user.role === "admin") &&
            ["approved", "in_progress", "completed"].includes(topic.status)
        ) {
            if (!req.body.status) {
                return res.status(400).json({
                    message: "Thiếu trạng thái."
                });
            }
            await Topic.updateStatus(req.params.id, req.body.status);
            return res.json({
                message: "Cập nhật trạng thái thành công"
            });
        }

        // =============================
        // Quyền của giảng viên/Admin
        // =============================

        // Nếu admin chỉnh sửa đề tài đã được duyệt
        // thì đưa về chờ duyệt lại
        let status = req.body.status;
        if (
            req.user.role === "admin" &&
            req.body.status === "waiting_approval"
        ) {
            status = "waiting_approval";
        }
        const data = [
            req.body.title,
            req.body.description,
            req.body.lecturer_id,
            req.body.status
        ];
        await Topic.update(req.params.id, data);
        res.json({
            message: "Cập nhật thành công"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Lỗi server"
        });
    }
};

// Xóa
exports.deleteTopic = async (req, res) => {
    try {
        await Topic.delete(req.params.id);
        res.json({
            message: "Delete success"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Lỗi server"
        });
    }
};

// Duyệt
exports.approveTopic = async (req, res) => {
    try {
        const topic = await Topic.getById(req.params.id);
        if (!topic) {
            return res.status(404).json({
                message: "Không tìm thấy đề tài"
            });
        }
        // Giảng viên chỉ được duyệt đề tài của mình
        if (
            req.user.role === "lecturer" &&
            Number(topic.lecturer_id) !== Number(req.user.id)
        ) {
            return res.status(403).json({
                message: "Bạn không có quyền duyệt đề tài này."
            });
        }
        if (topic.status !== "waiting_approval") {
            return res.status(400).json({
                message: "Đề tài đã được xử lý."
            });
        }
        await Topic.updateStatus(
            req.params.id,
            "approved"
        );
        res.json({
            message: "Duyệt thành công"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Lỗi server"
        });
    }
};

// Từ chối
exports.rejectTopic = async (req, res) => {
    try {
        const topic = await Topic.getById(req.params.id);
        if (!topic) {
            return res.status(404).json({
                message: "Không tìm thấy đề tài"
            });
        }
        if (
            req.user.role === "lecturer" &&
            Number(topic.lecturer_id) !== Number(req.user.id)
        ) {
            return res.status(403).json({
                message: "Bạn không có quyền từ chối đề tài này."
            });
        }
        if (topic.status !== "waiting_approval") {
            return res.status(400).json({
                message: "Đề tài đã được xử lý."
            });
        }
        await Topic.updateStatus(
            req.params.id,
            "rejected"
        );
        res.json({
            message: "Đã từ chối đề tài"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Lỗi server"
        });
    }
};

exports.getStudentsOfLecturer = async (req, res) => {
    try {
        if (req.user.role !== "lecturer") {
            return res.status(403).json({
                message: "Không có quyền"
            });
        }
        const data = await Topic.getStudentsOfLecturer(req.user.id);
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Lỗi server"
        });
    }
}

exports.getAvailableTopics = async (req, res) => {
    try {
        const data = await Topic.getAvailableTopics();
        console.log("Available Topics:", data);
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Lỗi server"
        });
    }
};

exports.registerTopic = async (req, res) => {
    try {
        const studentId = req.user.id;
        const {
            topic_id,
            lecturer_id
        } = req.body;
        const existed = await Topic.checkStudentHasTopic(studentId);
        if (existed) {
            return res.status(400).json({
                message: "Bạn đã có đề tài"
            });
        }
        await Topic.registerTopic(
            topic_id,
            studentId,
            lecturer_id
        );
        res.json({
            message: "Đăng ký thành công"
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Lỗi server"
        });
    }
};

exports.reviewTopic = async (req, res) => {
    try {
        const topic = await Topic.getById(req.params.id);
        if (!topic) {
            return res.status(404).json({
                message: "Không tìm thấy đề tài"
            });
        }
        // Chỉ giảng viên hướng dẫn được đánh giá
        if (
            req.user.role === "lecturer" &&
            Number(topic.lecturer_id) !== Number(req.user.id)
        ) {
            return res.status(403).json({
                message: "Bạn không có quyền đánh giá đề tài này."
            });
        }
        const {
            score,
            review
        } = req.body;
        await Topic.reviewTopic(
            req.params.id,
            score,
            review
        );
        res.json({
            message: "Đánh giá thành công"
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Lỗi server"
        });
    }
};