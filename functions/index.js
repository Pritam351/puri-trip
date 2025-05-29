const { onRequest } = require("firebase-functions/v2/https");
const { onSchedule } = require("firebase-functions/v2/scheduler");
const admin = require("firebase-admin");
const corsLib = require("cors");
const speakeasy = require("speakeasy");
const qrcode = require("qrcode");
const bcrypt = require("bcryptjs");

// const cors = corsLib({
//   origin: "https://puri-trip-18jul.netlify.app" //only for access this site this is not requie
// });

const cors = corsLib({ origin: true });
admin.initializeApp();
const db = admin.firestore();

const tripDate = new Date("2025-07-18T23:00:00");

function getDaysLeft() {
  const now = new Date();
  const diff = tripDate - now;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

exports.dailyTripReminder = onSchedule({ schedule: "0 23 * * *", timeZone: "Asia/Kolkata" }, async () => {
  const daysLeft = getDaysLeft();
  let body = "";

  if (daysLeft === 0) {
    body = "🎉 Today is the day! Get ready for the Puri adventure! 🌊";
  } else if (daysLeft === 1) {
    body = "⏳ Just 1 day to go! Final call to pack your bags! 🧳";
  } else {
    body = `Only ${daysLeft} day${daysLeft === 1 ? "" : "s"} left to go! 🎒`;
  }

  const tokens = [];
  const snapshot = await db.collection("tokens").get();
  snapshot.forEach(doc => tokens.push(doc.id));

  const message = {
    notification: {
      title: "🌴 Puri Trip Reminder!",
      body
    },
    android: {
      notification: {
        icon: 'https://puri-trip-18jul.netlify.app/favicon.ico',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/puritripnotifier.firebasestorage.app/o/Puri.png?alt=media&token=a422124b-a7c6-4946-9b3c-3a4f971c1d2d',
        color: '#F48FB1'
      }
    },
    tokens
  };

  const res = await admin.messaging().sendEachForMulticast(message);
  console.log(`✅ Sent to ${res.successCount}, failed: ${res.failureCount}`);
});

exports.saveToken = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const token = req.body.token;
      if (!token) {
        return res.status(400).send("❌ Token missing");
      }
      await db.collection("tokens").doc(token).set({ timestamp: Date.now() });
      res.status(200).send("✅ Token saved");
    } catch (err) {
      console.error("❌ Failed to save token:", err);
      res.status(500).send("❌ Internal error saving token");
    }
  });
});

exports.sendCustomNotification = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const { title, body } = req.body;
      if (!title || !body) {
        return res.status(400).send("❌ Missing title or body");
      }

      const tokens = [];
      const snapshot = await db.collection("tokens").get();
      snapshot.forEach(doc => tokens.push(doc.id));

      const message = {
        notification: { title, body },
        android: {
          notification: {
            icon: 'https://puri-trip-18jul.netlify.app/favicon.ico',
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/puritripnotifier.firebasestorage.app/o/Puri.png?alt=media&token=a422124b-a7c6-4946-9b3c-3a4f971c1d2d',
            color: '#F48FB1'
          }
        },
        tokens
      };

      const result = await admin.messaging().sendEachForMulticast(message);
      console.log("📢 Custom sent to:", result.successCount);
      res.status(200).send(`✅ Sent: ${result.successCount}, ❌ Failed: ${result.failureCount}`);
    } catch (err) {
      console.error("❌ Error sending custom notification:", err);
      res.status(500).send("❌ Internal error");
    }
  });
});


exports.verifyAdminLogin = onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const { password, token } = req.body;
      if (!password || !token) {
        return res.status(400).send("❌ Missing credentials");
      }

      const doc = await db.collection("admin").doc("auth").get();
      const data = doc.data();

      if (!data || !data.passwordHash || !data.totpSecret) {
        return res.status(403).send("❌ Admin not setup");
      }

      const isPasswordValid = await bcrypt.compare(password, data.passwordHash);
      const isTokenValid = speakeasy.totp({
        secret: data.totpSecret,
        encoding: "base32"
      }) === token;

      if (isPasswordValid && isTokenValid) {
        return res.status(200).send("✅ Access granted");
      } else {
        return res.status(403).send("❌ Invalid credentials");
      }
    } catch (err) {
      console.error("❌ Login error:", err);
      return res.status(500).send("❌ Internal error");
    }
  });
});

// ✅ GET Firebase config securely for frontend
exports.getFirebaseConfig = onRequest((req, res) => {
  // CORS headers
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  // Preflight request
  if (req.method === 'OPTIONS') {
    return res.status(204).send('');
  }

  // Return safe Firebase config
  res.status(200).json({
    apiKey: "AIzaSyD4pd_CXHCDyozrjCo280DAfT6DgWqoELo",
    authDomain: "puritripnotifier.firebaseapp.com",
    projectId: "puritripnotifier",
    messagingSenderId: "791552504057",
    appId: "1:791552504057:web:c61916d384348e07207228"
  });
});