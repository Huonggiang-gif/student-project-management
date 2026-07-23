const db = require("../config/db")

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

async function createUser(user_code, password_hash, full_name, email,role) {
    const [result] = await db.query(
        `INSERT INTO users
        (user_code, password_hash, full_name, email, role)
        VALUES(?, ?, ?, ?, ?)`,
        [user_code, password_hash, full_name, email, role]
    )
    return result
}
module.exports = {
    findUserByUsercode,findUserByEmail, createUser
}