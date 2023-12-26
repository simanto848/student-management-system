const db = require("../../config/dbConfig")
const bcrypt = require("bcrypt");
const MailSender = require("../helpers/SendMail");
const { success, error } = require("./ResponseService");
const { generateRandomString } = require("../helpers/StringGenerator");
const tableName = "students"

const store = async (payload) => {
    let password = generateRandomString(8)
    const hashedPassword = await bcrypt.hash(password, 10);
    payload.password = hashedPassword;
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO ${tableName} set ?`, payload, (err, result) => {
            if (err) {
                reject(error(err));
            }
            MailSender.mail(payload.email, password);
            resolve(success("Successfully stored"));
        });
    });
}

module.exports = {
    store
}