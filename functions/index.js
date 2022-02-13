const functions = require("firebase-functions");
const admin = require("firebase-admin");

const express = require("express");
const cors = require("cors");

const picha = express();


admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://picha-cd22f.firebaseio.com"
});

picha.use(cors({ origin: true }));

picha.get("/hello-world", (req, res) => {
    return res.status(200).json({ message: "Hello World!" });
});

// Routes
picha.use(require("./routes/products.routes"));

exports.picha = functions.https.onRequest(picha);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });