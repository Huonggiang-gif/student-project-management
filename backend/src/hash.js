const bcrypt = require("bcrypt");
const db = require("./config/db");


async function hashPassword(){

    const password = "123456";

    const hash = await bcrypt.hash(password,10);


    await db.query(
        "UPDATE users SET password_hash=? WHERE user_code=?",
        [
            hash,
      'ADMIN'

        ]
    );


    console.log("Đã cập nhật mật khẩu");

}


hashPassword();