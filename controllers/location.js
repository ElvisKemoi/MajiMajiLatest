const Location = require("../models/location");

const location = {
	save: async (locationName) => {
		try {
			const newLocation = new Location({
				location: locationName,
			});
			const savedLocation = await newLocation.save();
			if (savedLocation && !savedLocation.error) {
				return true;
			} else {
				throw new Error("An Error Occurred While Saving The Location");
			}
		} catch (error) {
			return { error: error.message };
		}
	},
	delete: async (id) => {
		try {
			const deletedLocation = await Location.findByIdAndDelete({ _id: id });
			if (deletedLocation) {
				return true;
			} else {
				throw new Error("An Error Occurred While Deleting Location");
			}
		} catch (error) {
			return { error: error.message };
		}
	},
	list: async (id) => {
		try {
			const theMessages = await Location.find({});
			if (!theMessages.error && theMessages) {
				return theMessages;
			} else {
				throw new Error("An Error Occurred While Getting Locations");
			}
		} catch (error) {
			return { error: error.message };
		}
	},
};
module.exports = location;
