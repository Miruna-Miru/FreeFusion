import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // Firebase Auth
import { getFirestore } from 'firebase/firestore'; // Firestore

const firebaseConfig = {
  apiKey: "AIzaSyCfZz43GI-e9Ru1PVJqyvjJynveTP3DSCs",
    authDomain: "freelacer-app.firebaseapp.com",
    projectId: "freelacer-app",
    storageBucket: "freelacer-app.appspot.com",
    messagingSenderId: "513314619511",
    appId: "1:513314619511:web:1f2028e3c0cd235ff78672",
    measurementId: "G-GWLSHQXZMS"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Auth (automatically uses AsyncStorage for React Native)
const auth = getAuth(app);

export { db, auth };

