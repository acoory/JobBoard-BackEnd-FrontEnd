const express = require("express");
const router = express.Router();
const favorisCtrl = require("../controllers/favoris_controller");

router.delete("/:id", favorisCtrl.Delete);

module.exports = router;
