import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// IMPORTANT: Replace with your actual Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSy...YOUR_API_KEY", // Replace with your actual API key
  authDomain: "your-project-id.firebaseapp.com", // Replace with your actual auth domain
  projectId: "your-project-id", // Replace with your actual project ID
  storageBucket: "your-project-id.appspot.com", // Replace with your actual storage bucket
  messagingSenderId: "your-messaging-sender-id", // Replace with your actual sender ID
  appId: "your-app-id", // Replace with your actual app ID
};

// A check to ensure the user has updated the config
if (firebaseConfig.apiKey.startsWith("AIzaSy...")) {
  console.warn("Firebase config is not set. Please update firebase/config.ts with your project credentials.");
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
