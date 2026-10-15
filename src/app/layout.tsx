import type { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevMate AI \u2014 Asisten Coding Berbasis AI",
  description:
    "Asisten coding berbasis Google Gemini yang membantu developer Indonesia memahami error, menganalisis kode, dan menemukan solusi teknis.",
  keywords: ["AI coding assistant", "Google Gemini", "analisis error", "review kode", "developer Indonesia"],
  authors: [{ name: "DevMate AI" }],
  robots: "noindex, nofollow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
