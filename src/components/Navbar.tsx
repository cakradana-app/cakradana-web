'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { SearchIcon } from '@/components/ui/search-icon';
import { animations } from '@/lib/gsap-utils';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Register ScrollTrigger plugin
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {

    if (navRef.current) {
      const navbar = navRef.current;
      
      // Create scroll trigger for hiding/showing navbar
      ScrollTrigger.create({
        start: "top -100",
        end: 99999,
        onUpdate: (self) => {
          if (self.direction === 1) {
            // Scrolling down - hide navbar (move up off-screen)
            gsap.to(navbar, {
              y: -120,
              duration: 0.2,
            });
          } else {
            // Scrolling up - show navbar (move down to original position)
            gsap.to(navbar, {
              y: 0,
              duration: 0.2,
            });
          }
        }
      });
    }

    // Cleanup ScrollTrigger on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const menuItems = [
    { label: 'Home', href: '#home' },
    { label: 'Milestones', href: '#milestones' },
    { label: 'About', href: '#about' },
  ];

  return (
    <>
      <nav 
        ref={navRef}
        className={`navbar fixed top-2 md:top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-black backdrop-blur-md shadow-lg' 
            : 'bg-black backdrop-blur-sm'
        } rounded-full px-4 md:px-8 lg:px-12 h-10 md:h-20 mx-2 md:mx-4 w-[calc(100%-16px)] md:w-[1000px] max-w-[95vw] flex items-center`}
      >
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <div className="flex items-center -ml-4">
            <Link href="/" className="flex items-center">
              <Image 
                src="/logo-white.png" 
                alt="Logo" 
                width={170}
                height={170}
                className="w-42 h-42 md:w-42 lg:w-54 md:h-42 lg:h-54 object-contain"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                className="nav-item text-white hover:text-primary transition-colors duration-200 font-medium"
                onClick={() => animations.buttonPress(`.nav-item:nth-child(${index + 1})`)}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4 -mr-6">
            <Button
              variant="ghost"
              size="default"
              className="text-white hover:text-white hover:bg-gray-800 px-3 lg:px-6 py-3 lg:py-5 rounded-full text-sm lg:text-base"
            >
              <span>Login</span>
            </Button>
            
            <Button
              size="default"
              className="bg-white hover:bg-gray-800 text-[#1A2F4B] hover:text-white flex items-center space-x-1 lg:space-x-2 px-3 lg:px-6 py-3 lg:py-5 rounded-full group text-sm lg:text-base"
              onMouseEnter={(e) => {
                const icon = e.currentTarget.querySelector('[data-search-icon]') as HTMLElement;
                if (icon && 'startAnimation' in icon) {
                  (icon as { startAnimation?: () => void }).startAnimation?.();
                }
              }}
              onMouseLeave={(e) => {
                const icon = e.currentTarget.querySelector('[data-search-icon]') as HTMLElement;
                if (icon && 'stopAnimation' in icon) {
                  (icon as { stopAnimation?: () => void }).stopAnimation?.();
                }
              }}
            >
              <span className="hidden lg:inline">Explore Now</span>
              <span className="lg:hidden">Explore</span>
              <SearchIcon size={14} data-search-icon />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              className="w-8 h-8 flex flex-col justify-center items-center"
              aria-label="Menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className={`block w-5 h-0.5 bg-white mb-1 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`block w-5 h-0.5 bg-white mb-1 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-5 h-0.5 bg-white transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 w-[calc(100%-32px)] max-w-sm bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200 p-6">
            <div className="flex flex-col space-y-6">
              {/* Mobile Menu Items */}
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-gray-600 hover:text-primary transition-colors duration-200 font-medium text-lg text-center py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              
              {/* Mobile Buttons */}
              <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200">
                <Button
                  variant="ghost"
                  size="default"
                  className="text-gray-600 hover:text-primary hover:bg-primary/10 py-3 rounded-full w-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Button>
                
                <Button
                  size="default"
                  className="bg-white hover:bg-primary/90 text-primary flex items-center justify-center space-x-2 py-3 rounded-full w-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>Explore Now</span>
                  <SearchIcon size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 