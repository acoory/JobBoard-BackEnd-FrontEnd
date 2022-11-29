const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/auth_controller");

router.post("/", authCtrl.Auth);

module.exports = router;
