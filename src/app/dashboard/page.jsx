'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function DashboardPage() {
  const { user, perfil, loading, logout } = useAuth();
  const router = useRouter();
  const iframeRef = useRef(null);
  const [iframeListo, setIframeListo] = useState(false);
  // Por las dudas: si el iframe tarda demasiado en avisar, sacamos la pantalla de carga igual
  useEffect(() => { if (!perfil) return; const t = setTimeout(() => setIframeListo(true), 10000); return () => clearTimeout(t); }, [perfil]);

  useEffect(() => { if (loading) return; if (!user || !perfil) router.replace('/'); }, [user, perfil, loading]);

  useEffect(() => {
    const handler = async (e) => {
      if (e.data?.type !== 'logout') return;
      try { await logout(); } catch (err) { console.error('[LOGOUT]', err); }
      window.location.replace('/');
    };
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

  const pantallaCarga = (
    <div style={{ position: 'fixed', inset: 0, zIndex: 2, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 14, fontFamily: 'system-ui,-apple-system,sans-serif', color: '#6b7280' }}>
      <img src="/icon-192.png" width={72} height={72} alt="" style={{ borderRadius: 16 }} />
      <div style={{ fontSize: 15 }}>Cargando…</div>
    </div>
  );
  if (loading || !perfil) return pantallaCarga;

  const appUrl = `/rpg/index.html?uid=${user.uid}&rol=${perfil.rol}&nombre=${encodeURIComponent((perfil.nombre||'')+' '+(perfil.apellido||''))}&photo=${encodeURIComponent(user.photoURL||'')}&docid=${encodeURIComponent(perfil._docId||'')}&dn=${encodeURIComponent(perfil.nombre||'')}`;

  return (
    <>
    {!iframeListo && pantallaCarga}
    <iframe
      onLoad={() => setIframeListo(true)}
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
    </>
  );
}
