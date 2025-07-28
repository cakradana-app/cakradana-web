'use client';

import { useEffect, useRef } from 'react';
import { createScrollTrigger } from '@/lib/gsap-utils';
import { HelpCircle, ArrowRight, CircleQuestionMark } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const faqs = [
  {
    id: "1",
    title: "Apa itu Cakradana?",
    content: "Cakradana adalah aplikasi web bertenaga AI yang dirancang untuk meningkatkan transparansi dan akuntabilitas dalam pembiayaan pemilu. Cakradana membantu Komisi Pemilihan Umum (KPU) dan Pusat Pelaporan dan Analisis Transaksi Keuangan (PPATK) memantau donasi real-time, mendeteksi pencucian uang, dan menyediakan visualisasi jaringan donasi."
  },
  {
    id: "2",
    title: "Bagaimana Cakradana membantu kepatuhan AML dalam pembiayaan pemilu?",
    content: "Cakradana menyederhanakan kepatuhan Anti-Pencucian Uang (AML) dengan menggunakan AI dan analitik data untuk mendeteksi pola donasi mencurigakan, melacak aliran dana, dan menghasilkan Laporan Aktivitas Mencurigakan (SAR) secara otomatis sesuai standar PPATK dan FATF."
  },
  {
    id: "3",
    title: "Seberapa akurat deteksi AI di Cakradana?",
    content: "Model AI Cakradana (LightGBM) dilatih dengan puluhan ribu data transaksi dan dirancang untuk memberikan skor risiko donasi dengan akurasi lebih dari 85%, memastikan deteksi anomali yang andal dan mengurangi false positives."
  },
  {
    id: "4",
    title: "Bagaimana data donasi diinput ke Cakradana?",
    content: "Cakradana mendukung input data donasi melalui beberapa metode: formulir donasi digital (web form), formulir kertas yang diunggah dan diproses dengan OCR (Google Cloud Vision API), serta web scraping dari sumber publik yang relevan."
  },
  {
    id: "5",
    title: "Apakah data donasi di Cakradana aman dan patuh regulasi?",
    content: "Ya, Cakradana dirancang dengan standar keamanan data yang tinggi dan mematuhi peraturan perlindungan data yang berlaku di Indonesia. Seluruh proses pengolahan data dilakukan dengan cermat untuk memastikan integritas dan kerahasiaan informasi."
  }
];

export default function FAQSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll-triggered animations that wait for viewport (following FeaturesSection pattern)
    if (typeof window !== 'undefined') {
      // Animate FAQ header when it comes into view (20% from top)
      createScrollTrigger('.faq-header', 
        { 
          opacity: 1, 
          y: 0,
          duration: 1.2,
          delay: 0.2,
          ease: "power2.out"
        },
        {
          start: "top 80%", // Triggers when top of element is 80% down the viewport (20% visible)
          toggleActions: "play none none reverse"
        }
      );

      // Animate support section
      createScrollTrigger('.faq-support', 
        { 
          opacity: 1, 
          y: 0,
          duration: 1,
          delay: 0.6,
          ease: "power2.out"
        },
        {
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      );

      // Animate accordion
      createScrollTrigger('.faq-accordion', 
        { 
          opacity: 1, 
          y: 0,
          duration: 1,
          delay: 1.0,
          ease: "power2.out"
        },
        {
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      );
    }
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="faq" 
      className="py-20 md:py-24 bg-white relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-white"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Intro and Support */}
          <div className="space-y-8">
            {/* Header */}
            <div className="faq-header space-y-4">
              <div className="flex mb-4">
                <Badge className='bg-primary/10 text-primary border-primary/20'>
                  <CircleQuestionMark className="-ms-0.5 opacity-60" size={12} aria-hidden="true" />
                  FAQ
                </Badge>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium font-nohemi text-gray-900 leading-tight">
                Pertanyaan<br />Umum
              </h2>
              <p className="faq-description text-lg text-gray-700 leading-relaxed">
                Temukan jawaban atas pertanyaan-pertanyaan yang sering diajukan mengenai Cakradana dan cara kerjanya.
              </p>
            </div>

            {/* Support Section */}
            <div className="faq-support space-y-4">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-gray-700" />
                <p className="text-gray-700 font-medium">Butuh bantuan lebih lanjut?</p>
              </div>
              <Button className="bg-accent-three hover:bg-accent-three/90 text-white font-medium px-6 py-3 rounded-lg flex items-center gap-2">
                Hubungi Kami
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Right Column - FAQ Accordion */}
          <div className="faq-accordion">
            <Accordion
              type="single"
              collapsible
              className="w-full space-y-3"
              defaultValue="1"
            >
              {faqs.map((item) => (
                <AccordionItem
                  value={item.id}
                  key={item.id}
                  className="bg-gray-50 rounded-lg border-0 px-4 py-1 outline-none"
                >
                  <AccordionTrigger className="py-3 text-[15px] leading-6 hover:no-underline focus-visible:ring-0 font-semibold text-gray-900">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 ps-7 pb-3 leading-relaxed">
                    {item.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
} 