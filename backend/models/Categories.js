const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			require: true,
			unique: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Categories", categoriesSchema);
