import type { Metadata } from "next";
import "./globals.css";

import Header from "./component/Header";
import Footer from "./component/Footer";
import Theme from "./component/Theme";
import Arrow from "./component/Arrow";

export const metadata: Metadata = {
  title: "FIT GPA Calculator",
  description:
    "GPA Calculator, Faculty of Information Technology, University of Moratuwa",
  openGraph: {
    title: "FIT GPA Calculator",
    description:
      "Easily calculate your GPA based on the Faculty of IT, University of Moratuwa's grading system.",
    url: "https://yourwebsite.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FIT GPA Calculator",
    description:
      "Calculate and plan your GPA performance for better academic results.",
    site: "@yourtwitterhandle",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <body className="bg-gradient-to-r from-indigo-100 via-violet-100 to-purple-50 dark:bg-gradient-to-r dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 mx-auto pt-10 pb-7 relative">
        <Theme />
        <Arrow />
        <div className="max-w-7xl mx-auto px-4 md:px-4">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
