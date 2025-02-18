// Import the functions you need from the SDKs you need
importScripts('https://www.gstatic.com/firebasejs/10.11.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.11.0/firebase-messaging-compat.js');

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCl4WOacGozDclxu-dB-zrc6O1dTLNbYYU",
  authDomain: "project-todo-29e04.firebaseapp.com",
  projectId: "project-todo-29e04",
  storageBucket: "project-todo-29e04.firebasestorage.app",
  messagingSenderId: "990517291271",
  appId: "1:990517291271:web:ff786d4ca202126d4ffda2",
  measurementId: "G-NYVZL5QT6V"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const {
    notification: { title, body },
    data: { reservation },
  } = payload
  const reservationId = parseInt(reservation)
  console.log(reservationId);

  self.registration.showNotification(title, { body })
})