const fs = require('fs');

// Crear la carpeta lib para configurar Firebase
fs.mkdirSync('src/lib', { recursive: true });

const firebaseConfig = `import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuración protegida por variables de entorno (.env)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "TU_API_KEY",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "TU_AUTH_DOMAIN",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "TU_PROJECT_ID",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "TU_STORAGE_BUCKET",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "TU_MESSAGING_SENDER_ID",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "TU_APP_ID"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };`;

const loginPage = `import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1. Iniciar sesión en Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Buscar el documento del usuario en Firestore (colección 'usuarios')
      const docRef = doc(db, 'usuarios', user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const rol = data.rol;
        
        // 3. Redirigir según el rol
        if (rol === 'licenciado') {
          router.push('/dashboard/licenciado');
        } else {
          router.push('/dashboard/paciente');
        }
      } else {
        setError('Usuario no encontrado en la base de datos.');
      }
    } catch (err: any) {
      setError('Error al iniciar sesión. Verifique sus credenciales.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#E1EEFF' }}>
      <div style={{ background: 'white', padding: '40px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', maxWidth: '400px', width: '100%' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#1A8BCD', fontWeight: 'bold' }}>Ingresar al Sistema</h2>
        {error && <p style={{ color: 'red', fontSize: '14px', textAlign: 'center', marginBottom: '15px' }}>{error}</p>}
        
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Contraseña</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
          </div>
          <button type="submit" disabled={loading} style={{ width: '100%', padding: '12px', backgroundColor: '#1A8BCD', color: 'white', border: 'none', borderRadius: '5px', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 'bold', fontSize: '16px' }}>
            {loading ? 'Validando...' : 'Entrar'}
          </button>
        </form>
        
        <div style={{ textAlign: 'center', marginTop: '25px' }}>
          <Link href="/" style={{ color: '#1A8BCD', textDecoration: 'none', fontWeight: '500' }}>
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}`;

fs.writeFileSync('src/lib/firebase.ts', firebaseConfig);
fs.writeFileSync('src/pages/login.tsx', loginPage);

console.log("¡Firebase y Login listos! El puente está armado.");