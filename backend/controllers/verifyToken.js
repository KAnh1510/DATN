const jwt = require("jsonwebtoken");

//verifyToken
const verifyToken = (req, res, next) => {
	const token = req.headers.token;
	if (token) {
		const accessToken = token.split(" ")[1];
		jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
			if (err) {
				return res.status(403).json("Token is not valid");
			}
			req.user = user;
			next();
		});
	} else {
		return res.status(401).json("You are not authentication");
	}
};

const verifyTokenAndAuthorization = (req, res, next) => {
	verifyToken(req, res, () => {
		if (req.user.id === req.params.id || req.user.isAdmin) {
			next();
		} else {
			return res.status(403).json("You are not allowed to do that");
		}
	});
};

const verifyTokenAndAdmin = (req, res, next) => {
	verifyToken(req, res, () => {
		if (req.user.isAdmin) {
			next();
		} else {
			res.status(403).json("You are not allowed to do that!");
		}
	});
};

module.exports = {
	verifyToken,
	verifyTokenAndAuthorization,
	verifyTokenAndAdmin,
};
