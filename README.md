# 🌴 Puri Trip Notifier

A secure push notification web app to remind your squad daily about the **Puri Trip on July 18, 2025** 🎒🚆

This project uses:
- 🔥 Firebase Cloud Messaging (FCM)
- ☁️ Firebase Cloud Functions (secured backend)
- 🔐 Admin panel protected with password + 2FA (Google Authenticator)
- 🌐 Netlify static hosting
- 📱 Android & browser push support
- 🖼️ Image + background gallery
- 💬 Random quotes & countdown timer

---

## 🚀 Live Demo
🌐 [Visit the Website](https://puri-trip-18jul.netlify.app/)

---

## 🔐 Admin Dashboard Security
- Password-based login
- Google Authenticator-based **2FA**
- Firebase Firestore securely stores:
  - Hashed admin password
  - TOTP secret
- No API keys or credentials are exposed in `index.html`
- CORS protection: backend only responds to Netlify domain

---

## 🔔 Push Notification Features
- ✅ **Daily notifications** sent automatically at 11 PM IST
- ✅ **Custom notifications** via secure admin panel
- ✅ Includes custom icon + background image
- ✅ Delivered even when browser/app is closed
- ✅ Android tested & supported

---

## 🛠️ Project Structure

```bash
puri-trip/
├── index.html                  # Main web page (frontend)
├── favicon.ico                 # Notification & browser icon
├── firebase-messaging-sw.js   # FCM service worker
├── functions/                 # Backend: Firebase Functions
│   ├── index.js               # All functions: token save, daily alert, admin 2FA, custom send
│   ├── package.json
│   └── package-lock.json
└── firebase-key.json          # 🔐 DO NOT UPLOAD (service account key)



## 🙌 Created By
PRITAM 💛  
Happy trip! 🌞

---

## 📦 License

---

Let me know if you want:
- A fancy header image/banner
- Contributor credits
- Deployment guide section (Netlify + Firebase deploy commands)

I'll generate it for you instantly.
