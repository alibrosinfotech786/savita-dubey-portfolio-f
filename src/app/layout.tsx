import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Savita Dubey | Chartered Accountant & Finance Consultant",
    template: "%s | Savita Dubey",
  },
  description:
    "Savita Dubey is a Chartered Accountant, INSEAD graduate, and finance consultant specializing in Corporate Compliance, AML/KYC training, and Audit methodology.",
  keywords: ["Savita Dubey", "Chartered Accountant", "Finance Consultant", "Corporate Compliance", "AML training", "KYC advisory", "Audit training", "INSEAD Finance"],
  authors: [{ name: "Savita Dubey" }],
  creator: "Savita Dubey",
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: "https://savitadubey.com",
    title: "Savita Dubey | Finance. Compliance. Leadership.",
    description: "Expert corporate advisory and professional training for financial institutions and professionals.",
    siteName: "Savita Dubey",
  },
  twitter: {
    card: "summary_large_image",
    title: "Savita Dubey | Finance Expert",
    description: "Chartered Accountant & INSEAD Finance graduate providing corporate advisory and training.",
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
     
    ],
    apple: "/favicon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)] font-sans antialiased">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
