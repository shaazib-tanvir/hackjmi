const express = require("express");
const argon2 = require("argon2");
const { User } = require("../models/");

const router = express.Router();

router.post("/", async (request, response) => {
	const username = request.body.username;
	const password = request.body.password;

	if (await User.findOne({
		where: {
			username: username
		}
		}) !== null) {
		response.status(401);
		response.send("Username already exists!");
		return;
	}

	const password_hash = await argon2.hash(password);
	const user = {
		username: username,
		password_hash: password_hash
	};

	await User.create(user);
	response.send(user);
});

module.exports = router;
