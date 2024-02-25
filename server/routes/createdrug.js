const express = require("express");
const { Drug } = require("../models/");

const router = express.Router();

router.post("/", async (request, response) => {
	const username = request.body.username;
	if (username !== request.session.username) {
		response.status(401);
		response.send();
		return;
	}

	const drug = request.body;
	await Drug.create(drug);
	response.send(drug);
});

module.exports = router;
