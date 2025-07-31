const express = require("express");
const router = express.Router();
const { getAllItems } = require("../controllers/menu");

router.route("/").get(getAllItems);

module.exports = router;
