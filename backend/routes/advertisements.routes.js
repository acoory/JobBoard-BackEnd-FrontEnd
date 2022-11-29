const express = require("express");
const router = express.Router();
const advertisementCtrl = require("../controllers/advertisement.controller");
const auth = require("../middleware/auth");

router.post("/", advertisementCtrl.Create);
router.delete("/:id", advertisementCtrl.Delete);
router.get("/:id", advertisementCtrl.ReadOne);
router.put("/:id", advertisementCtrl.Update);
router.get("/", advertisementCtrl.ReadAll);

module.exports = router;
