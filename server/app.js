const express = require("express");
const getServerConfig = require("./utils/config");
const database = require("./models/");
const registerRouter = require("./routes/register");
const bodyParser = require("body-parser");

const app = express();
const serverConfig = getServerConfig();

if (serverConfig === null) {
	console.log("Failed to load server config!");
	return;
}

app.use(bodyParser.json());
app.use("/api/register", registerRouter);

app.use("/assets/", express.static(__dirname + "/../client/dist/assets/"));
app.get("*", (_, response) => {
	response.sendFile("index.html", {root: __dirname + "/../client/dist/"});
});

database.sequelize.sync().then(() => {
	app.listen(serverConfig.port, serverConfig.ip, () => {
		console.log(`Listening on ${serverConfig.ip}:${serverConfig.port}`);
	});
});
