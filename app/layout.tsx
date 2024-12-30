import type { Metadata } from 'next';
import './globals.css';

import Header from './component/Header';
import Footer from './component/Footer';

export const metadata: Metadata = {
  title: 'FIT-GPA-Calculator',
  description:
    'GPA Calculator of Faculty of Information Technology, University of Moratuwa',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-gradient-to-r from-blue-100 via-purple-100 to-cyan-50 dark:bg-gradient-to-r bg dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 mx-auto pt-10 pb-7">
        <div className="max-w-7xl mx-auto px-4 md:px-4">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
