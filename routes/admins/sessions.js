const router = require("express").Router();
const { index, create, store, edit, update, destroy, getCourses } = require("../../app/controllers/admin/SessionController");

router.get("/", index);
router.get("/add", create);
router.post("/add", store);
router.get("/edit/:id", edit);
router.post("/edit/:id", update);
router.get("/delete/:id", destroy);
router.get("/:id/courses", getCourses);

module.exports = router;