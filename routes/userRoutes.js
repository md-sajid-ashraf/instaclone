const router = require("express").Router();
const upload = require("../middleware/uploadMiddleware");
const ensureAuthenticated = require("../middleware/authMiddleware");
const userController = require("../controllers/userController");

router.get("/profile", ensureAuthenticated, userController.getProfile);
router.get("/account/edit", ensureAuthenticated, userController.getAccountEdit);

router.post(
  "/fileupload",
  ensureAuthenticated,
  upload.single("profileImage"),
  userController.uploadProfile
);

router.post("/update", upload.single("profileImage"), userController.updateProfile);

module.exports = router;