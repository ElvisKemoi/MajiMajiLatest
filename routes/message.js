const router = require("express").Router();
const {
	save,
	list,
	changeReadStatus,
	deleteMessage,
} = require("../controllers/message.js");

router
	.get("/", async (req, res) => {
		const foundMessages = await list();
		if (!foundMessages.error) {
			res.json(foundMessages);
		}
	})
	.post("/save", async (req, res) => {
		const { personName, email, subject, message } = req.body;

		const savedMessage = await save(personName, email, subject, message);

		if (savedMessage.error) {
			res.status(500).json({ error: savedMessage.error });
		} else if (savedMessage) {
			res.status(200).json({ data: "Message Saved Successfully" });
		} else {
			res.json({ error: "There was an unexpected error in your request" });
		}
	})
	.post("/markasread/:id", async (req, res) => {
		const { id } = req.params;
		const markedAsRead = await changeReadStatus(id);
		if (!markedAsRead.error) {
			res.json({ data: "Updated Successfully!" });
		} else {
			res.json({ error: markedAsRead.error });
		}
	})
	.post("/delete/:id", async (req, res) => {
		const { id } = req.params;
		const deletedStatus = await deleteMessage(id);
		if (!deletedStatus.error) {
			res.json({ data: "Deleted Successfully!" });
		} else {
			res.json({ error: deletedStatus.error });
		}
	});

module.exports = router;
