const router = require("express").Router();
const { index, addCourseTeacher } = require("../../app/controllers/teacher/DepartmentHeadController");

router.get("/add-course-teacher", index);
router.post("/add-course-teacher", addCourseTeacher)

module.exports = router