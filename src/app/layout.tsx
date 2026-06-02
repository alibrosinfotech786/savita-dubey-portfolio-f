import type { Metadata } from "next";
import { Inter, Playfair_Display, Geist } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import PublicShell from "@/components/PublicShell";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
  metadataBase: new URL("https://savitadubey.com"),
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

import PlatformCheck from "@/components/PlatformCheck";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cn(inter.variable, playfair.variable, "font-sans", geist.variable)} suppressHydrationWarning>
      <body 
        className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)] font-sans antialiased"
        suppressHydrationWarning
      >
        <ThemeProvider>
          <TooltipProvider>
            <PlatformCheck>
              <PublicShell>{children}</PublicShell>
            </PlatformCheck>
            <Toaster richColors position="top-right" />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
