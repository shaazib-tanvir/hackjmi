const express = require("express");

const router = express.Router();

router.get("/", (request, response) => {
	if (request.session.username === undefined) {
		response.send({ username: null });
	}

	response.send(request.session);
});

module.exports = router;
