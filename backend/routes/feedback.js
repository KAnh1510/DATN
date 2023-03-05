const feedbackController = require("../controllers/feedbackController");
const notFound = require("./404");
const authMiddleware = require("../middleware/authentication");
const emailControllers = require("../controllers/emailControllers");

const router = require("express").Router();
router.get("/all", feedbackController.getAllFeedback);
router.post("/create", feedbackController.createFeedback);

router.use(authMiddleware.verifyTokenAndAdmin);
router.get("/getbyid/:id", feedbackController.getFeedback);
router.get("/total-feedback", feedbackController.getTotalFeedback);
router.put("/update/:id", feedbackController.updateFeedback);
router.post("/reply-email", emailControllers.replyEmail);

router.use(notFound);
module.exports = router;
