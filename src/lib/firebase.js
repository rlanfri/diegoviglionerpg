import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyAic3h0hrR2lAdZQ0mhEy10MeYDr0zjpGg",
  authDomain: "rpg-viglione.firebaseapp.com",
  projectId: "rpg-viglione",
  storageBucket: "rpg-viglione.firebasestorage.app",
  messagingSenderId: "593794389470",
  appId: "1:593794389470:web:5c463bc1c410c57a55394f"
};
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
