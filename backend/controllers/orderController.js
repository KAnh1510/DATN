const Order = require("../models/Order");

const orderController = {
	//CREATE
	createOrder: async (req, res) => {
		const newOrder = new Order(req.body);
		try {
			const savedOrder = await newOrder.save();
			res.status(200).json(savedOrder);
		} catch (err) {
			res.status(500).json(err);
		}
	},

	//UPDATE
	updatedOrder: async (req, res) => {
		try {
			const order = await Order.findById(req.params.id);
			await order.updateOne({
				$set: req.body,
			});
			res.status(200).json(order);
		} catch (error) {
			res.status(500).json(error);
		}
	},

	//GET ALL
	getAllOrders: async (req, res) => {
		try {
			const orders = await Order.find();
			res.status(200).json(orders);
		} catch (err) {
			res.status(500).json(err);
		}
	},

	//DELETE
	deleteOrder: async (req, res) => {
		try {
			await Order.findByIdAndDelete(req.params.id);
			res.status(200).json("Order has been deleted...");
		} catch (error) {
			res.status(500).json(error);
		}
	},

	//GET ORDER BY ID
	getOrderById: async (req, res) => {
		try {
			const orders = await Order.findById(req.params.id);
			res.status(200).json(orders);
		} catch (err) {
			console.log(err);
			res.status(500).json(err);
		}
	},

	//GET USER ORDERS
	getOrder: async (req, res) => {
		try {
			const orders = await Order.find({ userId: req.params.userId });
			res.status(200).json(orders);
		} catch (err) {
			res.status(500).json(err);
		}
	},

	getTotalOrders: async (req, res) => {
		const orders = await Order.find();
		res.status(200).json({ totalOrder: orders.length });
		try {
		} catch (error) {
			return res.status(500).json(error);
		}
	},

	getOrderStatus: async (req, res) => {
		try {
			const orders = await Order.find();
			const list = [];
			let status = 0;
			if (req.params.status === "pending") {
				status = 1;
			} else if (req.params.status === "delivery") {
				status = 2;
			} else if (req.params.status === "cancel") {
				status = 3;
			} else if (req.params.status === "completed") {
				status = 4;
			} else {
				return res.status(401).json("Status not found");
			}
			orders.forEach((item) => {
				if (item.status === status) {
					list.push(item);
				}
			});

			return res.status(200).json(list);
		} catch (error) {
			console.log(error);
			return res.status(500).json(error);
		}
	},

	getOrderStatusClient: async (req, res) => {
		try {
			const orders = await Order.find({ userId: req.params.userId });
			const list = [];
			if (req.body.status === 0) {
				return res.status(200).json(sortByDate(orders));
			} else {
				orders.forEach((item) => {
					if (item.status === req.body.status) {
						list.push(item);
					}
				});
				return res.status(200).json(sortByDate(list));
			}
		} catch (error) {
			console.log(error);
			return res.status(401).json("Status not found");
		}
	},

	//GET MONTHLY INCOME
	getMonthlyIncome: async (req, res) => {
		const date = new Date();
		const lastMonth = new Date(date.setMonth(date.getMonth()));
		const preMonth = new Date(
			new Date().setMonth(lastMonth.getMonth() - 1)
		);

		try {
			const income = await Order.aggregate([
				{
					$match: {
						createdAt: { $gte: preMonth },
						status: 1,
					},
				},
				{
					$project: {
						month: { $month: "$createdAt" },
						sales: "$amount",
					},
				},
				{
					$group: {
						_id: "$month",
						total: { $sum: "$sales" },
					},
				},
			]);
			res.status(200).json(income);
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	},
};

const sortByDate = (arr) => {
	arr.sort(function (a, b) {
		return new Date(b.createdAt) - new Date(a.createdAt);
	});

	return arr;
};

module.exports = orderController;
