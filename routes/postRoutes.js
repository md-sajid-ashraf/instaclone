const router = require("express").Router();
const upload = require("../middleware/uploadMiddleware");
const ensureAuthenticated = require("../middleware/authMiddleware");
const postController = require("../controllers/postController");

// router.get("/addpost", ensureAuthenticated, postController.getAddPost);
router.post(
  "/addpost",
  ensureAuthenticated,
  upload.single("postImage"),
  postController.createPost
);

module.exports = router;