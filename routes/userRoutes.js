const router = require("express").Router();
const upload = require("../middleware/uploadMiddleware");
const ensureAuthenticated = require("../middleware/authMiddleware");
const userController = require("../controllers/userController");

router.get("/profile", ensureAuthenticated, userController.getProfile);

router.post(
  "/fileupload",
  ensureAuthenticated,
  upload.single("image"),
  userController.uploadProfile
);

module.exports = router;