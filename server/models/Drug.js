module.exports = (sequelize, DataTypes) => sequelize.define("Drug", {
	username: {
		type: DataTypes.STRING,
		allowNull: false
	},
	drug_name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	drug_id: {
		type: DataTypes.STRING,
		allowNull: true
	},
	start_date: {
		type: DataTypes.DATEONLY,
		allowNull: false
	},
	duration_month: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	duration_week: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	duration_day: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	dose_times: {
		type: DataTypes.STRING,
		allowNull: false
	}
});
