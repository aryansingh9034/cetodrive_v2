import { Geist, Geist_Mono, Montserrat, Space_Grotesk } from "next/font/google";
import "./globals.css";

// Font configurations
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  weight: ['400', '500', '700'], // Added 500 for medium weight
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap', // Better font loading behavior
});

const spaceGrotesk = Space_Grotesk({
  weight: ['400', '700'], // Added 400 for regular weight
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
        {children}
      </body>
    </html>
  );
}