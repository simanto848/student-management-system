const router = require("express").Router();
const { index , dashboard, getCourses } = require("../../app/controllers/teacher/TeacherController");
const { TeacherLogin } = require("../../app/controllers/AuthController");
const departmenHead = require("./departmenHead");

router.get("/", index);
router.post("/", TeacherLogin);
router.get("/dashboard", dashboard);
router.use("/department-head", departmenHead);
router.get("/courses", getCourses);

module.exports = router;