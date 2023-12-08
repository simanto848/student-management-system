const router = require("express").Router();
const { index, login, dashboard } = require("../../app/controllers/admin/AdminController");
const Faculties = require("./faculties");
const Departments = require("./departments");
const Teachers = require("./teachers");
const Sessions = require("./sessions");
const Courses = require("./courses");

router.get("/", index);
router.post("/", login);
router.get("/dashboard", dashboard);
router.use("/faculties", Faculties);
router.use("/departments", Departments);
router.use("/teachers", Teachers);
router.use("/sessions", Sessions);
router.use("/courses", Courses);

module.exports = router;