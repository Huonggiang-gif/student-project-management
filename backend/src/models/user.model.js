const db = require("../config/db")
const bcrypt = require("bcrypt")

async function findUserByUsercode(user_code) {
    const [users] = await db.query(
        "SELECT * FROM users WHERE user_code = ?",
        [user_code]
    )

    return users[0] || null
}

async function findUserByEmail(email) {
    const [users] = await db.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
    )

    return users[0] || null
}
//Thêm
async function createUser(user_code, password_hash, full_name, email, phone, role) {
    const [result] = await db.query(
        `INSERT INTO users
        (user_code, password_hash, full_name, email, phone, role)
        VALUES(?, ?, ?, ?, ?, ?)`,
        [user_code, password_hash, full_name, email, phone, role]
    )
    return result.insertId
}
//Lấy danh sách người dùng
async function getAllUsers() {
    const [users] = await db.query(`
        SELECT id, user_code, full_name, email, role, phone, status, created_at
        FROM users
    `);

    return users;
}
// Lấy danh sách người dùng theo id
async function getUserById(id) {
    const [users] = await db.query(
        `
        SELECT id, user_code, full_name, email, role, avatar, phone, status, created_at
        FROM users
        WHERE id = ?
        `,
        [id]
    );

    return users[0] || null;
}
// Cập nhật thông tin
async function updateUser(id, full_name, email, phone, avatar) {
    const [result] = await db.query(
        `UPDATE users
         SET full_name = ?, email = ?, phone = ?, avatar = ?
         WHERE id = ?`,
        [full_name, email, phone, avatar, id]
    );

    return result;
}
// Lấy user để đổi mật khẩu
async function getUserByIdWithPassword(id) {
    const [users] = await db.query(
        `
        SELECT id, password_hash
        FROM users
        WHERE id = ?
        `,
        [id]
    );

    return users[0] || null;
}
// Đổi mật khẩu
async function updatePassword(id, password_hash) {
    const [result] = await db.query(
        `
        UPDATE users
        SET password_hash = ?
        WHERE id = ?
        `,
        [password_hash, id]
    );

    return result;
}
// Tìm kiếm người dùng
async function searchUsers(keyword) {

    const [users] = await db.query(
        `
        SELECT id, user_code, full_name, email, role, phone, status, created_at
        FROM users
        WHERE user_code LIKE ?
           OR full_name LIKE ?
           OR email LIKE ?
        `,
        [
            `%${keyword}%`,
            `%${keyword}%`,
            `%${keyword}%`
        ]
    );

    return users;
}
// Lấy danh sách sinh viên
async function getStudents() {
    const [users] = await db.query(
        `
        SELECT id, user_code, full_name, email, phone, status, created_at
        FROM users
        WHERE role = 'student'
        `
    );

    return users;
}

// Lấy danh sách giảng viên
async function getLecturers() {
    const [users] = await db.query(
        `
        SELECT id, user_code, full_name, email, phone, status, created_at
        FROM users
        WHERE role = 'lecturer'
        `
    );

    return users;
}

// Khóa / Mở tài khoản
async function updateUserStatus(id, status) {

    const [result] = await db.query(
        `
        UPDATE users
        SET status = ?
        WHERE id = ?
        `,
        [status, id]
    );

    return result;
}
module.exports = {
    //Auth
    findUserByUsercode,
    findUserByEmail, 
    createUser,
    //User
    getAllUsers,
    getUserById,
    updateUser,
    getUserByIdWithPassword,
    updatePassword,
    searchUsers,
    getStudents,
    getLecturers,
    updateUserStatus
}