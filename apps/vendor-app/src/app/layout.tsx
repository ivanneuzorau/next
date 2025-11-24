import './global.css';
import { ThemeProvider } from '@sk8-workspace/shared-ui';
import Script from 'next/script';
import '../types/web-components';

export const metadata = {
  title: 'Amazing Vendor 1 App Using Sk8',
  description: 'Vendor App with Embedded Sk8 Pipelines',
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
        <ThemeProvider theme="blue">{children}</ThemeProvider>
      </body>
    </html>
  );
}
