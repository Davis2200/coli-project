import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coli - Experiencias Auténticas",
  description: "Descubre y recomienda los mejores lugares con Coli.",
  manifest: "/manifest.json", 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="antialiased">
      <body className={`${inter.className} min-h-screen pb-16 flex flex-col bg-background text-foreground`}>
        <Header />
        <main className="max-w-md mx-auto sm:max-w-full w-full flex-grow">
          {children}
        </main>
      </body>
    </html>
  );
}
