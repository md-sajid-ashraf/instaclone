const router = require("express").Router();
const upload = require("../middleware/uploadMiddleware");
const ensureAuthenticated = require("../middleware/authMiddleware");
const feedController = require("../controllers/feedController");

router.get("/feed", ensureAuthenticated, feedController.getFeed);

module.exports = router;