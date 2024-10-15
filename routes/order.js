const {
	save,
	list,
	markDelivered,
	deleteOrder,
} = require("../controllers/order");

const router = require("express").Router();

router
	.get("/", async (req, res) => {
		const allOrders = await list();
		if (!allOrders.error) {
			res.json(allOrders);
		} else {
			res.json({ error: allOrders.error });
		}
	})
	.post("/", async (req, res) => {
		const { product, phoneNumber, location, price, personName } = req.body;
		const savedOrder = await save(
			product,
			phoneNumber,
			location,
			price,
			personName
		);
		if (!savedOrder.error) {
			res.json({ data: "Order Sent Successfully" });
		} else {
			res.json({ error: "Error Saving Order!" });
		}
	})
	.post("/markasdelivered/:id", async (req, res) => {
		const { id } = req.params;
		const markedAsDelivered = await markDelivered(id);
		if (!markedAsDelivered.error) {
			res.json({ data: "Successfully Updated!" });
		} else {
			res.json({ error: markedAsDelivered.error });
		}
	})
	.post("/delete/:id", async (req, res) => {
		const { id } = req.params;
		const orderDeleted = await deleteOrder(id);
		if (!orderDeleted.error) {
			res.json({ data: "Successfully Deleted Order!" });
		} else {
			res.json({ error: orderDeleted.error });
		}
	});

module.exports = router;
