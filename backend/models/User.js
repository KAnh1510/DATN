const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			require: true,
			min: 6,
			max: 20,
		},
		email: {
			type: String,
			require: true,
			max: 50,
			unique: true,
		},
		password: {
			type: String,
			require: true,
			min: 6,
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
		address: {
			type: String,
		},
		phoneNumber: {
			type: String,
		},
		avatar: {
			type: String,
		},
		name: { type: String },
		deleted: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
