'use client';

import { useEffect, useRef } from 'react';
import { animations, createTimeline } from '@/lib/gsap-utils';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';

const testimonials = [
  {
    quote: "Dextektif has revolutionized our ability to monitor financial crime in real-time. The AI-powered detection system has significantly improved our compliance efficiency.",
    author: "Sarah Johnson",
    role: "Senior Regulator",
    organization: "OJK Indonesia",
    rating: 5
  },
  {
    quote: "The API integration was seamless, and it helped us block high-risk wallets instantly. Our compliance team can now focus on strategic initiatives rather than manual monitoring.",
    author: "Michael Chen",
    role: "CTO",
    organization: "CryptoExchange Pro",
    rating: 5
  },
  {
    quote: "As a DEX operator, Dextektif provides the security and compliance tools we need to operate confidently in the Indonesian market. Highly recommended.",
    author: "Ahmad Rahman",
    role: "Founder & CEO",
    organization: "SolanaDEX Indonesia",
    rating: 5
  }
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = createTimeline({ delay: 0.3 });
    
    tl.add(animations.fadeIn('.testimonials-headline', { duration: 1 }))
      .add(animations.fadeIn('.testimonials-description', { duration: 0.8 }), '-=0.5')
      .add(animations.staggerIn('.testimonial-card', { duration: 0.6, stagger: 0.2 }), '-=0.3');

  }, []);

  return (
    <section 
      ref={sectionRef}
      id="testimonials" 
      className="py-20 md:py-32 bg-white relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primer/5 via-transparent to-sekunder/5"></div>
      <div className="absolute top-1/4 right-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-10 w-48 h-48 bg-primer/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="testimonials-headline text-3xl md:text-5xl lg:text-6xl font-medium font-nohemi text-gray-900 mb-6">
            What Our Users Say
          </h2>
          <p className="testimonials-description text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Trusted by regulators and crypto businesses across Indonesia
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="testimonial-card bg-gray-50/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 border-0"
            >
              <CardHeader>
                {/* Quote Icon */}
                <div className="w-12 h-12 rounded-full bg-primer/10 flex items-center justify-center mb-4">
                  <Quote className="w-6 h-6 text-primer" />
                </div>
                
                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </CardHeader>
              
              <CardContent>
                {/* Quote */}
                <blockquote className="text-gray-700 leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </blockquote>
                
                {/* Author */}
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primer to-sekunder flex items-center justify-center text-white font-semibold text-lg mr-4">
                    {testimonial.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.author}</div>
                    <CardDescription>{testimonial.role}</CardDescription>
                    <div className="text-sm text-primer font-medium">{testimonial.organization}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="text-center mt-16 md:mt-20">
          <Card className="bg-gradient-to-r from-primer to-sekunder border-0 text-white">
            <CardContent className="p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-semibold mb-4">
                Join Our Growing Community
              </h3>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Over 100+ businesses and regulatory bodies trust Dextektif for their AML compliance needs
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-2">100+</div>
                  <div className="text-sm text-white/80">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-2">1M+</div>
                  <div className="text-sm text-white/80">Wallets Monitored</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-2">99.9%</div>
                  <div className="text-sm text-white/80">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-2">24/7</div>
                  <div className="text-sm text-white/80">Support</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
} 