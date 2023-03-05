const router = require("express").Router();
const cartController = require("../controllers/cartController");
const notFound = require("./404");

//CREATE
router.post("/create", cartController.createCart);

//UPDATE
router.put("/:id", cartController.updatedCart);

//GET ALL
router.get("/", cartController.getAllProductsInCart);

//GET USER CART
router.get("/find/:userId", cartController.getCart);

//DELETE PRODUCT IN CART
router.post("/product/remove/:id", cartController.deleteProductInCart);

//DELETE CART
router.delete("/delete/:id", cartController.deleteCart);
router.use(notFound);
module.exports = router;
