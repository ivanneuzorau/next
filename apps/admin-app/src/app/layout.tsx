import './global.css';
import { ThemeProvider } from '@sk8-workspace/shared-ui';

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
        <ThemeProvider theme="green">{children}</ThemeProvider>
      </body>
    </html>
  );
}
