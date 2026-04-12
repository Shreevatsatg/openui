import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import { CentralNavigation } from "@/components/CentralNavigation";
import { Navbar } from "@/components/Navbar";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OpenUI - Community Driven React Components",
  description: "Browse, preview, copy, and submit reusable React components.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: "dark" }} suppressHydrationWarning>
      <head>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background text-foreground font-sans antialiased flex flex-col`}
      >
        <AuthProvider>
          <CentralNavigation>
            <Navbar />
            <main className="flex-1 flex flex-col">{children}</main>
          </CentralNavigation>
        </AuthProvider>
      </body>
    </html>
  );
}
