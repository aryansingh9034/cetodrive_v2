// app/layout.js (your existing file)
import { Geist, Geist_Mono, Montserrat, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "./components/Header.js";
import Footer from "./components/Footer";

// Font configurations (keep your existing font setup)
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

export const metadata = {
  title: "Car Rentals",
  description: "Car Rentals",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${montserrat.variable} font-sans`}> 
      <body
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          ${spaceGrotesk.variable} 
          antialiased
        `}
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}