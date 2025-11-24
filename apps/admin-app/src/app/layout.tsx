import './global.css';
import { ThemeProvider } from '@sk8-workspace/shared-ui';
import Script from 'next/script';
import '../types/web-components';

export const metadata = {
  title: 'SK8 Admin',
  description: 'SK8 Admin - Multi-tenant Pipeline Management',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Script
          src="https://cdn.tailwindcss.com"
          strategy="beforeInteractive"
        />
        <ThemeProvider theme="green">{children}</ThemeProvider>
      </body>
    </html>
  );
}
