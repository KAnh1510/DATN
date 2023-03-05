const Feedback = require("../models/Feedback");

const feedbackController = {
	//get all feedback
	getAllFeedback: async (req, res) => {
		try {
			const feedback = await Feedback.find();
			res.status(200).json(feedback);
		} catch (err) {
			res.status(500).json(err);
		}
	},

	getFeedback: async (req, res) => {
		try {
			const feedback = await Feedback.findById({ _id: req.params.id });
			res.status(200).json(feedback);
		} catch (err) {
			res.status(500).json(err);
		}
	},

	// create feedback
	createFeedback: async (req, res) => {
		const newFeedback = new Feedback(req.body);
		try {
			const savedFeedback = await newFeedback.save();
			res.status(200).json(savedFeedback);
		} catch (err) {
			res.status(500).json(err);
		}
	},

	//update feedback
	updateFeedback: async (req, res) => {
		try {
			const updatedFeedback = await Feedback.findByIdAndUpdate(
				req.params.id,
				{ $set: { status: true } },
				{ new: true }
			);
			res.status(200).json(updatedFeedback);
		} catch (err) {
			console.log(err);
			res.status(500).json(err);
		}
	},

	getTotalFeedback: async (req, res) => {
		try {
			const feedback = await Feedback.find({ status: false });
			res.status(200).json(feedback.length);
		} catch (err) {
			console.log(err);
			res.status(500).json(err);
		}
	},
};

module.exports = feedbackController;
