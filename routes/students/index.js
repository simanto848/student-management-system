const router = require("express").Router();
const { index } = require("../../app/controllers/student/AuthController");
const { StudentLogin } = require("../../app/controllers/AuthController")

router.get("/", index);
router.post("/", StudentLogin);
// router.get("/dashnboard", )

module.exports = router;