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

    // Force initial scale to 1 immediately
    const container = containerRef.current;
    gsap.set(container, { scale: 1, transformOrigin: "center center" });

    // Use Intersection Observer for more reliable detection
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const rect = entry.boundingClientRect;
            const windowHeight = window.innerHeight;
            
            // Calculate how centered the element is in viewport
            const elementCenter = rect.top + rect.height / 2;
            const viewportCenter = windowHeight / 2;
            const maxDistance = windowHeight / 2;
            
            // Distance from center (0 = centered, 1 = at edge)
            const distanceFromCenter = Math.abs(elementCenter - viewportCenter) / maxDistance;
            
            // Smooth scaling: closer to center = larger scale
            const normalizedDistance = Math.max(0, Math.min(1, distanceFromCenter));
            const scaleValue = 1 + (0.3 * (1 - normalizedDistance));
            
            gsap.to(container, {
              scale: scaleValue,
              duration: 0.3,
              ease: "power2.out",
              transformOrigin: "center center"
            });
          } else {
            // Reset to normal size when not intersecting
            gsap.to(container, {
              scale: 1,
              duration: 0.3,
              ease: "power2.out"
            });
          }
        });
      },
      {
        threshold: Array.from({ length: 101 }, (_, i) => i / 100), // 0 to 1 in 0.01 steps
        rootMargin: '-10% 0px -10% 0px'
      }
    );

    observer.observe(container);

    // Additional scroll listener for smooth updates
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
        const scaleValue = 1 + (0.3 * (1 - normalizedDistance));
        
        gsap.set(container, {
          scale: scaleValue,
          transformOrigin: "center center"
        });
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

    window.addEventListener('scroll', throttledScroll, { passive: true });

    // Cleanup
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', throttledScroll);
      gsap.set(container, { scale: 1 }); // Ensure cleanup
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
            <HiOutlineCollection className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 text-primer stroke-2" />
            <p className="text-sm md:text-base">Video could not be loaded</p>
          </div>
        </div>
      </video>
      
      {/* Video Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none"></div>
    </div>
  );
} 