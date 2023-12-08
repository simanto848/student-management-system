const router = require("express").Router();
const { index } = require("../../app/controllers/student/AuthController");

router.get("/", index);

module.exports = router;