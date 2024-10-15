const mongoose = require("mongoose");
<<<<<<< HEAD
require("dotenv").config();

const connectToDb = async () => {
	// Check if the Mongoose connection is already established
	if (mongoose.connection.readyState === 1) {
		// 1 = connected
		console.log("Using existing MongoDB connection");
		return;
	}
	try {
		await mongoose.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
=======
const env = require("dotenv").config();

let isConnected = false; // Track connection state

const connectToDb = async () => {
	if (isConnected) {
		return; // Use existing connection
	}
	try {
		await mongoose.connect(process.env.MONGODB_URI);
		isConnected = true; // Connection successful
>>>>>>> 99a76c2d0dd63976a5897441fe00b9ffa72e3e19
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
