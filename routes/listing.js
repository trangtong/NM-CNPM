const express = require("express");
const router = express.Router();

router.get("/grid", function (req, res, next) {
	res.render("listing/grid");
});

router.get("/row", (req, res, next) => {
	res.render("listing/row");
});

router.get("/conference-detail", function (req, res, next) {
	res.render("listing/conference-detail");
});

module.exports = router;
