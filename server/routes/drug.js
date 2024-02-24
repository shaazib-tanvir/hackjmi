const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/", async (request, response) => {
	const drug_name = request.body.name;
	const query = "https://api.fda.gov/drug/label.json?search=openfda.generic_name:" + drug_name.replace(" ", "*") + "*";

	try {
		const data = (await axios.get(query)).data;
		response.status(200);
		response.send(data);
	} catch (err) {
		response.status(404).send();
	}
});

module.exports = router;
