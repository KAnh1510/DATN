require("dotenv").config();

exports.port = process.env.PORT || 5000;
exports.accessTokenLife = "1d";
exports.accessTokenSecret =
	process.env.ACCESS_TOKEN_SECRET || "ACCESS_TOKEN_SECRET";
exports.refreshTokenLife = "30d";
exports.refreshTokenSecret =
	process.env.REFRESH_TOKEN_SECRET || "REFRESH_TOKEN_SECRET";
exports.refreshTokenCookieLife = 30 * 24 * 60 * 60 * 1000;
exports.frontendHost = (process.env.FRONTEND_HOST &&
	process.env.FRONTEND_HOST.split(" ")) || [
	"http://localhost:3000",
	"http://localhost:3001",
	"https://admin-kanh1510.vercel.app",
	"https://client-web-kanh1510.vercel.app",
];
