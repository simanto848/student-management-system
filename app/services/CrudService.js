const db = require("../../config/dbConfig");
const { success, error } = require("./ResponseService");

const simpleGetAll = (tableName) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM ${tableName}`, (err, result) => {
            if (err) {
                reject(error(err));
            } else {
                resolve(success("Successfully retrieve data", result));
            }
        });
    });
}

const getAllByJoin = (query) => {
    return new Promise((resolve, reject) => {
        db.query(`${query}`, (err, result) => {
            if (err) {
                reject(error(err));
            } else {
                resolve(success("Successfully retrieve data", result));
            }
        });
    });
}

const getByKeyword = (tableName, keyword, value) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM ${tableName} WHERE ${keyword} = ?`, value, (err, result) => {
            if (err) {
                reject(error(err));
            } else {
                resolve(success("Successfully retrieve data", result));
            }
        });
    });
}

const store = (tableName, payload) => {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO ${tableName} SET ?`, payload, (err, result) => {
            if (err) {
                reject(error(err));
            }
            resolve(success("Successfully stored", result));
        });
    });
}

const update = (tableName, id, payload) => {
    return new Promise((resolve, reject) => {
        db.query(`UPDATE ${tableName} SET ? WHERE id = ${id}`, payload, (err, result) => {
            if (err) {
                reject(error(err));
            }
            resolve(success("Successfully updated", result[0]));
        });
    });
}

const destroy = (tableName, id) => {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM ${tableName} WHERE id = ?`, id, (err, result) => {
            if (err) {
                reject(error(err));
            }
            resolve(success("Successfully deleted"));
        });
    });
}

module.exports = {
    simpleGetAll,
    getAllByJoin,
    getByKeyword,
    store,
    update,
    destroy,
}