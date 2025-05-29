const admin = require("firebase-admin");
const speakeasy = require("speakeasy");
const qrcode = require("qrcode");
const bcrypt = require("bcryptjs");
const readline = require("readline");

// Load service account (use your firebase-key.json)
const serviceAccount = require("./firebase-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Prompt helper
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function prompt(question) {
  return new Promise(resolve => rl.question(question, answer => resolve(answer)));
}

(async () => {
  try {
    const password = await prompt("Enter admin password: ");
    const hash = await bcrypt.hash(password, 10);

    const secret = speakeasy.generateSecret({ name: "PuriTrip Admin Panel" });

    console.log("Scan this QR code in Google Authenticator:\n");
    console.log(await qrcode.toString(secret.otpauth_url, { type: "terminal" }));

    console.log("\n🔐 Secret Base32:", secret.base32);

    // Save to Firestore
    await db.collection("admin").doc("auth").set({
      passwordHash: hash,
      totpSecret: secret.base32,
      createdAt: Date.now()
    });

    console.log("\n✅ Admin setup saved to Firestore.");
  } catch (err) {
    console.error("❌ Setup failed:", err);
  } finally {
    rl.close();
  }
})();
