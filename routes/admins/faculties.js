const router = require("express").Router();
const { index, create, store, edit, update, destroy, getDepartments } = require("../../app/controllers/admin/FacultyController");

router.get("/", index);
router.get("/add", create);
router.post("/add", store);
router.get("/edit/:id", edit);
router.post("/edit/:id", update);
router.get("/delete/:id", destroy);
router.get("/:id/departments", getDepartments);

module.exports = router;