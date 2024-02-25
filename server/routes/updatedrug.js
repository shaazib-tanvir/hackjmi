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
			username: username,
			drug_name: request.body.drug_name
		}
	});

	const drug = drugs[0];
	if (drug == undefined) {
		response.status(404);
		response.send();
		return;
	}

	drug.set(request.body);
	await drug.save();
	response.status(200);
	response.send(drug);
});

module.exports = router;
