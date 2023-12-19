const router = require("express").Router();
const admin = require("./admins/index");
const student = require("./students/index");
const teacher = require("./teachers/index");

router.use("/", student);
router.use("/admin", admin);
router.use("/teacher", teacher);

module.exports = router;