'use client';

import { useEffect, useRef } from 'react';
import { animations, createTimeline, createScrollTrigger } from '@/lib/gsap-utils';
import { 
  Database, 
  Settings, 
  BarChart3, 
  Code,
  ArrowRight,
  ZapIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const steps = [
  {
    icon: Database,
    title: "Data Collection",
    description: "Dextektif ingests real-time Solana transaction data from multiple DEX sources.",
    color: "text-blue-500"
  },
  {
    icon: Settings,
    title: "AI Analysis",
    description: "AI/ML models detect anomalies and classify wallet risks automatically.",
    color: "text-purple-500"
  },
  {
    icon: BarChart3,
    title: "Dashboard Insights",
    description: "Regulators monitor suspicious wallets and generate comprehensive reports.",
    color: "text-green-500"
  },
  {
    icon: Code,
    title: "API Integration",
    description: "Businesses verify wallet addresses before transactions in real-time.",
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
            <Badge className='bg-primer/10 text-primer border-primer/20'>
              <ZapIcon className="-ms-0.5 text-primer" size={12} aria-hidden="true" />
              Process
            </Badge>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-nohemi text-gray-900 mb-3">
            How Dextektif Works
          </h2>
          <p className="text-sm md:text-base text-gray-600 max-w-xl leading-relaxed">
            Simplifying on-chain analysis for AML compliance with our streamlined workflow
          </p>
        </div>

        {/* Steps Timeline - Horizontal Layout */}
        <div className="steps-container relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 relative z-10">
            {steps.map((step, index) => (
              <div 
                key={index}
                className="step-item text-left opacity-0 translate-y-8 p-6"
              >
                {/* Step Icon */}
                <div className="mb-6">
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