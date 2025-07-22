import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StagewiseToolbar } from "@stagewise/toolbar-next";
import ReactPlugin from "@stagewise-plugins/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dextektif - Protecting Indonesia's Digital Financial Ecosystem",
  description:
    "Dextektif is an AI-powered solution for real-time on-chain analysis, helping regulators and crypto businesses detect, monitor, and prevent money laundering in decentralized exchanges like Jupiter, Raydium, and Pump.fun.",
  keywords: [
    "Dextektif",
    "Anti-Money Laundering",
    "AML",
    "Blockchain Analytics",
    "On-Chain Analysis",
    "Solana",
    "Decentralized Exchanges",
    "Crypto Compliance",
    "Indonesia Financial Services",
    "OJK",
    "Memecoin Trading",
  ],
  authors: [{ name: "Dextektif Team" }],
  viewport: "width=device-width, initial-scale=1.0",
  robots: "index, follow",
  openGraph: {
    title: "Dextektif | Protecting Indonesia's Digital Financial Ecosystem",
    description:
      "AI-powered on-chain analysis for regulators and crypto businesses to combat financial crime in decentralized exchanges.",
    url: "https://dextektif.com",
    images: [
      {
        url: "https://dextektif.com/og-image.jpg", 
        width: 1200,
        height: 630,
        alt: "Dextektif Dashboard Preview",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={metadata.description || ""} />
        <meta name="keywords" content={Array.isArray(metadata.keywords) ? metadata.keywords.join(", ") : metadata.keywords || ""} />
        <meta name="author" content={Array.isArray(metadata.authors) ? metadata.authors[0]?.name : metadata.authors?.name || ""} />
        <meta name="robots" content={typeof metadata.robots === 'string' ? metadata.robots : ""} />
        <meta property="og:title" content={typeof metadata.openGraph?.title === 'string' ? metadata.openGraph.title : ""} />
        <meta
          property="og:description"
          content={metadata.openGraph?.description || ""}
        />
        <meta property="og:url" content={metadata.openGraph?.url?.toString() || ""} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://dextektif.com/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Dextektif Dashboard Preview" />
        <title>{typeof metadata.title === 'string' ? metadata.title : ""}</title>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <StagewiseToolbar
          config={{
            plugins: [ReactPlugin],
          }}
        />
      </body>
    </html>
  );
}