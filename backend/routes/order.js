const ordersRouter = require("express").Router();
const orderController = require("../controllers/orderController");
const notFound = require("./404");
const authMiddleware = require("../middleware/authentication");

//GET USER ORDERS
ordersRouter.post("/find-status/:userId", orderController.getOrderStatusClient);
ordersRouter.get("/find/:userId", orderController.getOrder);

//CREATE
ordersRouter.post("/create", orderController.createOrder);

//UPDATE
ordersRouter.put("/update/:id", orderController.updatedOrder);

//GET ORDER BY ID
ordersRouter.get("/get-by-id/:id", orderController.getOrderById);

//DELETE
ordersRouter.delete("/remove/:id", orderController.deleteOrder);

ordersRouter.use(authMiddleware.verifyTokenAndAdmin);
ordersRouter.get("/", orderController.getAllOrders);
ordersRouter.get("/total-orders", orderController.getTotalOrders);
ordersRouter.get("/get-monthly", orderController.getMonthlyIncome);
ordersRouter.get("/:status", orderController.getOrderStatus);

ordersRouter.use(notFound);

module.exports = ordersRouter;
