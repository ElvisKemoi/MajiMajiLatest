const Order = require("../models/order");

const order = {
	save: async (product, phoneNumber, location, price, personName) => {
		try {
			const newOrder = new Order({
				product: product,
				phoneNumber: phoneNumber,
				location: location,
				price: price,
				personName: personName,
			});
			const newOrderSaved = await newOrder.save();

			if (newOrderSaved) {
				return true;
			} else {
				throw new Error("Error Saving Order!");
			}
		} catch (error) {
			return { error: error.message };
		}
	},
	list: async () => {
		try {
			const theOrders = await Order.find({}).sort({ createdAt: -1 });
			if (theOrders) {
				return theOrders;
			} else {
				throw new Error("Error Fetching Orders");
			}
		} catch (error) {
			return { error: error.message };
		}
	},
	markDelivered: async (id) => {
		try {
			const updatedOrder = await Order.findByIdAndUpdate(
				{ _id: id },
				{ $set: { delivered: true } }
			);
			if (updatedOrder) {
				return true;
			} else {
				throw new Error("Error Updating Order!");
			}
		} catch (error) {
			return { error: error.message };
		}
	},
	deleteOrder: async (id) => {
		try {
			const deletedOrder = await Order.findByIdAndDelete({ _id: id });
			if (deletedOrder) {
				return true;
			} else {
				throw new Error(
					"An Unexpected Error Occurred While Deleting The Order"
				);
			}
		} catch (error) {
			return { error: error.message };
		}
	},
};
module.exports = order;
