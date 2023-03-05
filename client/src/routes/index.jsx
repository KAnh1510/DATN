import About from "~/pages/about";
import contact from "~/pages/contact";
import PrivatePolicy from "~/pages/privatepolicy";
import ReturnPolicy from "~/pages/returnpolicy";
import Service from "~/pages/service";

const publicRoutes = [
	{ path: "/about", component: About },
	{ path: "/contact", component: contact, pages: null },
	{ path: "/private-policy", component: PrivatePolicy },
	{ path: "/return-policy", component: ReturnPolicy },
	{ path: "/service", component: Service },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
