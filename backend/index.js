const express = require("express");
const cors = require("cors");
const { db, admin, cuisine } = require("./firebase-config.js");
const axios = require("axios");
const { collection, getDocs, doc, getDoc } = require("firebase/firestore");
const app = express();
const port = 4000;
app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json("hola");
});

// app.auth().createUser({})
app.post("/signup", async (req, res) => {
  console.log("email and passwor" + req.body.email, req.body.password);
  const userResponse = await admin.auth().createUser({
    email: req.body.email,
    password: req.body.password,
    emailVerified: false,
    disabled: false,
  });
  res.json(userResponse);
});

app.get("/googlesignin", (req, res) => {
  const provider = admin.auth.GoogleAuthProvider();
  admin
    .auth()
    .signInWithPopup(provider)
    .then((userCredential) => {
      // The user is signed in
      const user = userCredential.user;
      res.send(`Signed in as: ${user.displayName}`);
    })
    .catch((error) => {
      // Handle errors
      console.error("Google sign-in error:", error);
      res.status(500).send("An error occurred during sign-in");
    });
});

app.get("/menuItems", async (req, res) => {
  try {
    const snapshot = await cuisine.get();
    // console.log(snapshot.data);
    const menuItems = [];
    snapshot.forEach((doc) => {
      menuItems.push(doc.data());
      // console.log(doc.data);
    });
    console.log(menuItems);
    return res.send(menuItems);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

app.listen(port, () => {
  console.log("backend running at 4000");
});
