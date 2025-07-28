'use client';

import { useEffect, useRef } from 'react';
import { animations, createTimeline, createScrollTrigger } from '@/lib/gsap-utils';
import { 
  Database, 
  Cpu, 
  BarChart3, 
  UserCheck,
  ArrowRight,
  Footprints
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const steps = [
  {
    icon: Database,
    title: "Pengumpulan Data",
    description: "Cakradana menerima data donasi dari formulir digital, OCR formulir kertas, dan web scraping sumber publik.",
    color: "text-blue-500"
  },
  {
    icon: Cpu,
    title: "Analisis AI & Penilaian Risiko",
    description: "Model AI/ML kami menganalisis donasi, mendeteksi anomali, dan menetapkan skor risiko secara otomatis.",
    color: "text-purple-500"
  },
  {
    icon: BarChart3,
    title: "Visualisasi & Laporan Komprehensif",
    description: "Pengguna (KPU & PPATK) memantau donasi mencurigakan, melihat jaringan donasi interaktif, dan menghasilkan laporan SAR.",
    color: "text-green-500"
  },
  {
    icon: UserCheck,
    title: "Konfirmasi & Verifikasi Kandidat",
    description: "Kandidat dapat mengkonfirmasi transaksi yang ditandai mencurigakan, meningkatkan akurasi data dan akuntabilitas.",
    color: "text-orange-500"
  }
];

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll-triggered animations that wait for viewport
    if (typeof window !== 'undefined') {
      // Animate section header when it comes into view
      createScrollTrigger('.how-it-works-header', 
        { 
          opacity: 1, 
          y: 0,
          duration: 1,
          ease: "power2.out"
        },
        {
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      );

      // Staggered animation for steps
      createScrollTrigger('.step-item', 
        { 
          opacity: 1, 
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.2
        },
        {
          trigger: '.steps-container',
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      );
    }
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="how-it-works" 
      className="py-12 md:py-16 bg-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="how-it-works-header text-left mb-10 md:mb-12 opacity-0 translate-y-8">
          <div className="flex justify-start mb-6">
            <Badge className='bg-primary/10 text-primary border-primary/20'>
              <Footprints className="-ms-0.5 text-primary" size={12} aria-hidden="true" />
              Langkah Kerja
            </Badge>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium font-nohemi text-gray-900 mb-3 max-w-3xl">
            Alur Kerja Transparansi Pembiayaan Pemilu
          </h2>
          <div className="flex justify-between items-end">
            <p className="text-sm md:text-base text-gray-600 max-w-xl leading-relaxed">
              Mengubah data donasi kampanye menjadi alat monitoring yang efektif untuk KPU dan PPATK
            </p>
            <div className="hidden lg:block">
              <Button variant="link" className="text-primary hover:text-primary/80 p-0 h-auto font-medium">
                Pelajari lebih lanjut <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>

        {/* Steps Timeline - Horizontal Layout */}
        <div className="steps-container relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div 
                key={index}
                className="step-item text-left opacity-0 translate-y-8 p-6 border border-gray-200 rounded-lg bg-white"
              >
                {/* Step Icon */}
                <div className="mb-6 pb-4 border-b border-gray-100 -mx-6 px-6">
                  <div className={`w-16 h-16 flex items-center justify-center ${step.color}`}>
                    <step.icon className="w-9 h-9" />
                  </div>
                </div>
                
                {/* Step Content */}
                <div className="space-y-3">
                  <h3 className="text-base md:text-lg font-semibold text-gray-900">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-[200px]">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 