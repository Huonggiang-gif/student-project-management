const mysql = require("mysql2/promise")
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Hinhnhi129206",
    database:"StudentProjectDB"
})

module.exports = db;