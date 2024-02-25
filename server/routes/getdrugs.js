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

	const drugs = await Drug.findAll({
		where: {
			username: username
		}
	});

	if (drugs.length === 0) {
		response.status(404);
		response.send();
		return;
	}

	response.send(drugs);
});

module.exports = router;
