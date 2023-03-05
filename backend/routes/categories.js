const router = require("express").Router();
const categoriesController = require("../controllers/categoriesController");
const authMiddleware = require("../middleware/authentication");
const notFound = require("./404");

//GET ALL CATEGORIES
router.get("/", categoriesController.getAllCategories);
//GET CATEGORIES
router.get("/find/:id", categoriesController.getCategories);

router.use(authMiddleware.verifyTokenAndAdmin);
//CREATE
router.post("/create", categoriesController.createCategories);
//UPDATE
router.put("/update/:id", categoriesController.updatedCategories);
//DELETE
router.delete("/remove/:id", categoriesController.deleteCategories);

router.use(notFound);

module.exports = router;
