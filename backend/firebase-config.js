const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
require("dotenv").config();
const serviceAccount = {
  type: process.env.firebase_type,
  project_id: `${process.env.firebase_project_id}`,
  private_key_id: process.env.firebase_private_key_id,
  private_key: process.env.firebase_private_key, // Handle newlines in the private key
  client_email: `${process.env.firebase_client_email}`,
  client_id: `${process.env.firebase_client_id}`,
  auth_uri: `${process.env.firebase_auth_uri}`,
  token_uri: process.env.firebase_token_uri,
  auth_provider_x509_cert_url: process.env.firebase_auth_provider_x509_cert_url,
  client_x509_cert_url: process.env.firebase_universe_domain,
};
const admin = require("firebase-admin");
// const credentials = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
// const auth = getAuth(app);
const db = admin.firestore();
const cuisine = db.collection("cuisine");

module.exports = { db, admin, cuisine };
