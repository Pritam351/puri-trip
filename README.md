# 🌴 Puri Trip Notifier

A complete web app to send **daily countdown push notifications** for your upcoming trip to **Puri on July 18, 2025** 🧳🚆

This project uses:
- 🔥 Firebase Cloud Messaging (FCM)
- 🔔 Web push notifications
- 🌐 Netlify hosting
- ☁️ Firebase Cloud Functions
- 💡 JavaScript gallery, quotes, and countdown

---

## 🚀 Live Demo
🌐 [Visit the Site](https://puri-trip-18jul.netlify.app/).

---

## 📸 Features
- ✅ Push notifications even when the browser is closed
- ✅ Automatically updates background, quotes, and images every 15 seconds
- ✅ Firebase Firestore stores user FCM tokens
- ✅ Countdown updates in real-time
- ✅ Scheduled daily messages at 11 PM IST

---

## 🛠️ Project Structure

puri-trip/
├── index.html # Main web page
├── firebase-messaging-sw.js # FCM service worker
├── favicon.ico
├── functions/
│ ├── index.js # Firebase Functions (token save & reminder)
│ ├── package.json
│ └── package-lock.json
└── firebase-key.json # 🔐 DO NOT UPLOAD


## 🙌 Created By
PRITAM 💛  
Happy trip! 🌞

---

## 📦 License
MIT
