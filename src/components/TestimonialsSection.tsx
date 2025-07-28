'use client';

import { useEffect, useRef } from 'react';
import { animations, createTimeline } from '@/lib/gsap-utils';
import { Star, Quote, MessageCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

// First set of testimonials (for top marquee - moving right)
const testimonialsDataTop = [
  {
    name: "Indah Lestari",
    profile_picture: "https://randomuser.me/api/portraits/women/21.jpg",
    role: "Pejabat Pengawas Dana",
    organization: "Komisi Pemilihan Umum (KPU)",
    rating: 5,
    testimonial: "Cakradana mengubah cara kami memantau donasi. Dengan visualisasi jaringan yang jelas, kami bisa melihat aliran dana dengan mudah dan memverifikasi pengeluaran kampanye dengan lebih akurat.",
  },
  {
    name: "Budi Santoso",
    profile_picture: "https://randomuser.me/api/portraits/men/54.jpg",
    role: "Analis Investigasi",
    organization: "PPATK",
    rating: 5,
    testimonial: "Deteksi anomali AI di Cakradana sangat presisi. Kami dapat mengidentifikasi potensi pencucian uang dengan cepat dan menghasilkan Laporan Analisis Transaksi Keuangan (SAR) sesuai standar kami.",
  },
  {
    name: "Siti Aminah",
    profile_picture: "https://randomuser.me/api/portraits/women/32.jpg",
    role: "Manajer Kampanye",
    organization: "Tim Pemenangan Calon X",
    rating: 5,
    testimonial: "Fitur konfirmasi transaksi Cakradana sangat membantu. Kami bisa segera merespons notifikasi mencurigakan dan memastikan transparansi dana kampanye.",
  },
  {
    name: "Rio Pratama",
    profile_picture: "https://randomuser.me/api/portraits/men/48.jpg",
    role: "Ahli Tata Kelola Pemilu",
    organization: "Lembaga Studi Demokrasi",
    rating: 5,
    testimonial: "Cakradana adalah langkah maju yang signifikan untuk integritas pemilu di Indonesia. Pendekatan berbasis data dan AI adalah kunci untuk pembiayaan yang lebih bersih.",
  },
  {
    name: "Lia Rahmawati",
    profile_picture: "https://randomuser.me/api/portraits/women/62.jpg",
    role: "Koordinator AML",
    organization: "PPATK",
    rating: 5,
    testimonial: "Kemampuan Cakradana untuk mengintegrasikan data dari formulir fisik dan digital, ditambah dengan web scraping, memberikan gambaran yang sangat lengkap. Ini mempermudah pekerjaan investigasi kami.",
  },
];

// Second set of testimonials (for bottom marquee - moving left)
const testimonialsDataBottom = [
  {
    name: "Bayu Wijaya",
    profile_picture: "https://randomuser.me/api/portraits/men/33.jpg",
    role: "Ketua Divisi Keuangan",
    organization: "Komisi Pemilihan Umum (KPU)",
    rating: 5,
    testimonial: "Cakradana sangat user-friendly. Tim kami dengan cepat beradaptasi dan sekarang memiliki kontrol yang lebih baik atas pelaporan donasi dan pengeluaran.",
  },
  {
    name: "Kevin Chandra",
    profile_picture: "https://randomuser.me/api/portraits/men/23.jpg",
    role: "Calon Legislatif",
    organization: "Partai Politik",
    rating: 5,
    testimonial: "Sebagai calon, saya sangat menghargai kemudahan dalam melaporkan donasi. Cakradana membantu saya memenuhi standar transparansi yang diharapkan pemilih.",
  },
  {
    name: "Fajar Kusumo",
    profile_picture: "https://randomuser.me/api/portraits/men/90.jpg",
    role: "Spesialis Anti Pencucian Uang",
    organization: "PPATK",
    rating: 5,
    testimonial: "Penilaian risiko real-time Cakradana adalah fitur game-changer. Kami dapat memprioritaskan kasus dengan efisiensi yang belum pernah ada sebelumnya.",
  },
  {
    name: "Gita Permata",
    profile_picture: "https://randomuser.me/api/portraits/women/18.jpg",
    role: "Staf Verifikasi",
    organization: "KPU Provinsi X",
    rating: 4,
    testimonial: "Akurasi OCR Cakradana untuk formulir kertas sangat baik. Ini mengurangi beban kerja manual dan mempercepat proses verifikasi data donasi.",
  },
  {
    name: "Jaka Maulana",
    profile_picture: "https://randomuser.me/api/portraits/men/41.jpg",
    role: "Direktur Eksekutif",
    organization: "Koalisi Masyarakat Anti Korupsi",
    rating: 5,
    testimonial: "Melihat alat seperti Cakradana digunakan dalam pemilu memberi kami harapan besar untuk proses yang lebih bersih dan bertanggung jawab.",
  },
  {
    name: "Maria Simanjuntak",
    profile_picture: "https://randomuser.me/api/portraits/women/41.jpg",
    role: "Peneliti Kebijakan Finansial",
    organization: "PPATK",
    rating: 5,
    testimonial: "Data yang disajikan Cakradana mendukung analisis kami secara signifikan. Laporan yang dihasilkan sangat membantu dalam penyusunan rekomendasi kebijakan.",
  },
];

interface TestimonialProps {
  testimonial: {
    name: string;
    profile_picture: string;
    role: string;
    organization: string;
    rating: number;
    testimonial: string;
  };
}

const TestimonialCard: React.FC<TestimonialProps> = ({ testimonial }) => {
  // Keywords related to election funding/AML to highlight
  const keywordsToHighlight = [
    "transparansi",
    "akuntabilitas",
    "donasi",
    "pemilu",
    "kampanye",
    "AI",
    "deteksi",
    "pencucian uang",
    "AML",
    "KPU",
    "PPATK",
    "verifikasi",
    "laporan",
    "jaringan",
    "anomali",
    "integrasi",
    "OCR",
    "web scraping",
    "konfirmasi",
    "korupsi",
    "real-time",
    "visualisasi",
    "SAR",
    "investigasi",
    "transaksi",
    "mencurigakan",
    "integritas",
    "pembiayaan",
    "kampanye",
    "pelaporan",
    "standar",
    "analisis",
    "data",
    "formulir",
    "fisik",
    "digital",
    "user-friendly",
    "calon",
    "legislatif",
    "partai",
    "politik",
    "pemilih",
    "risiko",
    "efisiensi",
    "akurasi",
    "manual",
    "proses",
    "bersih",
    "bertanggung jawab",
    "kebijakan",
    "rekomendasi",
  ];

  // Function to highlight keywords in text
  const highlightKeyword = (text: string) => {
    const foundKeyword = keywordsToHighlight.find((keyword) =>
      text.toLowerCase().includes(keyword.toLowerCase())
    );

    if (!foundKeyword) return text;

    const regex = new RegExp(`(${foundKeyword})`, 'gi');
    const parts = text.split(regex);

    return (
      <>
        {parts.map((part, index) => 
          part.toLowerCase() === foundKeyword.toLowerCase() ? (
            <span key={index} className="text-blue-600 font-medium">{part}</span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <Card className="min-w-[380px] max-w-[420px] mx-4 shadow-sm rounded-3xl overflow-hidden bg-white flex flex-col h-full border-0">
      <CardContent className="pt-8 pb-6 px-7 flex flex-col justify-between h-full">
        <div>
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
            <Quote className="text-blue-500" size={24} />
          </div>

          <p className="text-gray-700 text-base leading-relaxed mb-6 whitespace-normal">
            &ldquo;{highlightKeyword(testimonial.testimonial)}&rdquo;
          </p>
        </div>

        <div>
          <div className="h-px bg-gray-200 my-4"></div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 relative rounded-full overflow-hidden">
                <Image
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                  src={testimonial.profile_picture}
                  width={48}
                  height={48}
                />
              </div>
              <div className="ml-3">
                <div className="font-semibold text-gray-900">
                  {testimonial.name}
                </div>
                <div className="text-gray-600 text-sm">
                  {testimonial.role}
                </div>
                <div className="text-blue-600 text-sm font-medium">
                  {testimonial.organization}
                </div>
              </div>
            </div>

            <div className="flex gap-1">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  className={
                    i < testimonial.rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-gray-200 text-gray-200"
                  }
                  size={16}
                />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = createTimeline({ delay: 0.3 });
    
    tl.add(animations.fadeIn('.testimonials-headline', { duration: 1 }))
      .add(animations.fadeIn('.testimonials-description', { duration: 0.8 }), '-=0.5');

  }, []);

  return (
    <section 
      ref={sectionRef}
      id="testimonials" 
      className="py-20 relative overflow-hidden -mt-60"
    >
      {/* Pure white base background */}
      <div className="absolute inset-0 bg-white z-0" />

      {/* Light blue content area with inset margins for smooth transition */}
      <div className="absolute inset-x-0 top-[60px] bottom-[60px] bg-blue-50/90 z-0" />

      {/* Top transition - subtle gradient from white to blue */}
      <div className="absolute top-0 left-0 right-0 h-[80px] bg-gradient-to-b from-white to-blue-50/90 z-0" />

      {/* Bottom transition - subtle gradient from blue to white */}
      <div className="absolute bottom-0 left-0 right-0 h-[80px] bg-gradient-to-t from-white to-blue-50/90 z-0" />

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-10 w-32 h-32 bg-blue-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-10 w-48 h-48 bg-blue-300/20 rounded-full blur-3xl"></div>

      {/* Title content */}
      <div className="max-w-5xl mx-auto text-center relative z-10 mb-16 md:mb-20">
        <div className="flex justify-center mb-4">
          <Badge className='bg-blue-100 text-blue-700 border-blue-200'>
            <MessageCircle className="-ms-0.5 opacity-60" size={12} aria-hidden="true" />
            Ulasan Pengguna
          </Badge>
        </div>
        <h2 className="testimonials-headline text-3xl md:text-5xl lg:text-6xl font-medium font-nohemi text-gray-900 mb-6">
          Dukungan untuk Integritas Pemilu: Ulasan Pengguna Cakradana
        </h2>
        <p className="testimonials-description text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Dipercaya oleh KPU, PPATK, dan Tim Kampanye untuk transparansi dan akuntabilitas pembiayaan pemilu
        </p>
      </div>

      {/* Marquee content container */}
      <div className="relative z-10">
        {/* First row - moving right - with first set of testimonials */}
        <div className="mb-12 -mx-4">
          <div className="flex animate-marquee">
            {[...testimonialsDataTop, ...testimonialsDataTop].map(
              (testimonial, idx) => (
                <div
                  key={`${testimonial.name}-${idx}`}
                  className="whitespace-normal"
                >
                  <TestimonialCard testimonial={testimonial} />
                </div>
              )
            )}
          </div>
        </div>

        {/* Second row - moving left - with second set of testimonials */}
        <div className="-mx-4">
          <div className="flex animate-marquee-reverse">
            {[...testimonialsDataBottom, ...testimonialsDataBottom].map(
              (testimonial, idx) => (
                <div
                  key={`${testimonial.name}-reverse-${idx}`}
                  className="whitespace-normal"
                >
                  <TestimonialCard testimonial={testimonial} />
                </div>
              )
            )}
          </div>
        </div>
      </div>


    </section>
  );
} 