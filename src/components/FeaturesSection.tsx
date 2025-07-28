'use client';

import { useEffect, useRef } from 'react';
import { createScrollTrigger } from '@/lib/gsap-utils';
import { 
  Shield, 
  BarChart3, 
  Cpu, 
  Code, 
  Database,
  ZapIcon
} from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import React from 'react';

const features = [
  {
    icon: Shield,
    title: "Real-Time Wallet Monitoring",
    description: "Detect suspicious wallet activities instantly with our advanced monitoring system.",
    color: "text-blue-600",
    size: "large" // spans 2 columns
  },
  {
    icon: BarChart3,
    title: "Interactive Dashboard", 
    description: "Visualize transaction networks and generate comprehensive compliance reports.",
    color: "text-green-600",
    size: "large" // spans 2 columns
  },
  {
    icon: Cpu,
    title: "AI-Powered Anomaly Detection",
    description: "Identify rapid buy-sell cycles and volume spikes using machine learning algorithms.",
    color: "text-purple-600",
    size: "small"
  },
  {
    icon: Code,
    title: "API Integration",
    description: "Verify wallet addresses in real-time with dynamic blacklist updates.",
    color: "text-orange-600",
    size: "small"
  },
  {
    icon: Database,
    title: "Blockchain Analytics",
    description: "Trace wallet interactions across Solana DEXs with comprehensive analytics tools.",
    color: "text-indigo-600",
    size: "wide" // spans full width
  }
];

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll-triggered animations that wait for viewport
    if (typeof window !== 'undefined') {
      // Animate section header when it comes into view (20% from top)
      createScrollTrigger('.features-section-header', 
        { 
          opacity: 1, 
          y: 0,
          duration: 1,
          ease: "power2.out"
        },
        {
          start: "top 80%", // Triggers when top of element is 80% down the viewport (20% visible)
          toggleActions: "play none none reverse"
        }
      );

      // Staggered animation for feature cards
      createScrollTrigger('.feature-card', 
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.15
        },
        {
          trigger: '.features-grid',
          start: "top 85%", // Triggers when grid is 85% down viewport (15% visible)
          toggleActions: "play none none reverse"
        }
      );
    }

  }, []);

  return (
    <section 
      ref={sectionRef}
      id="features" 
      className="pb-20 pt-5 md:pb-32 md:pt-10 bg-accent-three relative overflow-hidden"
    >
      {/* Background Elements */}

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="features-section-header text-center mb-16 md:mb-20 opacity-0 translate-y-8">
          <div className="flex justify-center mb-6">
            <Badge className='bg-white/20 backdrop-blur-sm border-white/30 text-white'>
              <ZapIcon className="-ms-0.5 text-white" size={12} aria-hidden="true" />
              Features
            </Badge>
          </div>
          <h2 className="features-headline text-3xl md:text-5xl lg:text-6xl font-medium font-nohemi text-white mb-6 max-w-4xl mx-auto">
            Powerful Features to Combat Financial Crime
          </h2>
        </div>

        {/* Bento Grid Layout - 2 cards top, 3 cards bottom */}
        <div className="features-grid">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
            {/* Top row - 2 cards */}
            <Card className="feature-card hover:shadow-lg transition-all duration-300 border border-white/20 bg-white/10 backdrop-blur-sm rounded-2xl p-6 opacity-0 translate-y-8 scale-95">
              <div className="mb-6">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4">
                  {React.createElement(features[0].icon, { className: "w-6 h-6 text-gray-800" })}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {features[0].title}
                </h3>
                <p className="text-white/90 text-sm leading-relaxed mb-6">
                  {features[0].description}
                </p>
              </div>
              
              {/* Feature Image */}
              <div className="w-full h-[400px] bg-white/20 rounded-xl overflow-hidden">
                <Image
                  src="/features/Monitoring Dashboard.png"
                  alt="Monitoring Dashboard"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            </Card>

            <Card className="feature-card hover:shadow-lg transition-all duration-300 border border-white/20 bg-white/10 backdrop-blur-sm rounded-2xl p-6 opacity-0 translate-y-8 scale-95">
              <div className="mb-6">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4">
                  {React.createElement(features[1].icon, { className: "w-6 h-6 text-gray-800" })}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {features[1].title}
                </h3>
                <p className="text-white/90 text-sm leading-relaxed mb-6">
                  {features[1].description}
                </p>
              </div>
              
              {/* Feature Image */}
              <div className="w-full h-[400px] bg-white/20 rounded-xl overflow-hidden">
                <Image
                  src="/features/Analytics Chart.png"
                  alt="Analytics Chart"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            </Card>
          </div>

          {/* Bottom row - 3 cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <Card className="feature-card hover:shadow-lg transition-all duration-300 border border-white/20 bg-white/10 backdrop-blur-sm rounded-2xl p-6 h-[400px] opacity-0 translate-y-8 scale-95">
              <div className="mb-4">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4">
                  {React.createElement(features[2].icon, { className: "w-6 h-6 text-gray-800" })}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {features[2].title}
                </h3>
                <p className="text-white/90 text-sm leading-relaxed mb-4">
                  {features[2].description}
                </p>
              </div>
              
              {/* Feature Image */}
              <div className="w-full h-[195px] bg-white/20 rounded-xl overflow-hidden">
                <Image
                  src="/features/AI Detection.png"
                  alt="AI Detection"
                  width={400}
                  height={195}
                  className="w-full h-full object-cover"
                />
              </div>
            </Card>

            <Card className="feature-card hover:shadow-lg transition-all duration-300 border border-white/20 bg-white/10 backdrop-blur-sm rounded-2xl p-6 h-[400px] opacity-0 translate-y-8 scale-95">
              <div className="mb-4">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4">
                  {React.createElement(features[3].icon, { className: "w-6 h-6 text-gray-800" })}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {features[3].title}
                </h3>
                <p className="text-white/90 text-sm leading-relaxed mb-4">
                  {features[3].description}
                </p>
              </div>
              
              {/* Feature Image */}
              <div className="w-full h-[195px] bg-white/20 rounded-xl overflow-hidden">
                <Image
                  src="/features/API Interface.png"
                  alt="API Interface"
                  width={400}
                  height={195}
                  className="w-full h-full object-cover"
                />
              </div>
            </Card>

            <Card className="feature-card hover:shadow-lg transition-all duration-300 border border-white/20 bg-white/10 backdrop-blur-sm rounded-2xl p-6 h-[400px] opacity-0 translate-y-8 scale-95">
              <div className="mb-4">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4">
                  {React.createElement(features[4].icon, { className: "w-6 h-6 text-gray-800" })}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {features[4].title}
                </h3>
                <p className="text-white/90 text-sm leading-relaxed mb-4">
                  {features[4].description}
                </p>
              </div>
              
              {/* Feature Image */}
              <div className="w-full h-[195px] bg-white/20 rounded-xl overflow-hidden">
                <Image
                  src="/features/Blockchain Network.png"
                  alt="Blockchain Network"
                  width={400}
                  height={195}
                  className="w-full h-full object-cover"
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
} 