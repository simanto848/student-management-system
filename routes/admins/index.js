const router = require("express").Router();
const { index, login, dashboard } = require("../../app/controllers/AdminController");
const Faculties = require("./faculties");
const Departments = require("./departments");
const Teachers = require("./teachers");

router.get("/", index);
router.post("/", login);
router.get("/dashboard", dashboard);
router.use("/faculties", Faculties);
router.use("/departments", Departments);
router.use("/teachers", Teachers);


module.exports = router;