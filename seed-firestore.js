const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyAic3h0hrR2lAdZQ0mhEy10MeYDr0zjpGg",
  authDomain: "rpg-viglione.firebaseapp.com",
  projectId: "rpg-viglione",
  storageBucket: "rpg-viglione.firebasestorage.app",
  messagingSenderId: "593794389470",
  appId: "1:593794389470:web:5c463bc1c410c57a55394f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seed() {
  const uid = 'iMtVFM5hNfYqp6F1lj1DY4xP18k2';
  await setDoc(doc(db, 'usuarios', uid), {
    nombre: 'Diego',
    apellido: 'Viglione',
    email: 'diego@viglione.com',
    rol: 'admin',
    estado: 'activo',
  });
  console.log('✅ Diego creado como admin en Firestore');
  process.exit(0);
}

seed().catch(e => { console.error('❌ Error:', e.message); process.exit(1); });
