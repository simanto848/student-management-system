const db = require("../../config/dbConfig");
const {error, success} = require("./ResponseService");
const bcrypt = require("bcrypt");

const login = (tableName, payload) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM ${tableName} WHERE email = ?`, payload.email, async (err, result) => {
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
                        reject(error('Wrong email or password!'));
                    }
                }
            }
        });
    });
}

module.exports = { login }