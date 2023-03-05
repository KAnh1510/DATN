import { constants } from "./constants";

export const Authentication = () => {
	const token = localStorage.getItem(constants.userToken);

	return token ? true : false;
};
