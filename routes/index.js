const router = require("express").Router();
const admin = require("./admins/index");
const student = require("./students/index");


router.use("/admin", admin);
router.use("/", student);

module.exports = router;