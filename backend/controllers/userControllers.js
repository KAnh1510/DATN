const User = require("../models/User");

const userController = {
	//UPDATE
	updateUser: async (req, res) => {
		try {
			const updateUser = await User.findByIdAndUpdate(
				req.params.id,
				{
					$set: req.body,
				},
				{ new: true }
			);
			const { password, ...others } = updateUser._doc;
			res.status(200).json(others);
		} catch (error) {
			return res.status(500).json(err);
		}
	},

	//GET ALL USERS
	getAllUsers: async (req, res) => {
		const query = req.query.new;
		try {
			const users = query
				? await User.find().sort({ _id: -1 }).limit(5)
				: await User.find();
			res.status(200).json(users);
		} catch (err) {
			res.status(500).json(err);
		}
	},

	//DELETE
	deleteUser: async (req, res) => {
		try {
			await User.findByIdAndUpdate(
				req.params.id,
				{
					$set: { deleted: true },
				},
				{ new: true }
			);
			res.status(200).json("User has been deleted...");
		} catch (error) {
			res.status(500).json(error);
		}
	},

	//GET USER
	getUser: async (req, res) => {
		try {
			const user = await User.findById(req.params.id);
			const { password, ...others } = user._doc;
			res.status(200).json(others);
		} catch (err) {
			res.status(500).json(err);
		}
	},

	getTotalUsers: async (req, res) => {
		try {
			const users = await User.find();
			return res.status(200).json({ totalUser: users.length });
		} catch (error) {
			console.log(error);
			return res.status(500).json(error);
		}
	},

	getUserAdmin: async (req, res) => {
		try {
			const users = await User.find();
			const admin = [];

			users.forEach((item) => {
				if (item.isAdmin) {
					admin.push(item);
				}
			});

			return res.status(200).json(admin);
		} catch (error) {
			console.log(error);
			return res.status(500).json(error);
		}
	},

	getUserCustomer: async (req, res) => {
		try {
			const users = await User.find();
			const customers = [];

			users.forEach((item) => {
				if (!item.isAdmin) {
					customers.push(item);
				}
			});

			return res.status(200).json(customers);
		} catch (error) {
			console.log(error);
			return res.status(500).json(error);
		}
	},

	getUserDeleted: async (req, res) => {
		try {
			const users = await User.find();
			const user = [];

			users.forEach((item) => {
				if (item.deleted) {
					user.push(item);
				}
			});

			return res.status(200).json(user);
		} catch (error) {
			console.log(error);
			return res.status(500).json(error);
		}
	},
};

module.exports = userController;
