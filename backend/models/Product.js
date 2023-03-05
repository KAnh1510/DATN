const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			require: true,
			unique: true,
		},
		subtle: {
			type: String,
		},
		quality: {
			type: Number,
			require: true,
		},
		categories: {
			type: String,
		},
		color: [
			{
				idColor: String,
				nameColor: String,
			},
		],
		size: [{ name: String }],
		gallery: [{ src: Object }],
		prices: {
			type: Number,
			require: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
