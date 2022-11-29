const express = require("express");
const router = express.Router();
const jobApplicationCtrl = require("../controllers/jobapplication_controller");
const auth = require("../middleware/auth");


router.post("/", jobApplicationCtrl.Create);
router.get("/", jobApplicationCtrl.Read);
router.get("/:id", jobApplicationCtrl.ReadOne);
router.put("/:id", jobApplicationCtrl.Update);
router.delete("/:id", jobApplicationCtrl.Delete);

module.exports = router;
