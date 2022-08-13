const express = require("express");
const router = express.Router();
const controller = require("../controllers/sendController");

router.post("/", controller.sendMessage);

module.exports = router;
