import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConditionalNavbar from "@/components/ConditionalNavbar";
import { LoadingProvider } from "@/lib/loading-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cakradana - Transparansi Pembiayaan Pemilu di Indonesia",
  description:
    "Cakradana adalah aplikasi web inovatif yang meningkatkan transparansi dan akuntabilitas pembiayaan pemilu di Indonesia. Memantau donasi secara real-time, mendeteksi pencucian uang menggunakan AI, dan memvisualisasikan jaringan donasi untuk KPU dan PPATK.",
  keywords: [
    "Cakradana",
    "Pembiayaan Pemilu",
    "Anti-Pencucian Uang",
    "AML Pemilu",
    "Korupsi Pemilu",
    "Transparansi Donasi",
    "Akuntabilitas Pemilu",
    "KPU",
    "PPATK",
    "Pemilu Indonesia",
    "Donasi Politik",
    "Visualisasi Jaringan",
    "Deteksi Anomali AI",
  ],
  authors: [{ name: "Tim Cakradana" }],
  viewport: "width=device-width, initial-scale=1.0",
  robots: "index, follow",
  openGraph: {
    title: "Cakradana | Transparansi Pembiayaan Pemilu di Indonesia",
    description:
      "Aplikasi web AI-powered untuk memantau donasi pemilu, mendeteksi pencucian uang, dan menyediakan visualisasi jaringan untuk KPU dan PPATK.",
    url: "https://cakradana.com",
    images: [
      {
        url: "https://cakradana.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Cakradana Dashboard Preview",
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
    <html lang="id" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content={metadata.description || ""}
        />
        <meta
          name="keywords"
          content={
            Array.isArray(metadata.keywords)
              ? metadata.keywords.join(", ")
              : metadata.keywords || ""
          }
        />
        <meta
          name="author"
          content={
            Array.isArray(metadata.authors)
              ? metadata.authors[0]?.name
              : metadata.authors?.name || ""
          }
        />
        <meta
          name="robots"
          content={typeof metadata.robots === "string" ? metadata.robots : ""}
        />

        {/* Open Graph Meta Tags */}
        <meta
          property="og:title"
          content={typeof metadata.openGraph?.title === "string" ? metadata.openGraph.title : ""}
        />
        <meta
          property="og:description"
          content={metadata.openGraph?.description || ""}
        />
        <meta
          property="og:url"
          content={metadata.openGraph?.url?.toString() || ""}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content={
            Array.isArray(metadata.openGraph?.images) &&
            metadata.openGraph?.images.length > 0
              ? (metadata.openGraph.images[0] as { url?: string })?.url || String(metadata.openGraph.images[0])
              : "https://cakradana.com/og-image.jpg"
          }
        />
        <meta
          property="og:image:width"
          content={
            Array.isArray(metadata.openGraph?.images) &&
            metadata.openGraph?.images.length > 0
              ? (metadata.openGraph.images[0] as { width?: number })?.width?.toString() || "1200"
              : "1200"
          }
        />
        <meta
          property="og:image:height"
          content={
            Array.isArray(metadata.openGraph?.images) &&
            metadata.openGraph?.images.length > 0
              ? (metadata.openGraph.images[0] as { height?: number })?.height?.toString() || "630"
              : "630"
          }
        />
        <meta
          property="og:image:alt"
          content={
            Array.isArray(metadata.openGraph?.images) &&
            metadata.openGraph?.images.length > 0
              ? (metadata.openGraph.images[0] as { alt?: string })?.alt || "Cakradana Dashboard Preview"
              : "Cakradana Dashboard Preview"
          }
        />

        <title>{typeof metadata.title === "string" ? metadata.title : ""}</title>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LoadingProvider>
          <ConditionalNavbar />
          {children}
        </LoadingProvider>
      </body>
    </html>
  );
}