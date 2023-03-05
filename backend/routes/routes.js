const authRoute = require("./auth");
const userRoute = require("./user");
const productRoute = require("./product");
const orderRoute = require("./order");
const cartRoute = require("./cart");
const stripeRoute = require("./stripe");
const categoryRoute = require("./categories");
const feedbackRoute = require("./feedback");
const magazineRoute = require("./magazine");
const notFound = require("./404");

module.exports = function (app) {
	app.use("/api/auth", authRoute);
	app.use("/api/users", userRoute);
	app.use("/api/products", productRoute);
	app.use("/api/orders", orderRoute);
	app.use("/api/categories", categoryRoute);
	app.use("/api/carts", cartRoute);
	app.use("/api/stripe", stripeRoute);
	app.use("/api/feedback", feedbackRoute);
	app.use("/api/magazine", magazineRoute);
	app.use(notFound);
};
