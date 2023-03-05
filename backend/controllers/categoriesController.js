const Categories = require("../models/Categories");

const categoriesController = {
	//CREATE
	createCategories: async (req, res) => {
		const newCategories = new Categories(req.body);
		try {
			const savedCategories = await newCategories.save();
			res.status(200).json(savedCategories);
		} catch (err) {
			res.status(500).json(err);
		}
	},

	//UPDATE
	updatedCategories: async (req, res) => {
		try {
			const updatedCategories = await Categories.findByIdAndUpdate(
				req.params.id,
				{
					$set: req.body,
				},
				{ new: true }
			);
			res.status(200).json(updatedCategories);
		} catch (error) {
			res.status(500).json(err);
		}
	},

	//GET ALL CATEGORIES
	getAllCategories: async (req, res) => {
		try {
			const categories = await Categories.find();
			res.status(200).json(categories);
		} catch (err) {
			res.status(500).json(err);
		}
	},

	//DELETE
	deleteCategories: async (req, res) => {
		try {
			await Categories.findByIdAndDelete(req.params.id);
			res.status(200).json("Categories has been deleted...");
		} catch (error) {
			res.status(500).json(error);
		}
	},

	//GET CATEGORIES
	getCategories: async (req, res) => {
		try {
			const categories = await Categories.findById(req.params.id);
			res.status(200).json(categories);
		} catch (err) {
			res.status(500).json(err);
		}
	},
};

module.exports = categoriesController;
