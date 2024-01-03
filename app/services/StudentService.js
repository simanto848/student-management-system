const db = require("../../config/dbConfig")
const bcrypt = require("bcrypt");
const CrudService = require("./CrudService");
const AuthService = require("./AuthService");
const MailSender = require("../helpers/SendMail");
const { success, error } = require("./ResponseService");
const { generateRandomString } = require("../helpers/StringGenerator");
const { promises } = require("nodemailer/lib/xoauth2");
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

const getStudentInfo = async (registration_no) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT students.id, students.roll_no, students.name, students.registration_no, students.phone_no, students.course_fee, student_enrollments.pay_amount, student_enrollments.due_amount, student_enrollments.waiver, student_enrollments.transaction_number FROM student_enrollments INNER JOIN students ON student_enrollments.id = students.id WHERE students.registration_no = ?`, registration_no, (err, result) => {
            if (err) {
                reject(error(err));
            } else {
                resolve(success("Successfully retrieve data", result));
            }
        })
    })
}

module.exports = {
    login,
    getByKeyword,
    store,
    update,
    destroy,
    getStudentInfo
}