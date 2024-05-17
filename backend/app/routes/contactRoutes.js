const express = require("express");
const {optionalAuthMiddleware} = require("../middlewares/authMiddleware");
const {sendMessage} = require("../controllers/contactController");
const router = express.Router();


// send Message
router.post("/contact",optionalAuthMiddleware,sendMessage)

module.exports = router;
