'use client';

import { useEffect, useRef } from 'react';
import { animations, createTimeline } from '@/lib/gsap-utils';
import { 
  Shield, 
  TrendingUp, 
  Zap, 
  Code, 
  Lock,
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
    icon: MessageSquare,
    title: "Real-time Messaging",
    description: "Instantly communicate with your team, ensuring swift decision-making and seamless collaboration on project tasks and updates.",
    color: "text-blue-600"
  },
  {
    icon: Zap,
    title: "Task Management",
    description: "Organize and prioritize tasks effectively, assigning responsibilities and tracking progress to keep projects on schedule and within scope.",
    color: "text-green-600"
  },
  {
    icon: Shield,
    title: "Regulatory Compliance",
    description: "Meet OJK's AML/CFT requirements effortlessly with automated compliance reporting and real-time monitoring capabilities.",
    color: "text-purple-600"
  },
  {
    icon: TrendingUp,
    title: "Advanced Analytics",
    description: "Get detailed insights into transaction patterns and suspicious activities with our machine learning-powered detection system.",
    color: "text-orange-600"
  },
  {
    icon: Lock,
    title: "Privacy Compliance",
    description: "Anonymized data processing ensures adherence to UU PDP regulations while maintaining the highest security standards.",
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
              Driving Financial Security in the Digital Economy
            </h2>
            
            <p className="benefits-description text-lg md:text-xl text-gray-700 leading-relaxed max-w-lg">
              Delivering Advanced Tools to Combat Money Laundering in Crypto
            </p>

            <div className="benefits-cta">
              <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full">
                Get started
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