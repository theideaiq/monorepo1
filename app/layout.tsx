import type { Metadata } from "next";
import { Poppins, Cairo } from "next/font/google"; // Import Cairo
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToastProvider from "@/components/providers/ToastProvider";
import GlobalLoader from "@/components/ui/GlobalLoader";

// 1. Setup Poppins (English)
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

// 2. Setup Cairo (Arabic)
const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  title: "The IDEA IQ",
  description: "Innovation for Every Aspect of Life",
};

export default function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // 3. Determine direction based on locale
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale || 'en'} dir={dir}>
      <body className={`
        ${poppins.variable} ${cairo.variable} 
        font-sans antialiased bg-slate-50
      `}>
        <GlobalLoader />
        <ToastProvider />
        {/* We pass locale to Navbar so it knows which language to show */}
        <Navbar locale={locale} /> 
        <div className={dir === 'rtl' ? 'font-arabic' : 'font-sans'}>
            {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
