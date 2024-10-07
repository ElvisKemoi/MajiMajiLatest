const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
	{
		product: {
			type: String,
			required: true,
		},
		phoneNumber: {
			type: String,
			required: true,
		},
		location: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		personName: {
			type: String,
			required: true,
			trim: true,
		},
		delivered: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);
const Order = new mongoose.model("Order", orderSchema);
module.exports = Order;
