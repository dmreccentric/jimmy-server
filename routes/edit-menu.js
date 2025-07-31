const express = require("express");
const router = express.Router();
const { editItem, createItem, deleteItems } = require("../controllers/menu");

router.route("/").post(createItem);
router.route("/:id").patch(editItem).delete(deleteItems);

module.exports = router;
