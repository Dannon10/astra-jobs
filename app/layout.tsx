import type { Metadata } from "next";
import "./globals.css";
import './theme.css';
import { Inter } from 'next/font/google';
import Footer from "@/components/Footer";


const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: "Astra | Job Search App",
  description: "Search for jobs and find your dream job with Astra",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body>
        {/* <NavBar /> */}
        {children}
        <Footer/>
      </body>
    </html>
  );
}