const express = require("express");
const router = express.Router();
const {
    login,
    signup,
    forgetPassword, resetPassword,
} = require("../controllers/authController");

// sign up user
router.post("/signup", signup);
// sign in user
router.post("/login", login);
// forget password
router.get("/forget-password/:email", forgetPassword);
// change password after forget password
router.post("/reset-password", resetPassword);

module.exports = router;
