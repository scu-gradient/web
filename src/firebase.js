import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // if you need auth



// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get services
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
