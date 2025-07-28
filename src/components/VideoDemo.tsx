'use client';

import { useRef, useEffect } from 'react';
import { HiOutlineCollection } from "react-icons/hi";
import { gsap } from 'gsap';

interface VideoDemoProps {
  className?: string;
}

export default function VideoDemo({ className = "" }: VideoDemoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleVideoLoad = () => {
      if (videoRef.current) {
        videoRef.current.play().catch(console.error);
      }
    };

    if (videoRef.current) {
      videoRef.current.addEventListener('loadeddata', handleVideoLoad);
      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener('loadeddata', handleVideoLoad);
        }
      };
    }
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    gsap.set(container, { scale: 1, transformOrigin: "center center" });

    // Single scroll listener for smooth scaling
    const handleScroll = () => {
      if (!container) return;
      
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Only update if element is visible
      if (rect.bottom > 0 && rect.top < windowHeight) {
        const elementCenter = rect.top + rect.height / 2;
        const viewportCenter = windowHeight / 2;
        const maxDistance = windowHeight / 2;
        
        const distanceFromCenter = Math.abs(elementCenter - viewportCenter) / maxDistance;
        const normalizedDistance = Math.max(0, Math.min(1, distanceFromCenter));
        const scaleValue = 1 + (0.10 * (1 - normalizedDistance));
        
        gsap.set(container, {
          scale: scaleValue,
          transformOrigin: "center center"
        });
      } else {
        // Reset to normal size when not visible
        gsap.set(container, { scale: 1 });
      }
    };

    // Throttled scroll listener
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial call
    handleScroll();
    
    window.addEventListener('scroll', throttledScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      gsap.set(container, { scale: 1 });
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`relative rounded-xl md:rounded-2xl overflow-hidden shadow-xl md:shadow-2xl bg-white border border-gray-200 ${className}`}
    >
      <video
        ref={videoRef}
        className="w-full h-auto"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="https://cdn.cargovision.app/video.mp4" type="video/mp4" />
        <div className="flex items-center justify-center h-48 md:h-64 bg-gray-100 text-gray-500">
          <div className="text-center">
            <HiOutlineCollection className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 text-primary stroke-2" />
            <p className="text-sm md:text-base">Video could not be loaded</p>
          </div>
        </div>
      </video>
      
      {/* Video Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none"></div>
    </div>
  );
} 