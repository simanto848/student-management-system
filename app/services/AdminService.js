const db = require("../../config/dbConfig");
const bcrypt = require("bcrypt");
const  { success, error } = require("../services/ResponseService")

const login = (payload) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM admins WHERE email = ?`, payload.email, async (err, result) => {
            if (err) {
                reject(error("An error occurred!"));
            } else {
                if (result.length === 0) {
                    reject(error('Email not found'));
                } else {
                    const isMatch = await bcrypt.compare(payload.password, result[0].password);
                    if (isMatch) {
                        resolve(success('Login Successful', result[0]));
                    } else {
                        reject(error('Wrong password!'));
                    }
                }
            }
        });
    });
}

module.exports = { login }