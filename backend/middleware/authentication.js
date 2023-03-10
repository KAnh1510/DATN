const config = require("../config/config");
const debug = console.log.bind(console);
const jwtHelper = require("../helpers/jwtToken");
const accessTokenSecret = config.accessTokenSecret;

const isAuth = async (req, res, next) => {
	//token có thể được kiểm tra ở body hoặc header 'x-access-token'
	const tokenFromClient = req.body.token || req.headers["x-access-token"];
	if (tokenFromClient) {
		// Nếu tồn tại token
		try {
			// Thực hiện giải mã token xem có hợp lệ hay không?
			const decoded = await jwtHelper.verifyToken(
				tokenFromClient,
				accessTokenSecret
			);
			// Nếu token hợp lệ, lưu thông tin giải mã được vào đối tượng req, dùng cho các xử lý ở phía sau.
			req.jwtDecoded = decoded;
			// Cho phép req đi tiếp sang controller.
			next();
		} catch (error) {
			// Nếu giải mã gặp lỗi: Không đúng, hết hạn...etc:
			// Lưu ý trong dự án thực tế hãy bỏ dòng debug bên dưới, mình để đây để debug lỗi cho các bạn xem thôi
			debug("Error while verify token:", error);
			return res.status(401).json({
				message: "Unauthorized",
			});
		}
	} else {
		// Không tìm thấy token trong request
		return res.status(403).send({
			message: "No token provided",
		});
	}
};

const verifyTokenAndAdmin = async (req, res, next) => {
	//token có thể được kiểm tra ở body hoặc header 'x-access-token'
	const tokenFromClient = req.body.token || req.headers["x-access-token"];
	if (tokenFromClient) {
		// Nếu tồn tại token
		try {
			// Thực hiện giải mã token xem có hợp lệ hay không?
			const decoded = await jwtHelper.verifyToken(
				tokenFromClient,
				accessTokenSecret
			);
			// Nếu không phải role là admin thì trả về luôn
			if (!decoded.isAdmin) {
				return res.status(401).json({
					message: "You are not admin, please go back",
				});
			}
			// Nếu token hợp lệ, lưu thông tin giải mã được vào đối tượng req, dùng cho các xử lý ở phía sau.
			req.jwtDecoded = decoded;
			// Cho phép req đi tiếp sang controller.
			next();
		} catch (error) {
			// Nếu giải mã gặp lỗi: Không đúng, hết hạn...etc:
			// Lưu ý trong dự án thực tế hãy bỏ dòng debug bên dưới, mình để đây để debug lỗi cho các bạn xem thôi
			debug("Error while verify token:", error);
			return res.status(401).json({
				message: "Unauthorized",
			});
		}
	} else {
		// Không tìm thấy token trong request
		return res.status(403).send({
			message: "No token provided",
		});
	}
};

module.exports = {
	isAuth,
	verifyTokenAndAdmin,
};
