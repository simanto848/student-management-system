const router = require("express").Router();
const admin = require("./admins/index");

router.use("/admin", admin);

module.exports = router;