const router = require("express").Router();
const { index, create, store, edit, update, destroy, getStudentInfo } = require("../../app/controllers/admin/StudentController");

router.get("/", index);
router.get("/add", create);
router.post("/add", store)
router.get("/edit/:id", edit);
router.post("/edit/:id", update);
router.get("/delete/:id", destroy)
router.get("/:regNo/fees", getStudentInfo);

module.exports = router;