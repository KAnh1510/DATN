const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const routes = require("./routes/routes");
const bodyParser = require("body-parser");

dotenv.config();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
	bodyParser.urlencoded({
		limit: "50mb",
		extended: true,
		parameterLimit: 50000,
	})
);

const allowedOrigins = require("./config/config.js").frontendHost;
app.use(
	cors({
		origin: function (origin, callback) {
			if (!origin) return callback(null, true);
			if (allowedOrigins.indexOf(origin) === -1) {
				var msg =
					"The CORS policy for this site does not allow access from the specified Origin.";
				return callback(new Error(msg), false);
			}
			return callback(null, true);
		},
		methods: ["GET", "POST", "PUT", "DELETE"],
		allowedHeaders: [
			"Content-Type",
			"Origin",
			"X-Requested-With",
			"Accept",
			"x-client-key",
			"x-client-token",
			"x-client-secret",
			"Authorization",
			"x-access-token",
		],
		optionsSuccessStatus: 200,
		credentials: true,
	})
);

app.use(cookieParser());
app.use(express.json());
app.use("/public", express.static("./public"));

//ROUTES
routes(app);

const uri = process.env.MONGODB_URL;
const port = require("./config/config").port;

app.listen(port, () => {
	console.log(`Server running on port: ${port}...`);
});

mongoose
	.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("MongoDB connection established..."))
	.catch((error) =>
		console.error("MongoDB connection failed:", error.message)
	);
