'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { SearchIcon } from '@/components/ui/search-icon';
import { animations } from '@/lib/gsap-utils';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Animate navbar on mount
    animations.fadeIn('.navbar', { delay: 0.2 });
  }, []);

  const menuItems = [
    { label: 'Home', href: '#home' },
    { label: 'Milestones', href: '#milestones' },
    { label: 'About', href: '#about' },
  ];

  return (
    <nav 
      className={`navbar fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-lg' 
          : 'bg-white/80 backdrop-blur-sm'
      } rounded-full px-12 h-20 mx-4 w-[1000px] max-w-[95vw] flex items-center`}
    >
      <div className="flex items-center justify-between w-full">
        {/* Logo Placeholder */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image 
              src="/logo.png" 
              alt="Logo" 
              width={144}
              height={144}
              className="w-36 h-36 object-contain"
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-10">
          {menuItems.map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              className="nav-item text-gray-600 hover:text-primer transition-colors duration-200 font-medium"
              onClick={() => animations.buttonPress(`.nav-item:nth-child(${index + 1})`)}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="default"
            className="flex items-center space-x-2 text-gray-600 hover:text-primer hover:bg-primer/10 px-6 py-5 rounded-full"
          >
            <span>Login</span>
          </Button>
          
          <Button
            size="default"
            className="bg-primer hover:bg-primer/90 text-white flex items-center space-x-2 px-6 py-5 rounded-full group"
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
            <span>Explore Now</span>
            <SearchIcon size={16} data-search-icon />
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="w-6 h-6 flex flex-col justify-center items-center"
            aria-label="Menu"
          >
            <span className="block w-4 h-0.5 bg-gray-600 mb-1"></span>
            <span className="block w-4 h-0.5 bg-gray-600 mb-1"></span>
            <span className="block w-4 h-0.5 bg-gray-600"></span>
          </button>
        </div>
      </div>
    </nav>
  );
} 