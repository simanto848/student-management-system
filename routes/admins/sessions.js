const router = require("express").Router();
const { index, create, store, edit, update, destroy, getCourses } = require("../../app/controllers/admin/SessionController");
const { getDepartmentCourses } = require("../../app/controllers/teacher/DepartmentHeadController")

router.get("/", index);
router.get("/add", create);
router.post("/add", store);
router.get("/edit/:id", edit);
router.post("/edit/:id", update);
router.get("/delete/:id", destroy);
router.get("/:id/courses", getCourses);
router.get("/:sessionId/course/teacher", getDepartmentCourses);

module.exports = router;