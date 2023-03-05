export const VndFormat = (price) => {
	if (price) {
		price = price.toLocaleString("vi", {
			style: "currency",
			currency: "VND",
		});
	}
	return price;
};

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
