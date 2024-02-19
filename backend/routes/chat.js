const express = require("express");
const { getUsers } = require("../controllers/chatController");
const router = express.Router();

router.route("/getusers").get(getUsers);

module.exports = router;
