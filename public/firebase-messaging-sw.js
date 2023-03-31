importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyCnJtOt62qk-Z-0ad2KfpmARWpt55lUZGc",
    authDomain: "beasiswa-indonesia.firebaseapp.com",
    projectId: "beasiswa-indonesia",
    storageBucket: "beasiswa-indonesia.appspot.com",
    messagingSenderId: "235318415040",
    appId: "1:235318415040:web:7e8e666c10bc05602a2725",
    measurementId: "G-HSPMP630EM"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});