import './globals.css';
import type { Metadata } from 'next';
import Providers from '@/components/Providers';
import Nav from '@/components/Nav';

export const metadata: Metadata = {
  title: "Matt's Markets",
  description: "The world's most transparent predictive marketplace.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 min-h-screen font-sans">
        <Providers>
          <Nav />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
