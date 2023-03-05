const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			require: true,
		},
		note: {
			type: String,
			default: "",
		},
		products: [
			{
				productId: String,
				name: String,
				prices: Number,
				imgFront: String,
				color: String,
				size: String,
				quantity: Number,
			},
		],
	},
	{ timestamps: true }
);
module.exports = mongoose.model("Cart", cartSchema);
