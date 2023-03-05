const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			min: 6,
			max: 20,
		},
		email: {
			type: String,
			require: true,
			max: 50,
		},
		phoneNumber: {
			type: String,
			require: true,
		},
		content: {
			type: String,
		},
		status: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Feedback", feedbackSchema);
