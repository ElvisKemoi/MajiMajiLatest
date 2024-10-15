const location = require("../controllers/location");

const router = require("express").Router();

router
	.get("/", async (req, res) => {
		const theLocations = await location.list();
		if (!theLocations.error && theLocations) {
			res.json({ data: theLocations });
		} else {
			res.json({ error: theLocations.error });
		}
	})
	.post("/", async (req, res) => {
		const { newLocation } = req.body;
		const savedLocation = await location.save(newLocation);
		if (!savedLocation.error && savedLocation) {
			res.json({ data: "Successfully Saved Location!" });
		} else {
			res.json({ error: savedLocation.error });
		}
	})
	.post("/delete/:id", async (req, res) => {
		const { id } = req.params;

		const deletedLocation = await location.delete(id);
		if (!deletedLocation.error && deletedLocation) {
			res.json({ data: "Successfully Deleted Location" });
		} else {
			res.json({ error: deletedLocation.error });
		}
	});
module.exports = router;
