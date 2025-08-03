// const express = require("express");
// const router = express.Router();
// const { editItem, createItem, deleteItems } = require("../controllers/menu");

// router.route("/").post(createItem);
// router.route("/:id").patch(editItem).delete(deleteItems);

// module.exports = router;

const express = require("express");
const router = express.Router();
const { editItem, createItem, deleteItems } = require("../controllers/menu");
const upload = require("../middleware/upload");

router.route("/").post(upload.single("image"), createItem);
router
  .route("/:id")
  .patch(upload.single("image"), editItem)
  .delete(deleteItems);

module.exports = router;
