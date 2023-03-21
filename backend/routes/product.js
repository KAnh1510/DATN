const router = require("express").Router();
const productController = require("../controllers/productController");
const authMiddleware = require("../middleware/authentication");
const notFound = require("./404");

//GET ALL PRODUCT
router.get("/", productController.getAllProducts);

//GET PRODUCTS BY CATEGORY
router.get("/find/:type", productController.getProductByCate);

//GET PRODUCT
router.post("/find/:id", productController.getProduct);

router.post("/search", productController.searchProducts);

router.use(authMiddleware.verifyTokenAndAdmin);
//CREATE
router.post("/create", productController.createProduct);

//UPDATE
router.post("/update/:id", productController.updatedProduct);
router.post("/update-quantity", productController.updateQuantityProduct);

//DELETE
router.delete("/remove/:id", productController.deleteProduct);

router.use(notFound);
module.exports = router;
