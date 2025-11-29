// Mock Firebase module for development
// Replace with real Firebase when it's properly installed
let auth;
let db;
let storage;
try {
    // Try to load real Firebase if available
    const { initializeApp } = require("firebase/app");
    const { getAuth: getAuthReal } = require("firebase/auth");
    const { getFirestore: getFirestoreReal } = require("firebase/firestore");
    const { getStorage: getStorageReal } = require("firebase/storage");
    const firebaseConfig = {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDemoKey1234567890",
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "demo-app.firebaseapp.com",
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "demo-app",
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "demo-app.appspot.com",
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
        appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789:web:abcdef1234567890",
    };
    const app = initializeApp(firebaseConfig);
    auth = getAuthReal(app);
    db = getFirestoreReal(app);
    storage = getStorageReal(app);
}
catch (error) {
    // Firebase not available, use mock implementations
    auth = {};
    db = {};
    storage = {};
    console.warn("Firebase not available, using mock implementations");
}
export { auth, db, storage };
