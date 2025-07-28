'use client';

import { useEffect, useRef } from 'react';
import { animations, createTimeline } from '@/lib/gsap-utils';
import Image from 'next/image';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Twitter, 
  Linkedin, 
  Github,
  ArrowUp,
  Instagram,
  Facebook
} from 'lucide-react';

const quickLinks = [
  { name: "Home", href: "#home" },
  { name: "Features", href: "#features" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "Pricing", href: "#pricing" },
  { name: "FAQ", href: "#faq" }
];

const companyLinks = [
  { name: "About Us", href: "#" },
  { name: "Careers", href: "#" },
  { name: "Blog", href: "#" },
  { name: "Press", href: "#" }
];

const legalLinks = [
  { name: "Privacy Policy", href: "#" },
  { name: "Terms of Service", href: "#" },
  { name: "Cookie Policy", href: "#" },
  { name: "GDPR", href: "#" }
];

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = createTimeline({ delay: 0.3 });
    
    tl.add(animations.fadeIn('.footer-content', { duration: 1 }));

  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      ref={footerRef}
      className="bg-accent-three text-white relative overflow-hidden rounded-t-[100px]"
    >
      {/* Background Image */}
      <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] opacity-100">
        <Image
          src="/x-only.png"
          alt="Background decoration"
          width={500}
          height={500}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="footer-content py-16 md:py-24">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
            {/* Company Info */}
            <div className="flex-1">
              <div className="mb-8">
                {/* Logo Image */}
                <div className="mb-6">
                  <Image
                    src="/logo.png"
                    alt="Dextektif Logo"
                    width={180}
                    height={60}
                    className="h-12 w-auto"
                    priority
                  />
                </div>
                <p className="text-white leading-relaxed text-base max-w-sm">
                  AI-powered anti-money laundering solution for decentralized exchanges on Solana blockchain.
                </p>
              </div>
              
              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center text-white hover:text-gray-200 transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center mr-3 group-hover:bg-white/20 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span>contact@dextektif.com</span>
                </div>
                <div className="flex items-center text-white hover:text-gray-200 transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center mr-3 group-hover:bg-white/20 transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span>+62 21 1234 5678</span>
                </div>
                <div className="flex items-center text-white hover:text-gray-200 transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center mr-3 group-hover:bg-white/20 transition-colors">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span>Jl. Ganesa No. 10, Coblong<br />Bandung, 40132</span>
                </div>
              </div>
            </div>

            {/* Links Section */}
            <div className="flex gap-12 lg:gap-16">
              {/* Quick Links */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-6 relative">
                  Quick Links
                  <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-white"></div>
                </h4>
                <ul className="space-y-3">
                  {quickLinks.map((link, index) => (
                    <li key={index}>
                      <a 
                        href={link.href}
                        className="text-white/80 hover:text-white hover:translate-x-1 transition-all duration-200 block"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-6 relative">
                  Company
                  <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-white"></div>
                </h4>
                <ul className="space-y-3">
                  {companyLinks.map((link, index) => (
                    <li key={index}>
                      <a 
                        href={link.href}
                        className="text-white/80 hover:text-white hover:translate-x-1 transition-all duration-200 block"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-6 relative">
                  Legal
                  <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-white"></div>
                </h4>
                <ul className="space-y-3">
                  {legalLinks.map((link, index) => (
                    <li key={index}>
                      <a 
                        href={link.href}
                        className="text-white/80 hover:text-white hover:translate-x-1 transition-all duration-200 block"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Social Links & Newsletter */}
          <div className="mt-16 pt-8 border-t border-white/20">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
              {/* Social Media */}
              <div className="flex flex-col items-start gap-4">
                <h5 className="text-white font-medium">Follow us</h5>
                <div className="flex space-x-3">
                  <a 
                    href="#" 
                    className="w-12 h-12 rounded-full bg-gray-800/50 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-600 hover:scale-105 transition-all duration-200"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a 
                    href="#" 
                    className="w-12 h-12 rounded-full bg-gray-800/50 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-600 hover:scale-105 transition-all duration-200"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a 
                    href="#" 
                    className="w-12 h-12 rounded-full bg-gray-800/50 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-600 hover:scale-105 transition-all duration-200"
                    aria-label="GitHub"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a 
                    href="#" 
                    className="w-12 h-12 rounded-full bg-gray-800/50 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-600 hover:scale-105 transition-all duration-200"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                </div>
              </div>
              
              {/* Back to top */}
              <button
                onClick={scrollToTop}
                className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-primary hover:scale-105 transition-all duration-200 group"
                aria-label="Back to top"
              >
                <ArrowUp className="w-5 h-5 group-hover:animate-bounce" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2025 Dextektif. All rights reserved.
            </p>

          </div>
        </div>
      </div>
    </footer>
  );
} 