'use client';

import { useEffect, useRef } from 'react';
import { animations, createTimeline } from '@/lib/gsap-utils';
import { 
  Shield, 
  TrendingUp, 
  Scale, 
  Eye, 
  FlagOff,
  Check,
  Gift,
  MessageSquare,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const benefits = [
  {
    icon: Eye,
    title: "Transparansi Dana Pemilu",
    description: "Sediakan visibilitas penuh terhadap setiap donasi dan pengeluaran kampanye secara real-time untuk semua pihak terkait.",
    color: "text-blue-600"
  },
  {
    icon: Scale,
    title: "Akuntabilitas yang Ditingkatkan",
    description: "Memastikan setiap transaksi donasi tercatat dan diverifikasi, mengurangi celah untuk korupsi dan penyalahgunaan dana.",
    color: "text-green-600"
  },
  {
    icon: Shield,
    title: "Kepatuhan Regulasi",
    description: "Bantu KPU dan PPATK memenuhi persyaratan AML/CFT sesuai standar peraturan domestik dan internasional (FATF).",
    color: "text-purple-600"
  },
  {
    icon: TrendingUp,
    title: "Deteksi Pencucian Uang Efektif",
    description: "Manfaatkan kekuatan AI untuk secara otomatis mendeteksi pola pencucian uang dan aktivitas mencurigakan dalam pembiayaan pemilu.",
    color: "text-orange-600"
  },
  {
    icon: FlagOff,
    title: "Pencegahan Korupsi",
    description: "Dengan pelacakan donasi dan verifikasi pengeluaran yang ketat, Cakradana berperan aktif dalam mengurangi potensi korupsi pemilu.",
    color: "text-red-600"
  }
];

export default function BenefitsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    let scrollTrigger: ScrollTrigger | null = null;
    
    // Dynamic import for client-side only
    const initAnimation = async () => {
      try {
        const { gsap } = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        
        gsap.registerPlugin(ScrollTrigger);

        const section = sectionRef.current;
        const leftContent = leftContentRef.current;
        const rightContent = rightContentRef.current;

        if (!section || !leftContent || !rightContent) return;

        // Initial animations
        const tl = createTimeline({ delay: 0.3 });
        tl.add(animations.fadeIn('.benefits-headline', { duration: 1 }))
          .add(animations.fadeIn('.benefits-description', { duration: 0.8 }), '-=0.5')
          .add(animations.fadeIn('.benefits-cta', { duration: 0.6 }), '-=0.3');

        // Create scroll-triggered animation for the right content
        const benefitItems = rightContent.querySelectorAll('.benefit-item');
        
        // Set initial positions - all items visible from start
        gsap.set(benefitItems, { 
          opacity: 1,
          y: 0,
          force3D: true,
          transformOrigin: "center center"
        });

        // Set initial position to align first item with title
        const initialOffset = 300; // Fine-tuned to align first box with title
        gsap.set(rightContent, {
          y: initialOffset,
          force3D: true,
          transformOrigin: "center center"
        });

        // Alternative approach - simpler and faster
        scrollTrigger = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "+=120%", // Dikurangi ke ukuran yang pas untuk 5 cards
          pin: true,
          pinSpacing: true, 
          scrub: 1.5, // Dikembalikan ke speed yang lebih normal
          anticipatePin: 1,
          animation: gsap.to(rightContent, {
            y: (-initialOffset) + 50, // Card terakhir akan sejajar dengan judul (posisi 0 + sedikit offset)
            ease: "power1.out", 
            force3D: true,
            duration: 1
          })
        });
      } catch (error) {
        console.error('Error loading GSAP:', error);
      }
    };

    initAnimation();

    return () => {
      if (scrollTrigger) {
        scrollTrigger.kill();
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="benefits" 
      className="relative bg-white overflow-hidden"
      style={{ height: '100vh' }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-full transform -translate-y-16 md:-translate-y-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 h-full items-center">
          {/* Left Content - Sticky */}
          <div ref={leftContentRef} className="space-y-8">
            <div className="flex mb-6">
              <Badge className='bg-primary/10 text-primary border-primary/20'>
                <Gift className="-ms-0.5 text-primary" size={12} aria-hidden="true" />
                Benefits
              </Badge>
            </div>
            
            <h2 className="benefits-headline text-4xl md:text-5xl lg:text-6xl font-medium font-nohemi text-gray-900 leading-tight">
              Meningkatkan Transparansi dan Integritas Pembiayaan Pemilu
            </h2>
            
            <p className="benefits-description text-lg md:text-xl text-gray-700 leading-relaxed max-w-lg">
              Menyediakan alat canggih untuk memerangi pencucian uang dan korupsi dalam pembiayaan kampanye politik
            </p>

            <div className="benefits-cta">
              <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full">
                Mulai Sekarang
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Right Content - Scrollable */}
          <div className="relative h-full flex items-center">
            <div 
              ref={rightContentRef} 
              className="space-y-8 w-full"
              style={{
                willChange: 'transform',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden'
              }}
            >
                              {benefits.map((benefit, index) => (
                  <Card 
                    key={index}
                    className="benefit-item bg-white border border-gray-200 p-6 shadow-none"
                    style={{
                      willChange: 'transform',
                      transform: 'translateZ(0)'
                    }}
                  >
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 ${benefit.color}`}>
                      <benefit.icon className="w-6 h-6" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 