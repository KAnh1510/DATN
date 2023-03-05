const mongoose = require("mongoose");

const magazineSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			require: true,
			unique: true,
		},
		writer: {
			type: String,
			require: true,
		},
		gallery: [{ atl: String, src: String }],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Magazine", magazineSchema);
