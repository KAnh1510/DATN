const userRouters = require("express").Router();
const userController = require("../controllers/userControllers");
const emailController = require("../controllers/emailControllers");
const authMiddleware = require("../middleware/authentication");
const notFound = require("./404");

//GET USER
userRouters.get("/find/:id", userController.getUser);
userRouters.post("/change-password/send-code", emailController.sendMail);
userRouters.post("/change-password", emailController.checkCode);

userRouters.use(authMiddleware.isAuth);
userRouters.put("/edit-profile/:id", userController.updateUser);

userRouters.use(authMiddleware.verifyTokenAndAdmin);
userRouters.get("/list", userController.getAllUsers);
userRouters.delete("/:id", userController.deleteUser);
userRouters.get("/total-users", userController.getTotalUsers);
userRouters.get("/get-admin", userController.getUserAdmin);
userRouters.get("/get-customer", userController.getUserCustomer);

userRouters.use(notFound);

module.exports = userRouters;
