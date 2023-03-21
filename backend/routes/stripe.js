const express = require("express");
const Stripe = require("stripe");
const Order = require("../models/Order");
const Cart = require("../models/Cart");

require("dotenv").config();
const stripe = Stripe(process.env.STRIPE_KEY);
const router = express.Router();
let Items = {};
let note;

router.post("/create-checkout-session", async (req, res) => {
	const customer = await stripe.customers.create({
		metadata: {
			userId: req.body.userId,
			cart: JSON.stringify(req.body.cartItems.toString()),
			note: req.body.note,
			cartId: req.body.cartId,
		},
	});

	Items = req.body.cartItems;
	note = req.body.note;

	const line_items = req.body.cartItems.map((item) => {
		return {
			price_data: {
				currency: "vnd",
				product_data: {
					name: item.name,
					images: [item.imgBack],
					description: item?.desc,
					metadata: {
						id: item._id,
					},
				},
				unit_amount: item.prices,
			},
			quantity: item.quantity,
		};
	});

	const session = await stripe.checkout.sessions.create({
		payment_method_types: ["card"],
		shipping_address_collection: {
			allowed_countries: ["VN"],
		},
		shipping_options: [
			{
				shipping_rate_data: {
					type: "fixed_amount",
					fixed_amount: {
						amount: 0,
						currency: "vnd",
					},
					display_name: "Free shipping",
					// Delivers between 5-7 business days
					delivery_estimate: {
						minimum: {
							unit: "business_day",
							value: 5,
						},
						maximum: {
							unit: "business_day",
							value: 7,
						},
					},
				},
			},
			{
				shipping_rate_data: {
					type: "fixed_amount",
					fixed_amount: {
						amount: 15000,
						currency: "vnd",
					},
					display_name: "Next day air",
					// Delivers in exactly 1 business day
					delivery_estimate: {
						minimum: {
							unit: "business_day",
							value: 1,
						},
						maximum: {
							unit: "business_day",
							value: 1,
						},
					},
				},
			},
		],
		phone_number_collection: {
			enabled: true,
		},
		line_items,
		mode: "payment",
		customer: customer.id,
		success_url: `${process.env.CLIENT_URL}/checkout-success`,
		cancel_url: `${process.env.CLIENT_URL}/collection/all`,
	});

	res.json({ url: session.url });
});

// Create order function
const createOrder = async (customer, data) => {
	const { city, country, line1, line2 } = data.shipping_details.address;

	const newOrder = new Order({
		userId: customer.metadata.userId,
		products: Items,
		note: note,
		amount: data.amount_total,
		phoneNumber: data.customer_details.phone,
		paymentOption: 2,
		address: `${line2}, ${line1}, ${city}, ${country}`,
		name: data.shipping_details.name,
	});

	try {
		const savedOrder = await newOrder.save();
		return savedOrder;
	} catch (err) {
		console.log(err);
	}
};

// Stripe webhoook
let endpointSecret;
// endpointSecret ="whsec_9319caf5d913a2f73159ca48a4b152301c5d9b47d5c06f52615608fb5792932a";

router.post(
	"/webhook",
	express.json({ type: "application/json" }),
	async (req, res) => {
		let data;
		let eventType;

		let signature = req.headers["stripe-signature"];
		if (endpointSecret) {
			let event;

			try {
				event = stripe.webhooks.constructEvent(
					req.body,
					signature,
					endpointSecret
				);
				console.log("webhook verified!");
			} catch (err) {
				console.log(
					`⚠️  Webhook signature verification failed:  ${err.message}`
				);
				return res.status(400).json(`Webhook Error: ${err.message}`);
			}
			// Extract the object from the event.
			data = event.data.object;
			eventType = event.type;
		} else {
			data = req.body.data.object;
			eventType = req.body.type;
		}

		// Handle the checkout.session.completed event
		if (eventType === "checkout.session.completed") {
			stripe.customers
				.retrieve(data.customer)
				.then(async (customer) => {
					try {
						const order = createOrder(customer, data);
						res.status(200).json(order);
					} catch (err) {
						console.log(err);
					}
				})
				.catch((err) => console.log(err.message));
		}

		res.status(200).end();
	}
);

module.exports = router;
