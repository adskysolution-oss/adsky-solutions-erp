import './globals.css';
import { generateCSSVariables } from '@/lib/theme/ThemeRegistry';

export const metadata = {
  title: 'AD Sky Solution',
  description: 'Delivering expert IT consulting, software development, and professional staffing solutions for growing businesses.',
};

const DEFAULT_THEME = {
  primary: '#2563EB',
  secondary: '#F97316',
  success: '#22C55E',
  danger: '#EF4444',
  warning: '#FACC15',
  dark: '#0F172A',
  light: '#F8FAFC',
  background: '#F8FAFC',
  foreground: '#0F172A',
  radius: 1.5,
};

import connectToDatabase from '@/utils/db';
import WebsiteConfig from '@/models/WebsiteConfig';

async function getThemeConfig() {
  try {
    await connectToDatabase();
    const config = await WebsiteConfig.findOne();
    return config?.themeConfig || DEFAULT_THEME;
  } catch (err) {
    // Fallback if DB is not reachable
    return DEFAULT_THEME;
  }
}


export default async function RootLayout({ children }) {
  const theme = await getThemeConfig();
  const cssVariables = generateCSSVariables(theme);

  return (
    <html lang="en">
      <head>
        <style dangerouslySetInnerHTML={{ __html: `:root { ${cssVariables} }` }} />
      </head>
      <body className="antialiased selection:bg-primary/20 transition-all duration-300">
        {children}
      </body>
    </html>
  );
}
