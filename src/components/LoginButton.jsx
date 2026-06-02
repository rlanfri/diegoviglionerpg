'use client';
import { useState } from 'react';
import { signInWithPopup, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { auth, db, googleProvider } from '@/lib/firebase';
import { useAuth } from '@/hooks/useAuth';

export default function LoginButton() {
  const { user, perfil, loading } = useAuth();
  const [error, setError] = useState(null);
  const router = useRouter();

  async function handleLogin() {
    setError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const snap = await getDoc(doc(db, 'usuarios', result.user.uid));
      if (!snap.exists()) { await signOut(auth); setError('no-registrado'); return; }
      const data = snap.data();
      if (data.estado !== 'activo') { await signOut(auth); setError('sin-acceso'); return; }
      router.push('/dashboard');
    } catch(e) {
      if (e.code !== 'auth/popup-closed-by-user') setError('error');
    }
  }

  if (loading) return <button disabled style={btn}>Cargando...</button>;
  if (user && perfil) return (
    <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
      <span style={{fontSize:'0.85rem',color:'#374151'}}>Hola, {perfil.nombre}</span>
      <button onClick={() => signOut(auth)} style={btn}>Salir</button>
    </div>
  );

  return (
    <div style={{position:'relative'}}>
      <button onClick={handleLogin} style={btn}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
        Ingresar
      </button>
      {error && (
        <div style={{position:'absolute',top:'calc(100% + 8px)',right:0,background:'#fff',border:'1.5px solid #fee2e2',borderRadius:'8px',padding:'10px 14px',fontSize:'0.78rem',color:'#991b1b',whiteSpace:'nowrap',boxShadow:'0 4px 16px rgba(0,0,0,.1)',zIndex:100}}>
          {'no-registrado'===error?'Tu cuenta no está registrada. Contactá al consultorio.':'sin-acceso'===error?'Tu acceso está suspendido. Contactá al consultorio.':'Error de conexión. Intentá de nuevo.'}
        </div>
      )}
    </div>
  );
}

const btn = {display:'flex',alignItems:'center',gap:'8px',background:'#1A8BCD',color:'#fff',border:'none',borderRadius:'8px',padding:'9px 18px',fontSize:'0.9rem',fontWeight:'500',cursor:'pointer',fontFamily:'inherit'};
