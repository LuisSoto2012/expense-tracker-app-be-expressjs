// Create an Express app
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;

// Firebase configuration
const admin = require("firebase-admin");
const serviceAccount = require("./firebase-adminsdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://your-project-id.firebaseio.com",
});

const db = admin.firestore();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get("/api", (req, res) => {
  res.send("Welcome to the Expense Tracker API");
});

app.get("/", (req, res) => {
  res.send("Welcome to the Expense Tracker API");
});

require("./routes/category.routes.js")(app);
require("./routes/transaction.routes.js")(app);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start the server
app.listen(port, () => {
  console.log(`Expense Tracker API running at http://localhost:${port}/api/`);
});
