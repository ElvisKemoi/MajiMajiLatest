const Message = require("../models/message");
const message = {
	list: async () => {
		try {
			const foundMessages = await Message.find({});
			return foundMessages;
		} catch (error) {
			return { error: error.message };
		}
	},
	save: async (personName, email, subject, message) => {
		try {
			const newMessage = new Message({
				personName: personName,
				email: email,
				subject: subject,
				message: message,
			});

			const saveStatus = await newMessage.save();
			return true;
		} catch (error) {
			return { error: error.message };
		}
	},
	deleteMessage: async (messageId) => {
		try {
			const deletedStatus = await Message.findByIdAndDelete({ _id: messageId });
			if (!deletedStatus.error) {
				return true;
			} else {
				throw new Error("Message Not Deleted!");
			}
		} catch (error) {
			return { error: error.message };
		}
	},
	changeReadStatus: async (messageId) => {
		try {
			const foundMessage = await Message.findById(
				{ _id: messageId },
				{ read: true }
			);
			if (foundMessage) {
				const updatedMessage = await Message.findByIdAndUpdate(
					{ _id: messageId },
					{ $set: { read: !foundMessage.read } },
					{ new: true }
				);
				return true;
			} else {
				throw new Error("Status Not Changed!");
			}
		} catch (error) {
			return { error: error.message };
		}
	},
};
module.exports = message;
