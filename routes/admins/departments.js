const router = require("express").Router();
const { index, create, store, edit, update, destroy, getDepartmentCourses } = require("../../app/controllers/admin/DepartmentController");

router.get("/", index);
router.get("/add", create);
router.post("/add", store);
router.get("/edit/:id", edit);
router.post("/edit/:id", update);
router.get("/delete/:id", destroy);
router.get("/:id/courses", getDepartmentCourses);

module.exports = router;