importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyD4pd_CXHCDyozrjCo280DAfT6DgWqoELo",
  authDomain: "puritripnotifier.firebaseapp.com",
  projectId: "puritripnotifier",
  storageBucket: "puritripnotifier.appspot.com", // ✅ FIXED storage domain
  messagingSenderId: "791552504057",
  appId: "1:791552504057:web:c61916d384348e07207228",
  measurementId: "G-83MTQGRLQE"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  const notificationTitle = payload.notification?.title || "📢 New Alert!";
  const notificationOptions = {
    body: payload.notification?.body || "",
    icon: "/favicon.ico",
    data: { url: "https://puri-trip-18jul.netlify.app/" }
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});
