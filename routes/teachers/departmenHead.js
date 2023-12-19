const router = require("express").Router();
const { index, addSessionTeacher } = require("../../app/controllers/teacher/DepartmentHeadController");

router.get("/add-course-teacher", index);

module.exports = router