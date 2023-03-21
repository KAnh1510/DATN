const Product = require("../models/Product");

const productController = {
	//CREATE
	createProduct: async (req, res) => {
		const newProduct = new Product(req.body);
		try {
			await newProduct.save();
			res.status(200).json("Created Product Successfully!");
		} catch (err) {
			res.status(500).json(err);
		}
	},

	//UPDATE
	updatedProduct: async (req, res) => {
		try {
			const product = await Product.findByIdAndUpdate(
				req.params.id,
				{
					$set: req.body,
				},
				{ new: true }
			);
			res.status(200).json(product);
		} catch (error) {
			res.status(500).json(error);
		}
	},

	updateQuantityProduct: (req, res) => {
		try {
			const products = req.body;
			products.map(async (prd) => {
				const product = await Product.findById({ _id: prd.productId });
				const newQuantity = product.quality - prd.quantity;
				await Product.updateOne(
					{ _id: prd.productId },
					{
						$set: { quality: newQuantity },
					}
				);
			});
			res.status(200).json("Successfully");
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	},

	//GET ALL PRODUCTS
	getAllProducts: async (req, res) => {
		try {
			const products = await Product.find();
			res.status(200).json(products);
		} catch (err) {
			res.status(500).json(err);
		}
	},

	getProductByCate: async (req, res) => {
		try {
			const type = req.params.type;
			if (type === "all") {
				const products = await Product.find();
				res.status(200).json(products);
			} else {
				const products = await Product.find({
					categories: type,
				});
				res.status(200).json(products);
			}
		} catch (err) {
			res.status(500).json(err);
		}
	},

	//DELETE
	deleteProduct: async (req, res) => {
		try {
			await Product.findByIdAndDelete(req.params.id);
			res.status(200).json("Product has been deleted...");
		} catch (error) {
			res.status(500).json(error);
		}
	},

	//GET PRODUCT
	getProduct: async (req, res) => {
		try {
			const product = await Product.findById(req.params.id);
			res.status(200).json(product);
		} catch (err) {
			res.status(500).json(err);
		}
	},

	//search products
	searchProducts: async (req, res) => {
		try {
			const products = await Product.find({
				$or: [{ name: { $regex: req.body.searchString } }],
			});

			res.status(200).json(products);
		} catch (error) {
			res.status(500).json(error);
		}
	},
};

module.exports = productController;
