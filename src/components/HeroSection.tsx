'use client';

import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { FiArrowRight } from 'react-icons/fi';
import { animations, createTimeline } from '@/lib/gsap-utils';
import { HiOutlineCollection } from "react-icons/hi";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate hero elements on mount
    const tl = createTimeline({ delay: 0.5 });
    
    tl.add(animations.fadeIn('.hero-headline', { duration: 1 }))
      .add(animations.fadeIn('.hero-description', { duration: 0.8 }), '-=0.5')
      .add(animations.fadeIn('.hero-buttons', { duration: 0.6 }), '-=0.3')
      .add(animations.scaleIn('.hero-video', { duration: 1 }), '-=0.4');



  }, []);

  const handleVideoLoad = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
  };

  return (
    <section 
      ref={heroRef}
      id="home" 
      className="min-h-screen flex flex-col items-center justify-center px-8 pt-32 pb-20 bg-white relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primer/5 via-transparent to-sekunder/5"></div>
      <div className="absolute top-1/4 left-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-10 w-48 h-48 bg-primer/10 rounded-full blur-3xl"></div>

      {/* Text Content - Left Aligned with Margin */}
      <div className="max-w-4xl mx-auto relative z-10 mb-16 ml-24">
        {/* Headline */}
        <h1 className="hero-headline text-4xl md:text-6xl lg:text-7xl font-medium font-nohemi text-gray-900 mb-8 leading-tight text-left">
          <span className="block">AI-Powered</span>
          <span className="block text-primer">Anti-Money Laundering</span>
          <span className="block text-sm md:text-lg lg:text-xl font-medium text-gray-600 mt-4">
            for Decentralized Exchanges
          </span>
        </h1>

        {/* Description */}
        <p className="hero-description text-lg md:text-xl text-gray-700 mb-12 leading-relaxed text-left max-w-[800px]">
          Dextektif is an AI-driven solution designed to detect, monitor, and prevent money laundering 
          activities in memecoin trading on Solana-based decentralized exchanges like Jupiter, Raydium, and Pump Fun.
        </p>

        {/* Buttons */}
        <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-start items-start">
          <Button
            size="lg"
            className="bg-primer hover:bg-primer/90 text-white px-8 py-3 text-lg rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
           
            Try Now
            <HiOutlineCollection className="w-5 h-5 mr-2 stroke-[2px]" />
          </Button>
          
          <Button
            variant="ghost"
            size="lg"
            className="text-primer hover:bg-gray-200 px-8 py-3 text-lg font-semibold group rounded-full"
          >
            Learn More
            <FiArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
          </Button>
        </div>
      </div>

      {/* Video Section - Full Width */}
      <div className="hero-video w-full relative z-10">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white border border-gray-200">
          <video
            ref={videoRef}
            className="w-full h-auto"
            autoPlay
            muted
            loop
            playsInline
            onLoadedData={handleVideoLoad}
          >
            <source src="https://cdn.cargovision.app/video.mp4" type="video/mp4" />
            <div className="flex items-center justify-center h-64 bg-gray-100 text-gray-500">
              <div className="text-center">
                                 <HiOutlineCollection className="w-16 h-16 mx-auto mb-4 text-primer stroke-2" />
                <p>Video could not be loaded</p>
              </div>
            </div>
          </video>
          
          {/* Video Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none"></div>
        </div>
        

      </div>


    </section>
  );
} 