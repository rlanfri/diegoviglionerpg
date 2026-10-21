import './globals.css';
export const metadata = {
  manifest: '/manifest.json',
  icons: { apple: '/apple-touch-icon.png' },
  appleWebApp: { capable: true, title: 'RPG & NEURO', statusBarStyle: 'default' }, title: 'RPG & NEURO - Lic. Diego Viglione' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body style={{margin:0,padding:0}}>{children}</body>
    </html>
  );
}
