const nodeMailer = require("nodemailer");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD_APP;
const mailHost = "smtp.gmail.com";
const mailPort = 587;

const transporter = nodeMailer.createTransport({
	host: mailHost,
	port: mailPort,
	secure: false,
	auth: {
		user: adminEmail,
		pass: adminPassword,
	},
});

let verificationCode = 0;

function makeid(length) {
	let result = "";
	const characters = "0123456789";
	const charactersLength = characters.length;
	let counter = 0;
	while (counter < length) {
		result += characters.charAt(
			Math.floor(Math.random() * charactersLength)
		);
		counter += 1;
	}
	return result;
}

const sendMail = async (req, res) => {
	try {
		let email = req.body.email;
		let currentPassword = req.body.currentPassword;
		const user = await User.findOne({ email: req.body.email });
		if (!user) {
			return res.status(401).json("Email not registered!");
		}
		if (currentPassword) {
			const validPassword = bcrypt.compare(
				currentPassword,
				user.password
			);
			if (!validPassword) {
				return res.status(401).json("Current password is incorrect!");
			}
		}
		let passwordRandom = makeid(6);
		verificationCode = passwordRandom;
		let message = `
      <div>
        <h2>Reset password </h2>
        <div>Your verification code is: ${passwordRandom}. Please do not send this verification code to anyone.</div>
      </div>
    `;

		const options = {
			from: adminEmail,
			to: email,
			subject: "Password Reset",
			html: message,
		};

		await transporter.sendMail(options);
		res.status(200).json("Your email has been sent successfully.");
	} catch (error) {
		console.log(error);
		res.status(500).json("Your email has been sent fail.");
	}
};

const checkCode = async (req, res) => {
	const code = req.body.code;
	if (code === verificationCode) {
		try {
			const salt = await bcrypt.genSalt(10);
			const hashed = await bcrypt.hash(req.body.password, salt);

			await User.findOneAndUpdate(
				{ email: req.body.email },
				{ $set: { password: hashed } },
				{ new: true }
			);

			return res.status(200).json("Reset password is successfully! ");
		} catch (error) {
			return res.status(500).json(error);
		}
	} else {
		return res.status(400).json("Verification code wrong!");
	}
};

const replyEmail = async (req, res) => {
	let email = req.body.email;
	let message = req.body.msg;

	try {
		const options = {
			from: adminEmail,
			to: email,
			subject: "ColdKid Club",
			html: `<div>
        <h3>Hi ${email.split("@")[0]} </h3>
        <div>${message}</div>
      </div>`,
		};

		await transporter.sendMail(options);
		res.status(200).json("Sent email!");
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
};

module.exports = {
	sendMail: sendMail,
	checkCode: checkCode,
	replyEmail: replyEmail,
};
