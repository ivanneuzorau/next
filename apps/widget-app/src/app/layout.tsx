import './global.css';
import Script from 'next/script';

export const metadata = {
  title: 'SK8 Pipelines Widget',
  description: 'Embeddable SK8 Pipelines Widget',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <Script
          src="https://cdn.tailwindcss.com"
          strategy="beforeInteractive"
        />
        {children}
      </body>
    </html>
  );
}
