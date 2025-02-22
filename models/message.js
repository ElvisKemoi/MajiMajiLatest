const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
	{
		personName: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
		},
		subject: {
			type: String,
			required: true,
		},
		message: {
			type: String,
			required: true,
		},
		read: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

const Message = new mongoose.model("Message", messageSchema);

module.exports = Message;
