const authController = require("../controllers/authControllers");
const authMiddleware = require("../middleware/authentication");
const notFound = require("./404");
const session = require("express-session");

const authRouter = require("express").Router();

authRouter.use(
	session({
		secret: "fjdsiofhpeu0123",
		resave: false,
		saveUninitialized: true,
		cookie: { maxAge: 1000 * 60 * 60 * 24 },
	})
);

//LOGIN
authRouter.get("/get-info", authController.getInfo);
authRouter.post("/login", authController.loginUser);

//REGISTER
authRouter.post("/register", authController.registerUser);

//REFRESH
authRouter.post("/refresh-token", authController.requestRefreshToken);

//LOGOUT
authRouter.post("/logout", authController.logoutUser);

authRouter.use(notFound);

module.exports = authRouter;
