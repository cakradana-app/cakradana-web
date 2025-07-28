'use client';

import { useEffect, useRef } from 'react';
import { animations } from '@/lib/gsap-utils';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Star, Banknote } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const accessLevels = [
  {
    name: "Akses KPU (Dasar)",
    price: "Gratis",
    period: "Untuk Demo",
    description: "Ideal untuk staf KPU di tingkat provinsi/kabupaten.",
    features: [
      "Unggah donasi via formulir digital",
      "Pemantauan donasi dasar",
      "Visualisasi jaringan donasi (terbatas)",
      "Akses laporan dana standar",
      "Dukungan email"
    ],
    popular: false,
    color: "border-gray-200"
  },
  {
    name: "Akses KPU & PPATK (Penuh)",
    price: "Hubungi Kami",
    period: "",
    description: "Solusi komprehensif untuk pengawasan tingkat nasional.",
    features: [
      "Unggah donasi via formulir digital & OCR",
      "Pemantauan donasi real-time & advance",
      "Deteksi anomali AI & skor risiko",
      "Visualisasi jaringan donasi interaktif",
      "Laporan SAR sesuai PPATK/FATF",
      "Dashboard kandidat & verifikasi transaksi",
      "Dukungan prioritas"
    ],
    popular: true,
    color: "border-accent-three"
  },
  {
    name: "Akses Kandidat",
    price: "Gratis",
    period: "",
    description: "Untuk kandidat/penerima donasi agar patuh dan transparan.",
    features: [
      "Input donasi via formulir kertas/digital",
      "Notifikasi transaksi mencurigakan",
      "Konfirmasi/pelaporan transaksi via dashboard",
      "Pelaporan dana kampanye dasar",
      "Dukungan via email"
    ],
    popular: false,
    color: "border-gray-200"
  }
];

export default function PricingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Set initial state for all pricing cards
    gsap.set('.pricing-card', { 
      opacity: 0, 
      y: 80, 
      scale: 0.9,
      transformOrigin: "center center"
    });

    // Create timeline for pricing animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%", // Trigger when section is 15% into viewport
        end: "bottom 20%", // End when section bottom is 20% from top
        toggleActions: "play none none reverse"
      }
    });
    
    // Animate header elements first
    tl.add(animations.fadeIn('.pricing-headline', { duration: 1 }))
      .add(animations.fadeIn('.pricing-description', { duration: 0.8 }), '-=0.5')
      // Animate all pricing cards with stagger
      .to('.pricing-card', {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: {
          amount: 0.6, // Total stagger duration
          ease: "power2.out"
        },
        ease: "back.out(1.2)"
      }, '-=0.3');

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="pricing" 
      className="py-20 md:py-20 bg-white relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-white"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="flex justify-center mb-4">
            <Badge className='bg-primary/10 text-primary border-accent-three/20'>
              <Banknote className="-ms-0.5 opacity-60" size={12} aria-hidden="true" />
              Solusi
            </Badge>
          </div>
          <h2 className="pricing-headline text-3xl md:text-5xl lg:text-6xl font-medium font-nohemi text-gray-900 mb-6">
            Pilihan Akses Cakradana: Wujudkan Pemilu Transparan
          </h2>
          <p className="pricing-description text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Cakradana menawarkan tingkat akses yang disesuaikan untuk kebutuhan Komisi Pemilihan Umum (KPU), Pusat Pelaporan dan Analisis Transaksi Keuangan (PPATK), serta kandidat pemilu.
          </p>
        </div>

        {/* Access Level Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {accessLevels.map((level, index) => (
            <Card 
              key={index}
              className={`pricing-card relative hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm flex flex-col ${
                level.popular 
                  ? 'ring-2 ring-accent-three/20 scale-105 h-full md:h-[600px]' 
                  : 'h-full md:h-[520px] md:mt-10'
              }`}
            >
              {/* Popular Badge */}
              {level.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-accent-three text-white px-4 py-2 flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    Solusi Utama
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-semibold text-gray-900 mb-2">{level.name}</CardTitle>
                <CardDescription className="text-gray-600 mb-4">{level.description}</CardDescription>
                
                {/* Improved Pricing Layout */}
                <div className="flex flex-col items-center justify-center">
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                    {level.price}
                  </div>
                  {level.period && (
                    <div className="text-sm text-gray-500 font-medium">
                      {level.period}
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="flex-grow flex flex-col">
                <div className="space-y-3 mb-8 flex-grow">
                  {level.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start">
                      <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  className={`w-full mt-auto ${
                    level.popular 
                      ? 'bg-accent-three hover:bg-accent-three/90 text-white' 
                      : 'bg-accent-one border-2 text-white hover:bg-accent-three hover:text-white'
                  }`}
                >
                  {level.price === "Hubungi Kami" ? "Hubungi Kami" : "Mulai Sekarang"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
} 