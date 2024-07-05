import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// REACT_APP_FIREBASE_API_KEY=AIzaSyDzTnFFiqoIgOFSUJUV7SHLXtN1t7vQsl4
// REACT_APP_FIREBASE_AUTH_DOMAIN=distributed-system-467cb.firebaseapp.com
// REACT_APP_FIREBASE_PROJECT_ID=distributed-system-467cb
// REACT_APP_FIREBASE_STORAGE_BUCKET=distributed-system-467cb.appspot.com
// REACT_APP_FIREBASE_MESSAGING_SENDER_ID=230152628496
// REACT_APP_FIREBASE_APP_ID=1:230152628496:web:ae337a6e7e9742cd65dd95
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
