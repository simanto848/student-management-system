const db = require("../../config/dbConfig")
const bcrypt = require("bcrypt");
const CrudService = require("./CrudService");
const AuthService = require("./AuthService");
const MailSender = require("../helpers/SendMail");
const { success, error } = require("./ResponseService");
const { generateRandomString } = require("../helpers/StringGenerator");
const tableName = "students"


const login = async (payload) => {
    return await AuthService.login(tableName, payload);
}

const getByKeyword = async (keyword, value) => {
    return await CrudService.getByKeyword(tableName, keyword, value);
}

const store = async (payload) => {
    let password = generateRandomString(8)
    const hashedPassword = await bcrypt.hash(password, 10);
    payload.password = hashedPassword;
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO ${tableName} set ?`, payload, (err, result) => {
            if (err) {
                console.log(err);
                reject(error(err));
            }
            MailSender.mail(payload.email, password);
            resolve(success("Successfully stored"));
        });
    });
}

const update = async (id, payload) => {
    return await CrudService.update(tableName, id, payload);
}

const destroy = async (id) => {
    return await CrudService.destroy(tableName, id);
}

module.exports = {
    login,
    getByKeyword,
    store,
    update,
    destroy
}