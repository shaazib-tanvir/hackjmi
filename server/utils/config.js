const fs = require('node:fs');

module.exports = function getServerConfig() {
	try {
		const contents = fs.readFileSync(__dirname + "/../config/server.json", "utf8");
		return JSON.parse(contents);
	} catch (err) {
		console.log(err);
		return null;
	}
}
