const express = require("express");
const router = express.Router();

router.get("/", function (req, res, next) {
	res.render("user/account");
});

router.get("/userInfo", function (req, res, next) {
	res.render("user/userInfo");
});

module.exports = router;
