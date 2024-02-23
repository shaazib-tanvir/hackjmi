module.exports = (sequelize, DataTypes) => sequelize.define("User", {
	username: {
		type: DataTypes.STRING,
		allowNull: false
	},
	password_hash: {
		type: DataTypes.STRING,
		allowNull: false
	},
});
