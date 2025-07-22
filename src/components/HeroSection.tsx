'use client';

import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { FiArrowRight } from 'react-icons/fi';
import { animations, createTimeline } from '@/lib/gsap-utils';
import { HiOutlineCollection } from "react-icons/hi";
import VideoDemo from './VideoDemo';

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

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
      <div className="absolute inset-0 bg-gradient-to-br from-primer/5 via-transparent to-sekunder/5"></div>
      <div className="absolute top-1/4 left-4 md:left-10 w-20 h-20 md:w-32 md:h-32 bg-accent/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-4 md:right-10 w-32 h-32 md:w-48 md:h-48 bg-primer/10 rounded-full blur-3xl"></div>
      
      {/* Green bottom section */}
      <div className="absolute bottom-0 left-0 right-0 h-[700px] bg-primer"></div>

      {/* Text Content */}
      <div className="max-w-4xl mx-auto relative z-10 mb-8 md:mb-16 text-center md:text-left md:ml-24">
        {/* Headline */}
        <h1 className="hero-headline text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-medium font-nohemi text-gray-900 mb-6 md:mb-8 leading-tight">
          <span className="block">AI-Powered</span>
          <span className="block text-primer">Anti-Money Laundering</span>
          <span className="block text-sm sm:text-base md:text-lg lg:text-xl font-medium text-gray-600 mt-2 md:mt-4">
            for Decentralized Exchanges
          </span>
        </h1>

        {/* Description */}
        <p className="hero-description text-base sm:text-lg md:text-xl text-gray-700 mb-8 md:mb-12 leading-relaxed max-w-[90%] sm:max-w-[800px] mx-auto md:mx-0">
          Dextektif is an AI-driven solution designed to detect, monitor, and prevent money laundering 
          activities in memecoin trading on Solana-based decentralized exchanges like Jupiter, Raydium, and Pump Fun.
        </p>

        {/* Buttons */}
        <div className="hero-buttons flex flex-col sm:flex-row gap-3 md:gap-4 justify-center md:justify-start items-center md:items-start">
          <Button
            size="lg"
            className="bg-primer hover:bg-primer/90 text-white px-6 md:px-8 py-3 text-base md:text-lg rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
          >
            Try Now
            <HiOutlineCollection className="w-4 h-4 md:w-5 md:h-5 mr-2 stroke-[2px]" />
          </Button>
          
          <Button
            variant="ghost"
            size="lg"
            className="text-primer hover:bg-gray-200 px-6 md:px-8 py-3 text-base md:text-lg font-semibold group rounded-full w-full sm:w-auto"
          >
            Learn More
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