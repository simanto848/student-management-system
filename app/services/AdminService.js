const AuthService = require("./AuthService");
const tableName = "admins";

const login = async (payload) => {
    return await AuthService.login(tableName, payload);
}

module.exports = { login }