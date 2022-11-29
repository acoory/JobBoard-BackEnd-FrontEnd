const express = require("express");
const router = express.Router();
const companieCtrl = require("../controllers/companie_controller");
const multer = require("../middleware/multer");
const CompanieAuth = require("../middleware/CompanieAuth");

router.get("/", companieCtrl.Read);
router.get("/:id", companieCtrl.ReadOne);
router.post("/", multer, companieCtrl.Create);
router.put("/:id", multer, companieCtrl.Put);
router.put("/password/:id", companieCtrl.UpdatePassword);
router.delete("/:id", companieCtrl.Delete);

module.exports = router;
