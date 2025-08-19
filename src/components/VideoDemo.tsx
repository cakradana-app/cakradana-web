'use client';

import { useRef, useEffect, useState } from 'react';
import { HiOutlineCollection } from "react-icons/hi";
import { gsap } from 'gsap';

interface VideoDemoProps {
  className?: string;
}

export default function VideoDemo({ className = "" }: VideoDemoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const handleVideoLoad = () => {
      if (videoRef.current) {
        // Start muted initially
        videoRef.current.muted = true;
        videoRef.current.volume = 0;
        videoRef.current.play().catch(console.error);
      }
    };

    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener('loadeddata', handleVideoLoad);
      return () => {
        videoElement.removeEventListener('loadeddata', handleVideoLoad);
      };
    }
  }, []);

  // Handle user interaction to enable audio
  useEffect(() => {
    const handleUserInteraction = () => {
      setHasUserInteracted(true);
      // Remove event listeners after first interaction
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('scroll', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };

    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('scroll', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('scroll', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, []);

  // Audio fade in/out based on scroll position
  useEffect(() => {
    if (!videoRef.current || !hasUserInteracted) return;

    const videoElement = videoRef.current;
    
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how much of the video section is visible
      const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
      const totalHeight = rect.height;
      const visibilityRatio = Math.max(0, Math.min(1, visibleHeight / totalHeight));
      
      // Set audio volume based on visibility (0 = not visible, 1 = fully visible)
      if (visibilityRatio > 0.1) { // Start fading in when 10% visible
        setIsInView(true);
        const targetVolume = Math.min(1, visibilityRatio);
        
        // Smooth volume transition
        gsap.to(videoElement, {
          volume: targetVolume,
          duration: 0.5,
          ease: "power2.out"
        });
        
        // Unmute when visible
        if (videoElement.muted) {
          videoElement.muted = false;
        }
      } else {
        // Fade out audio when not visible
        setIsInView(false);
        gsap.to(videoElement, {
          volume: 0,
          duration: 0.3,
          ease: "power2.out",
          onComplete: () => {
            // Mute when completely out of view to save resources
            if (videoElement.volume === 0) {
              videoElement.muted = true;
            }
          }
        });
      }
    };

    // Throttled scroll listener for audio
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
    
    // Initial call
    handleScroll();

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [hasUserInteracted]);

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
        loop
        playsInline
        muted // Start muted
      >
        <source src="https://cdn.cakradana.org/video.mp4" type="video/mp4" />
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