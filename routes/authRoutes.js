const router = require("express").Router();
const authController = require("../controllers/authController");

// SIGNUP 
router.get("/signup", authController.getSignup);
router.post("/signup", authController.signupUser);

// LOGIN 
router.get("/", authController.getLogin);
router.post("/login", authController.loginUser);

// LOGOUT 
router.get("/logout", authController.logoutUser);

module.exports = router;