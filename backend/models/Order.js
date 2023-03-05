const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			require: true,
		},
		name: { type: String },
		products: [
			{
				productId: {
					type: String,
				},
				name: String,
				prices: Number,
				imgFront: String,
				quantity: {
					type: Number,
					default: 1,
				},
				color: {
					type: String,
				},
				size: {
					type: String,
				},
			},
		],
		note: { type: String },
		amount: { type: Number, require: true },
		address: { type: Object },
		phoneNumber: { type: String, require: true },
		status: { type: Number, default: 1 },
		paymentOption: { type: Number, default: 1 },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
