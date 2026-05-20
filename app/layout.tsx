import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/nav-bar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GratacaAI — AI for Coding Only",
  description:
    "GratacaAI is a black & white coding-focused AI with a built-in model picker.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NavBar />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-white/10">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-6 text-sm text-white/60">
            <span>© {new Date().getFullYear()} GratacaAI</span>
            <span className="font-mono">Black • White • Code</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
