'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const DRIVE_EMBED_URL = 'https://drive.google.com/file/d/13LOOFkgt4Kch70QO6Jh_d_Ch5snkOO8H/preview';

interface VideoDemoProps {
  className?: string;
}

export default function VideoDemo({ className = "" }: VideoDemoProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    gsap.set(container, { scale: 1, transformOrigin: "center center" });

    let ticking = false;
    const handleScroll = () => {
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.bottom > 0 && rect.top < windowHeight) {
        const elementCenter = rect.top + rect.height / 2;
        const viewportCenter = windowHeight / 2;
        const maxDistance = windowHeight / 2;
        const distanceFromCenter = Math.abs(elementCenter - viewportCenter) / maxDistance;
        const normalizedDistance = Math.max(0, Math.min(1, distanceFromCenter));
        const scaleValue = 1 + 0.10 * (1 - normalizedDistance);
        gsap.set(container, { scale: scaleValue, transformOrigin: "center center" });
      } else {
        gsap.set(container, { scale: 1 });
      }
    };

    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener('scroll', throttledScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      gsap.set(container, { scale: 1 });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative rounded-xl md:rounded-2xl overflow-hidden shadow-xl md:shadow-2xl bg-black border border-gray-200 ${className}`}
    >
      <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
        <iframe
          src={DRIVE_EMBED_URL}
          className="absolute inset-0 w-full h-full"
          allow="autoplay"
          allowFullScreen
          title="Cakradana Demo"
        />
      </div>
    </div>
  );
}
