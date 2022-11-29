const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user.controller");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer");

router.post("/", multer, userCtrl.CreateUser);
router.get("/", userCtrl.ReadAllUser);
router.put("/:id", auth, multer, userCtrl.UpdateUser);
router.delete("/:id", userCtrl.DeleteUser);
router.get("/:id", userCtrl.ReadOneUser);
router.put("/password/:id", userCtrl.UpdatePassword);

module.exports = router;
