import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

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
    url: "https://cakradana.com", // Ganti dengan URL domain Cakradana jika sudah ada
    images: [
      {
        url: "https://cakradana.com/og-image.jpg", // Pastikan Anda memiliki gambar OG baru untuk Cakradana
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
        {/*
          Untuk metadata, cara terbaik di Next.js 13+ adalah dengan mengandalkan `metadata` object di atas.
          Next.js akan secara otomatis menambahkan tag-tag ini ke `<head>` pada saat build atau runtime.
          Menambahkan tag meta secara manual di sini bisa redundan atau bahkan menyebabkan masalah jika tidak sinkron.
          Namun, jika Anda memiliki alasan khusus untuk menempatkannya di sini (misalnya untuk keperluan debugging atau override),
          maka boleh saja, tapi sebaiknya disederhanakan.

          Untuk hackathon, pendekatan langsung seperti yang Anda miliki saat ini cukup baik,
          meskipun ada beberapa redudansi (misalnya title di metadata dan di head).
          Saya akan mempertahankan struktur asli Anda tetapi dengan nilai-nilai Cakradana.
        */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content={metadata.description || ""} // Menggunakan deskripsi dari objek metadata
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

        {/* Open Graph Meta Tags (untuk media sosial) */}
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
              : "https://cakradana.com/og-image.jpg" // Fallback jika array images kosong
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
        <Navbar />
        {children}
        {/* Pertimbangkan apakah StagewiseToolbarWrapper masih diperlukan.
            Jika itu adalah komponen khusus untuk proyek sebelumnya yang tidak relevan,
            Anda mungkin ingin menghapusnya atau menggantinya dengan sesuatu yang relevan
            untuk Cakradana (misalnya, footer atau debug toolbar jika ada).
        */}
      </body>
    </html>
  );
}