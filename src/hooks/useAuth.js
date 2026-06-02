import { useState, useEffect } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '@/lib/firebase';
export function useAuth() {
  const [user, setUser] = useState(null);
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) { setUser(null); setPerfil(null); setLoading(false); return; }
      try {
        const snap = await getDoc(doc(db, 'usuarios', firebaseUser.uid));
        if (!snap.exists()) { await signOut(auth); setError('no-registrado'); setLoading(false); return; }
        const data = snap.data();
        if (data.estado !== 'activo') { await signOut(auth); setError('sin-acceso'); setLoading(false); return; }
        setUser(firebaseUser); setPerfil(data); setError(null);
      } catch(e) { setError('error'); }
      setLoading(false);
    });
    return () => unsub();
  }, []);
  const loginConGoogle = async () => {
    setError(null); setLoading(true);
    try { await signInWithPopup(auth, googleProvider); }
    catch(e) { if (e.code !== 'auth/popup-closed-by-user') setError('error'); setLoading(false); }
  };
  const logout = async () => { await signOut(auth); setUser(null); setPerfil(null); };
  return { user, perfil, loading, error, loginConGoogle, logout };
}
