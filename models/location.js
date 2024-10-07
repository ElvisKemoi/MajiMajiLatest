const mongoose = require("mongoose");

const locationsSchema = new mongoose.Schema({
	location: {
		type: String,
		required: true,
	},
});
const Location = new mongoose.model("Location", locationsSchema);
module.exports = Location;
