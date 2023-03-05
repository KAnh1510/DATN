const User = require("../models/User");
const jwtHelper = require("../helpers/jwtToken");
const config = require("../config/config");
const bcrypt = require("bcrypt");

let tokenList = {};
let refreshTokenA = "";
let isLogout = false;

const authControllers = {
	//REGISTER
	registerUser: async (req, res) => {
		let { username, email, password, name } = req.body;
		let regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
		try {
			const userExist = await User.findOne({ email: email });
			if (userExist) {
				return res.status(422).json("Email already in use!");
			}

			const salt = await bcrypt.genSalt(10);
			const hashed = await bcrypt.hash(password, salt);

			if (!regex.test(email)) {
				return res.status(422).json("Invalid email address.");
			}
			//Create new user
			const newUser = new User({
				username: username,
				email: email,
				password: hashed,
				name: name,
				phoneNumber: req.body?.phoneNumber,
				address: req.body?.address,
			});

			//Save user to DB
			await newUser.save();
			return res.status(200).json("Register Successfully!");
		} catch (err) {
			console.log(err);
			res.status(500).json(err);
		}
	},

	//LOGIN
	loginUser: async (req, res) => {
		try {
			const { email, password } = req.body;
			const user = await User.findOne({ email: email });

			if (!user) {
				res.status(400).json("Email does not exists!");
				return;
			}
			const validPassword = await bcrypt.compare(password, user.password);
			if (!validPassword) {
				res.status(401).json("Email or password is incorrect!");
				return;
			}

			if (user && validPassword) {
				req.session.email = req.body.email;
				req.session.password = req.body.password;
				req.session.authorized = true;
				const accessToken = await jwtHelper.generateToken(
					user,
					config.accessTokenSecret,
					config.accessTokenLife
				);

				const refreshToken = await jwtHelper.generateToken(
					user,
					config.refreshTokenSecret,
					config.refreshTokenLife
				);
				tokenList[refreshToken] = { accessToken, refreshToken };
				refreshTokenA = refreshToken;
				res.cookie("refreshToken", refreshToken, {
					secure: false,
					httpOnly: true,
					maxAge: config.refreshTokenCookieLife,
				});

				isLogout = false;
				const { password, ...others } = user._doc;

				return res.status(200).json({
					success: true,
					accessToken,
					...others,
				});
			}
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				success: false,
				error,
			});
		}
	},

	//loginfo
	getInfo: async (req, res) => {
		if (req.session.authorized && !isLogout) {
			const user = {
				email: req.session.email,
				password: req.session.password,
			};
			return res.status(200).json(user);
		} else {
			return res.status(201).json("Not_login");
		}
	},

	//REFRESH
	requestRefreshToken: async (req, res) => {
		// User gửi mã refresh token kèm theo trong body
		let refreshTokenFromClient = req.cookies.refreshToken;

		if (refreshTokenFromClient && tokenList[refreshTokenFromClient]) {
			try {
				// Verify kiểm tra tính hợp lệ của cái refreshToken và lấy dữ liệu giải mã decoded
				let decoded = await jwtHelper.verifyToken(
					refreshTokenFromClient,
					config.refreshTokenSecret
				);
				let user = decoded;
				//console.log(user)
				let accessToken = await jwtHelper.generateToken(
					user,
					config.accessTokenSecret,
					config.accessTokenLife
				);
				// gửi token mới về cho người dùng
				return res.status(200).json({
					success: true,
					accessToken,
				});
			} catch (error) {
				delete tokenList[refreshTokenFromClient];
				res.status(403).json({
					success: false,
					message: "Invalid refresh token.",
				});
			}
		} else {
			// Không tìm thấy token trong request
			return res.status(403).json({
				success: false,
				message: "No token provided.",
			});
		}
	},

	//LOGOUT
	logoutUser: function (req, res) {
		try {
			var refreshToken = refreshTokenA;
			if (refreshToken.length > 0) {
				delete tokenList[refreshToken];
				res.clearCookie("refreshToken");
				res.clearCookie("connect.sid");
				req.session.destroy();
				isLogout = true;
				refreshTokenA = "";
				res.status(200).json({
					success: true,
					msg: "Logging you out",
				});
			} else {
				res.status(403).json({
					success: false,
					msg: "No user to log out!",
				});
			}
		} catch (err) {
			return res.status(500).json({
				success: false,
				err,
			});
		}
	},
};

module.exports = authControllers;
