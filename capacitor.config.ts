import type { CapacitorConfig } from '@capacitor/cli';

// Para un APK de prueba: CAP_SERVER_URL=https://<preview>.vercel.app npx cap sync android
const serverUrl = process.env.CAP_SERVER_URL || 'https://licdiegoviglione.com.ar';

const config: CapacitorConfig = {
  appId: 'com.rpgviglione.app',
  appName: 'RPG & NEURO',
  webDir: 'public',
  server: {
    url: serverUrl,
    cleartext: false
  }
};

export default config;
