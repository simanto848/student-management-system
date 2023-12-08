const router = require("express").Router();
const { index, create, store, edit, update, destroy } = require("../../app/controllers/admin/SessionController");

router.get("/", index);
router.get("/add", create);
router.post("/add", store);
router.get("/edit/:id", edit);
router.post("/edit/:id", update);
router.get("/delete/:id", destroy);

module.exports = router;