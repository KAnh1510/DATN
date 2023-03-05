export const formatDate = (str) => {
	const date = new Date(str);
	var day, month, year;
	day = date.getDate();
	month = date.getMonth() + 1;
	year = date.getFullYear();
	month = month < 10 ? "0" + month : month;
	day = day < 10 ? "0" + day : day;
	var formatDate = `${year}.${month}.${day}`;
	return formatDate;
};

export const VndFormat = (price) => {
	if (price) {
		price = price.toLocaleString("vi", {
			style: "currency",
			currency: "VND",
		});
	}
	return price;
};

const convertTime12to24 = (time12h) => {
	const [time, modifier] = time12h.split(" ");

	let [hours, minutes] = time.split(":");

	if (hours === "12") {
		hours = "00";
	}

	if (modifier === "PM") {
		hours = parseInt(hours, 10) + 12;
	}

	return `${hours}:${minutes}`;
};

export const formatDateTime = (str) => {
	const convertTime12to24 = (time12h) => {
		const [time, modifier] = time12h.split(" ");

		let [hours, minutes] = time.split(":");

		if (hours === "12") {
			hours = "00";
		}

		if (modifier === "PM") {
			hours = parseInt(hours, 10) + 12;
		}

		return `${hours}:${minutes}`;
	};
	const date = new Date(str);
	var day, month, year;
	day = date.getDate();
	month = date.getMonth() + 1;
	year = date.getFullYear();
	month = month < 10 ? "0" + month : month;
	day = day < 10 ? "0" + day : day;
	let formatDate = `${day}/${month}/${year}`;
	let time = date.toLocaleTimeString();
	let newTime = convertTime12to24(time);
	let fullDateTime = formatDate + " " + newTime;
	return fullDateTime;
};

export const formatTime = (str) => {
	const date = new Date(str);
	let time = date.toLocaleTimeString();
	let newTime = convertTime12to24(time);
	return newTime;
};

export const getBase64 = (file) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
	});
};

export const makeid = (length) => {
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
};
