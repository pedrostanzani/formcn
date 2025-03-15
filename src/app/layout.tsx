import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/header";
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
  title:
    "formcn | Build beautiful forms with shadcn/ui, React Hook Form and Zod",
  description:
    "Use AI to build beautiful forms with shadcn/ui, React Hook Form and Zod.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextTopLoader color="#f59e0b" showSpinner={false} />
        <div className="flex min-h-screen flex-col">
          <Header />
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
