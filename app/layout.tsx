import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GoogleAnalytics } from "@/components/Analytics";
import { Providers } from "@/components/Providers";
import { JsonLd } from "@/components/JsonLd";
import { generateOrganizationSchema, generateWebsiteSchema } from "@/lib/seo/schema";
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
  title: {
    default: "Casino Guide - Best Online Casinos & Bonuses",
    template: "%s | Casino Guide",
  },
  description: "Discover the best online casinos with expert reviews, exclusive bonuses, and trusted ratings.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-background text-foreground`}
      >
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
        <Analytics />
        <GoogleAnalytics />
        <JsonLd data={[generateOrganizationSchema(), generateWebsiteSchema()]} />
      </body>
    </html>
  );
}
