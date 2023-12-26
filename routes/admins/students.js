const router = require("express").Router();
const { index, create, store } = require("../../app/controllers/admin/StudentController");

router.get("/", index);
router.get("/add", create);
router.post("/add", store)

module.exports = router;