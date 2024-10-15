const mongoose = require("mongoose");
const env = require("dotenv").config();

let isConnected = false; // Track connection state

const connectToDb = async () => {
	if (isConnected) {
		return; // Use existing connection
	}
	try {
		await mongoose.connect(process.env.MONGODB_URI);
		isConnected = true; // Connection successful
		console.log("Connected to MongoDB");
	} catch (error) {
		console.error("Error connecting to MongoDB", error);
		throw new Error("Failed to connect to MongoDB");
	}
};

const dbMiddleware = async (req, res, next) => {
	try {
		await connectToDb(); // Ensure connection is established
		next();
	} catch (error) {
		res.status(500).json({ error: "Database connection error" });
	}
};

module.exports = { connectToDb, dbMiddleware };
