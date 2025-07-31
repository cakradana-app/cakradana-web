'use client';

import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi';
import { animations, createTimeline } from '@/lib/gsap-utils';
import VideoDemo from './VideoDemo';
import { useRouter } from 'next/navigation';

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    // Animate hero elements on mount
    const tl = createTimeline({ delay: 0.5 });
    
    tl.add(animations.fadeIn('.hero-headline', { duration: 1 }))
      .add(animations.fadeIn('.hero-description', { duration: 0.8 }), '-=0.5')
      .add(animations.fadeIn('.hero-buttons', { duration: 0.6 }), '-=0.3')
      .add(animations.scaleIn('.hero-video', { duration: 1 }), '-=0.4');

  }, []);

  return (
    <section 
      ref={heroRef}
      id="home" 
      className="min-h-screen flex flex-col items-center justify-center px-4 md:px-8 pt-24 md:pt-32 pb-12 md:pb-20 bg-white relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
      <div className="absolute top-1/4 left-4 md:left-10 w-20 h-20 md:w-32 md:h-32 bg-accent/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-4 md:right-10 w-32 h-32 md:w-48 md:h-48 bg-primary/10 rounded-full blur-3xl"></div>
      
      {/* Green bottom section */}
      <div className="absolute bottom-0 left-0 right-0 h-[700px] bg-accent-three"></div>

      {/* Text Content */}
      <div className="max-w-4xl mx-auto relative z-10 mb-8 md:mb-16 text-center md:text-left md:ml-24">
        {/* Headline */}
        <h1 className="hero-headline text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-medium font-nohemi text-gray-900 mb-6 md:mb-8 leading-tight">
          <span className="block">Wujudkan</span>
          <span className="block text-accent-one">Pemilu Bersih & Transparan</span>
          <span className="block text-sm sm:text-base md:text-lg lg:text-xl font-medium text-gray-600 mt-2 md:mt-4">
            dengan Deteksi AML Bertenaga AI
          </span>
        </h1>

        {/* Description */}
        <p className="hero-description text-base sm:text-lg md:text-xl text-gray-700 mb-8 md:mb-12 leading-relaxed max-w-[90%] sm:max-w-[800px] mx-auto md:mx-0">
          Cakradana adalah aplikasi web inovatif yang meningkatkan transparansi pembiayaan pemilu. Kami memantau 
          donasi dari individu, perusahaan, dan partai secara real-time, mendeteksi pencucian uang dengan AI, 
          dan menyediakan visualisasi jaringan donasi yang komprehensif.
        </p>

        {/* Buttons */}
        <div className="hero-buttons flex flex-col sm:flex-row gap-3 md:gap-4 justify-center md:justify-start items-center md:items-start">
          <Button
            size="lg"
            className="bg-accent-one hover:bg-primary/90 text-white px-6 md:px-8 py-3 text-base md:text-lg rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
            onClick={() => router.push('/dashboard')}
          >
            Coba Sekarang
            <FiArrowUpRight className="w-4 h-4 md:w-5 md:h-5 ml-2 stroke-[2px]" />
          </Button>
          
          <Button
            variant="ghost"
            size="lg"
            className="text-accent-one hover:bg-gray-200 px-6 md:px-8 py-3 text-base md:text-lg font-semibold group rounded-full w-full sm:w-auto"
          >
            Pelajari Lebih Lanjut
            <FiArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
          </Button>
        </div>
      </div>

      {/* Video Section */}
      <div className="hero-video w-full mx-auto relative z-10 px-8 md:px-8">
        <VideoDemo />
      </div>
    </section>
  );
} 