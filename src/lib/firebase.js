import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// Login por dominio propio (evita el bloqueo de almacenamiento de terceros de Safari/iOS).
// Apagado por defecto: se activa en licdiegoviglione.com con ?authproxy=1 (queda guardado en ese navegador).
// Para apagarlo en ese navegador: ?authproxy=0
const AUTH_DOMAIN = (function () {
  const DEFAULT = 'rpg-viglione.firebaseapp.com';
  try {
    if (typeof window === 'undefined' || window.location.hostname !== 'licdiegoviglione.com') return DEFAULT;
    const q = new URLSearchParams(window.location.search).get('authproxy');
    if (q === '1') window.localStorage.setItem('rpg_authproxy', '1');
    if (q === '0') window.localStorage.removeItem('rpg_authproxy');
    return window.localStorage.getItem('rpg_authproxy') === '1' ? window.location.hostname : DEFAULT;
  } catch (e) { return DEFAULT; }
})();
const firebaseConfig = {
  apiKey: "AIzaSyAic3h0hrR2lAdZQ0mhEy10MeYDr0zjpGg",
  authDomain: AUTH_DOMAIN,
  projectId: "rpg-viglione",
  storageBucket: "rpg-viglione.firebasestorage.app",
  messagingSenderId: "593794389470",
  appId: "1:593794389470:web:5c463bc1c410c57a55394f"
};
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
// Siempre mostrar el selector de cuentas (si no, Google entra solo con la última usada)
googleProvider.setCustomParameters({ prompt: 'select_account' });
