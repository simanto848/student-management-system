const router = require("express").Router();
const { index, create } = require("../../app/controllers/TeacherController");

router.get("/", index);
router.get("/add", create);

module.exports = router