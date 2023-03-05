const Cart = require("../models/Cart");

const cartController = {
	//CREATE
	createCart: async (req, res) => {
		const {
			userId,
			productId,
			name,
			prices,
			imgFront,
			color,
			size,
			quantity,
		} = req.body;
		try {
			let cart = await Cart.findOne({ userId });
			if (cart) {
				let itemIndex = cart.products.findIndex(
					(p) =>
						p.productId == productId &&
						p.color == color &&
						p.size == size
				);
				if (itemIndex > -1) {
					let productItem = cart.products[itemIndex];
					productItem.quantity += quantity;
					cart.products[itemIndex] = productItem;
				} else {
					cart.products.push({
						productId,
						name,
						prices,
						imgFront,
						color,
						size,
						quantity,
					});
				}
				cart = await cart.save();
				res.status(200).json(cart);
			} else {
				//no cart for user, create new cart
				const newCart = await Cart.create({
					userId,
					products: [
						{
							productId,
							name,
							prices,
							imgFront,
							color,
							size,
							quantity,
						},
					],
				});
				return res.status(200).json(newCart);
			}
		} catch (err) {
			console.log(err);
			res.status(500).json(err);
		}
	},

	//UPDATE
	updatedCart: async (req, res) => {
		try {
			const updatedCart = await Cart.findByIdAndUpdate(
				req.params.id,
				{
					$set: req.body,
				},
				{ new: true }
			);
			let amount = 0;
			updatedCart?.products.map(
				(item) => (amount += item.prices * item.quantity)
			);
			res.status(200).json({ amount, ...updatedCart._doc });
		} catch (error) {
			res.status(500).json(error);
		}
	},

	//DELETE
	deleteCart: async (req, res) => {
		try {
			await Cart.findByIdAndDelete(req.params.id);
			res.status(200).json("Cart has been deleted....");
		} catch (error) {
			res.status(500).json(error);
		}
	},

	//GET ALL
	getAllProductsInCart: async (req, res) => {
		try {
			const productInCart = await Cart.find();
			res.status(200).json(productInCart);
		} catch (err) {
			res.status(500).json(err);
		}
	},

	//DELETE
	deleteProductInCart: async (req, res) => {
		try {
			await Cart.updateOne(
				{ userId: req.body.userId },
				{ $pull: { products: { _id: req.params.id } } }
			);
			const carts = await Cart.findOne({ userId: req.body.userId });
			let amount = 0;
			carts?.products.map(
				(item) => (amount += item.prices * item.quantity)
			);
			res.status(200).json({ amount, ...carts._doc });
		} catch (error) {
			res.status(500).json(error);
		}
	},

	//GET USER CART
	getCart: async (req, res) => {
		try {
			const cart = await Cart.findOne({ userId: req.params.userId });
			let amount = 0;
			cart?.products.map(
				(item) => (amount += item.prices * item.quantity)
			);
			res.status(200).json({ amount, ...cart._doc });
		} catch (err) {
			res.status(500).json(err);
		}
	},
};

module.exports = cartController;
