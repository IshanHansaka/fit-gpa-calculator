import type { Metadata } from 'next';
import './globals.css';
import Script from 'next/script';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Theme from '../components/Theme';
import Arrow from '../components/Arrow';
import InitialModal from '@/components/InitialModal';
import { Providers } from './providers';

export const metadata: Metadata = {
  manifest: '/manifest.json',
  metadataBase: new URL('https://fit-gpa-calculator.vercel.app'),
  title: {
    default: 'FIT GPA Calculator | University of Moratuwa',
    template: '%s | FIT GPA Calculator',
  },
  description:
    'GPA Calculator for Faculty of IT – University of Moratuwa: Easily calculate your GPA, SGPA, and OGPA. View class standings, grade scales, and academic instructions. Save your results in-browser for quick access!',
  twitter: {
    card: 'summary_large_image',
  },
  openGraph: {
    title: 'FIT GPA Calculator',
    description:
      'GPA Calculator for Faculty of IT – University of Moratuwa: Easily calculate GPA, SGPA, and OGPA with grade/class guidance and local saving.',
    url: 'https://fit-gpa-calculator.vercel.app/',
    siteName: 'FIT GPA Calculator',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'FIT GPA Calculator Preview',
      },
    ],
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <title>FIT GPA Calculator | University of Moratuwa</title>
        <meta
          property="og:image"
          content="https://fit-gpa-calculator.vercel.app/opengraph-image.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="FIT GPA Calculator preview image"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://fit-gpa-calculator.vercel.app/" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-gradient-to-r from-blue-100 via-purple-100 to-cyan-50 dark:bg-gradient-to-r dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 mx-auto pt-10 pb-7 relative" suppressHydrationWarning>
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'FIT GPA Calculator',
              url: 'https://fit-gpa-calculator.vercel.app/',
              applicationCategory: 'EducationApplication',
              operatingSystem: 'All',
              creator: {
                '@type': 'Organization',
                name: 'Faculty of Information Technology, University of Moratuwa',
              },
            }),
          }}
        />
        <Providers>
          <InitialModal />
          <Theme />
          <Arrow />
          <div className="max-w-7xl mx-auto px-4 md:px-4">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
