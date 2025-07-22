'use client';

import { useEffect, useRef } from 'react';
import { animations, createTimeline } from '@/lib/gsap-utils';
import { 
  Shield, 
  TrendingUp, 
  Zap, 
  Code, 
  Lock,
  Check 
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const benefits = [
  {
    icon: Shield,
    title: "Regulatory Compliance",
    description: "Meet OJK's AML/CFT requirements effortlessly with automated compliance reporting.",
    color: "text-blue-600"
  },
  {
    icon: Shield,
    title: "Financial Security",
    description: "Protect businesses and consumers from illicit activities with real-time monitoring.",
    color: "text-green-600"
  },
  {
    icon: TrendingUp,
    title: "Scalability",
    description: "Handle Solana's high transaction throughput (50,000 TPS) without performance issues.",
    color: "text-purple-600"
  },
  {
    icon: Code,
    title: "Ease of Integration",
    description: "API designed for seamless integration with crypto platforms and existing systems.",
    color: "text-orange-600"
  },
  {
    icon: Lock,
    title: "Privacy Compliance",
    description: "Anonymized data processing ensures adherence to UU PDP regulations.",
    color: "text-red-600"
  }
];

export default function BenefitsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = createTimeline({ delay: 0.3 });
    
    tl.add(animations.fadeIn('.benefits-headline', { duration: 1 }))
      .add(animations.fadeIn('.benefits-description', { duration: 0.8 }), '-=0.5')
      .add(animations.staggerIn('.benefit-card', { duration: 0.6, stagger: 0.1 }), '-=0.3');

  }, []);

  return (
    <section 
      ref={sectionRef}
      id="benefits" 
      className="py-20 md:py-32 bg-gray-50 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-sekunder/5 via-transparent to-primer/5"></div>
      <div className="absolute top-1/3 left-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 right-10 w-48 h-48 bg-primer/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="benefits-headline text-3xl md:text-5xl lg:text-6xl font-medium font-nohemi text-gray-900 mb-6">
            Why Choose Dextektif?
          </h2>
          <p className="benefits-description text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Benefits for regulators and crypto businesses in the fight against financial crime
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mb-16">
          {benefits.map((benefit, index) => (
            <Card 
              key={index}
              className="benefit-card bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 border-0"
            >
              <CardHeader>
                <div className={`w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center mb-4 ${benefit.color}`}>
                  <benefit.icon className="w-8 h-8" />
                </div>
                <CardTitle className="text-xl md:text-2xl font-semibold text-gray-900">
                  {benefit.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-700 leading-relaxed text-base">
                  {benefit.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-16">
          <Card className="text-center bg-white/80 backdrop-blur-sm border-0">
            <CardContent className="p-8">
              <div className="text-4xl md:text-5xl font-bold text-primer mb-2">50,000+</div>
              <div className="text-gray-700 font-medium">TPS Handled</div>
            </CardContent>
          </Card>
          <Card className="text-center bg-white/80 backdrop-blur-sm border-0">
            <CardContent className="p-8">
              <div className="text-4xl md:text-5xl font-bold text-sekunder mb-2">99.9%</div>
              <div className="text-gray-700 font-medium">Detection Accuracy</div>
            </CardContent>
          </Card>
          <Card className="text-center bg-white/80 backdrop-blur-sm border-0">
            <CardContent className="p-8">
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2">24/7</div>
              <div className="text-gray-700 font-medium">Real-time Monitoring</div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
                Ready to Protect Your Business?
              </h3>
              <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                Join leading crypto businesses and regulators who trust Dextektif for their AML compliance needs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="default" size="lg">
                  Start Monitoring Today
                </Button>
                <Button variant="outline" size="lg">
                  Contact Sales
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
} 