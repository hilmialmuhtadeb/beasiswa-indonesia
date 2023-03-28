importScripts('https://www.gstatic.com/firebasejs/5.7.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.7.2/firebase-messaging.js');

firebase.initializeApp({
    'messagingSenderId': '235318415040'
});

const messaging = firebase.messaging();

firebase.onBackgroundMessage(messaging, (payload) => {
    console.log('[firebase-messaging-sw.js] Received background message', payload);
    
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
        body: 'Background Message body.',
        icon: '/firebase-logo.png'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

firebase.onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
    // ...
  });