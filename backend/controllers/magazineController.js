const Magazine = require("../models/Magazine");

const magazineController = {
	//CREATE
	createMagazine: async (req, res) => {
		const newMagazine = new Magazine(req.body);
		try {
			const savedMagazine = await newMagazine.save();
			res.status(200).json(savedMagazine);
		} catch (err) {
			res.status(500).json(err);
		}
	},

	//GET ALL MAGAZINE
	getAllMagazine: async (req, res) => {
		try {
			const magazine = await Magazine.find();
			res.status(200).json(magazine);
		} catch (err) {
			res.status(500).json(err);
		}
	},

	//GET MAGAZINE
	getMagazine: async (req, res) => {
		try {
			const magazine = await Magazine.findById(req.params.id);
			res.status(200).json(magazine);
		} catch (err) {
			res.status(500).json(err);
		}
	},

	//DELETE
	deleteMagazine: async (req, res) => {
		try {
			await Magazine.findByIdAndDelete(req.params.id);
			res.status(200).json("Magazine has been deleted...");
		} catch (error) {
			res.status(500).json("Delete failed!");
		}
	},

	updateMagazine: async (req, res) => {
		try {
			const magazine = await Magazine.findByIdAndUpdate(
				req.params.id,
				{
					$set: req.body,
				},
				{ new: true }
			);
			res.status(200).json(magazine);
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	},
};

module.exports = magazineController;
