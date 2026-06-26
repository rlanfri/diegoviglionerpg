'use client';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function DashboardPage() {
  const { user, perfil, loading, logout } = useAuth();
  const router = useRouter();
  const iframeRef = useRef(null);

  useEffect(() => { if (loading) return; if (!user || !perfil) router.replace('/'); }, [user, perfil, loading]);

  useEffect(() => {
    const handler = (e) => { if (e.data?.type === 'logout') { logout(); router.replace('/'); } };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  // Ajustar la altura del iframe al alto REAL visible (excluye la barra del browser en iOS)
  useEffect(() => {
    function setHeight() {
      const h = window.innerHeight;
      if (iframeRef.current) iframeRef.current.style.height = h + 'px';
      document.documentElement.style.height = h + 'px';
      document.body.style.height = h + 'px';
      document.body.style.margin = '0';
      document.body.style.overflow = 'hidden';
    }
    setHeight();
    window.addEventListener('resize', setHeight);
    window.addEventListener('orientationchange', () => setTimeout(setHeight, 100));
    if (window.visualViewport) window.visualViewport.addEventListener('resize', setHeight);
    return () => {
      window.removeEventListener('resize', setHeight);
      if (window.visualViewport) window.visualViewport.removeEventListener('resize', setHeight);
    };
  }, [perfil]);

  if (loading || !perfil) return <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh'}}><p style={{color:'#6b7280'}}>Cargando...</p></div>;

  const appUrl = `/rpg/index.html?uid=${user.uid}&rol=${perfil.rol}&nombre=${encodeURIComponent((perfil.nombre||'')+' '+(perfil.apellido||''))}&photo=${encodeURIComponent(user.photoURL||'')}`;

  return (
    <iframe
      ref={iframeRef}
      src={appUrl}
      style={{
        width: '100%',
        height: '100dvh',
        border: 'none',
        display: 'block',
        position: 'fixed',
        top: 0,
        left: 0,
      }}
      title="RPG App"
    />
  );
}
