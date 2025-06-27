import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // if you need auth

const firebaseConfig = {
  apiKey: "AIzaSyD1UAYMkJrOzz_PZoXvVkxP4mfiIuffys0",
  authDomain: "vector-db-gradient.firebaseapp.com",
  projectId: "vector-db-gradient",
  storageBucket: "vector-db-gradient.firebasestorage.app",
  messagingSenderId: "543029355000",
  appId: "1:543029355000:web:09486379a739622f9c760d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get services
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
