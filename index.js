const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables from .env
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const messageRoutes = require("./routes/message");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// CORS setup (Allow all origins for now, or dynamically manage it)
app.use(cors({ origin: "*", methods: "GET,POST,PUT,DELETE" }));

const orderRoute = require("./routes/order");
const locationRoute = require("./routes/location");

// API Routes
app.use("/message", messageRoutes);
app.use("/order", orderRoute);
app.use("/location", locationRoute);

// Serve static files
app.use(express.static(path.join(process.cwd(), "public")));

// Serve index.html
app.get("/", (req, res) => {
	const filePath = path.join(process.cwd(), "public", "index.html");
	fs.readFile(filePath, "utf8", (err, data) => {
		if (err) {
			res.status(500).send("Error reading index.html file");
		} else {
			res.setHeader("Content-Type", "text/html");
			res.send(data);
		}
	});
});

// Admin route (You can add admin logic here)
app.get("/admin", (req, res) => {
	const filePath = path.join(process.cwd(), "public", "admin.html");
	fs.readFile(filePath, "utf8", (err, data) => {
		if (err) {
			res.status(500).send("Error reading index.html file");
		} else {
			res.setHeader("Content-Type", "text/html");
			res.send(data);
		}
	});
	// res.send("Admin panel route");
});

// Connect to MongoDB

mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => {
		console.log("Connected to MongoDB");
	})
	.catch((error) => {
		console.error("Error connecting to MongoDB", error);
	});

// Remove app.listen() as Vercel handles port automatically

app.listen(process.env.PORT, () => {});

module.exports = app;
