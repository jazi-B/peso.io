import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { siteConfig } from "@/config/site";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ["Pest Control", "Fumigation", "Termite Control", "Disinfectant", "Rodent Control", "Pest Removal"],
  authors: [{ name: "Peso.io" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://peso.my",
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <ThemeProvider>
          <Navbar />
          <main style={{ flex: 1 }}>
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
          <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 2000 }}>
            <ThemeToggle />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
