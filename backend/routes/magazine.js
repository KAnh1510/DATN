const router = require("express").Router();
const magazineController = require("../controllers/magazineController");
const authMiddleware = require("../middleware/authentication");
const notFound = require("./404");

router.get("/", magazineController.getAllMagazine);
router.get("/:id", magazineController.getMagazine);

router.use(authMiddleware.verifyTokenAndAdmin);
router.post("/create", magazineController.createMagazine);
router.post("/update/:id", magazineController.updateMagazine);
router.delete("/remove/:id", magazineController.deleteMagazine);

router.use(notFound);

module.exports = router;
