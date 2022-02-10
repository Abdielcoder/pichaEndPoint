const functions = require("firebase-functions");
const admin = require("firebase-admin");

const express = require("express");
const cors = require("cors");

const tadi = express();


admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://ciem-58bd7.firebaseio.com"
});

tadi.use(cors({ origin: true }));

tadi.get("/hello-world", (req, res) => {
  return res.status(200).json({ message: "Hello World!" });
});

// Routes
tadi.use(require("./routes/products.routes"));

exports.tadi = functions.https.onRequest(tadi);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });