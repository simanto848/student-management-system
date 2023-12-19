const router = require("express").Router();
const { index, create, store, getDepartmentCourses } = require("../../app/controllers/admin/SessionCourseController");

router.get("/", index);
router.get("/add", create);
router.post("/add", store);
router.get("/:sessionId/departments/:departmentId/courses", getDepartmentCourses);

module.exports = router;