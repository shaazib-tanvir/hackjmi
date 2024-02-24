const express = require("express");
const argon2 = require("argon2");
const { User } = require("../models");

const router = express.Router();

router.post("/", async (request, response) => {
	const username = request.body.username;
	const password = request.body.password;

	const user = await User.findOne({
		where: {
			username: username
		}
	});
	
	if (user === null) {
		response.status(401);
		response.send("Invalid username or password.");
		return;
	}

	if (!await argon2.verify(user.password_hash, password)) {
		response.status(401);
		response.send("Invalid username or password");
		return;
	}

	request.session.username = username;
	response.send(user);
});

module.exports = router;
