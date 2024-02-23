const express = require("express");
const getServerConfig = require("./utils/config");

const app = express();
const serverConfig = getServerConfig();

if (serverConfig === null) {
	console.log("Failed to load server config!");
	return;
}

app.listen(serverConfig.port, serverConfig.ip, () => {
	console.log(`Listening on ${serverConfig.ip}:${serverConfig.port}`);
});
