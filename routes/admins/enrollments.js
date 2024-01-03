const router = require("express").Router();
const { index, create, store } = require("../../app/controllers/admin/EnrollmentController");

router.get("/", index);
router.get("/add/student/:studentId", create);
router.post("/add/student/:studentId", store);

module.exports = router;