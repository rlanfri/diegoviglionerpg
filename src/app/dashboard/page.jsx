'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
export default function DashboardPage() {
  const { user, perfil, loading, logout } = useAuth();
  const router = useRouter();
  useEffect(() => { if (loading) return; if (!user || !perfil) router.replace('/'); }, [user, perfil, loading]);
  useEffect(() => {
    const handler = (e) => { if (e.data?.type === 'logout') { logout(); router.replace('/'); } };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);
  if (loading || !perfil) return <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh'}}><p style={{color:'#6b7280'}}>Cargando...</p></div>;
  const appUrl = `/rpg/index.html?uid=${user.uid}&rol=${perfil.rol}&nombre=${encodeURIComponent((perfil.nombre||'')+' '+(perfil.apellido||''))}&photo=${encodeURIComponent(user.photoURL||'')}` ;
  return <iframe src={appUrl} style={{width:'100%',height:'100vh',border:'none',display:'block'}} title="RPG App"/>;
}
