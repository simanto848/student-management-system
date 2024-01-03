const router = require("express").Router();
const { index, dashboard } = require("../../app/controllers/admin/AdminController");
const { AdminLogin } = require("../../app/controllers/AuthController");
const Faculties = require("./faculties");
const Departments = require("./departments");
const Teachers = require("./teachers");
const Sessions = require("./sessions");
const Courses = require("./courses");
const SessionCourses = require("./sessionCourses");
const Students = require("./students");
const Enrollments = require("./enrollments");

router.get("/", index);
router.post("/", AdminLogin);
router.get("/dashboard", dashboard);
router.use("/faculties", Faculties);
router.use("/departments", Departments);
router.use("/teachers", Teachers);
router.use("/sessions", Sessions);
router.use("/courses", Courses);
router.use("/session-courses", SessionCourses);
router.use("/students", Students);
router.use("/fees", Enrollments);

module.exports = router;