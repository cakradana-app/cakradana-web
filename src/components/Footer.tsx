'use client';

import { useEffect, useRef } from 'react';
import { animations, createTimeline } from '@/lib/gsap-utils';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Twitter, 
  Linkedin, 
  Github,
  ArrowUp 
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
      className="bg-gray-900 text-white relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primer/10 via-transparent to-sekunder/10"></div>
      <div className="absolute top-1/4 left-10 w-32 h-32 bg-primer/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-10 w-48 h-48 bg-sekunder/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="footer-content py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Dextektif</h3>
                <p className="text-gray-400 leading-relaxed">
                  AI-powered anti-money laundering solution for decentralized exchanges on Solana blockchain.
                </p>
              </div>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center text-gray-400">
                  <Mail className="w-4 h-4 mr-3" />
                  <span>contact@dextektif.com</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <Phone className="w-4 h-4 mr-3" />
                  <span>+62 21 1234 5678</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <MapPin className="w-4 h-4 mr-3" />
                  <span>Jakarta, Indonesia</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Company</h4>
              <ul className="space-y-3">
                {companyLinks.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Legal</h4>
              <ul className="space-y-3">
                {legalLinks.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex space-x-4 mb-4 md:mb-0">
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-primer transition-all duration-200"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-primer transition-all duration-200"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-primer transition-all duration-200"
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>
              
              <button
                onClick={scrollToTop}
                className="w-10 h-10 rounded-full bg-primer flex items-center justify-center text-white hover:bg-primer/90 transition-all duration-200"
              >
                <ArrowUp className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-800 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Dextektif. All rights reserved. | Made with ❤️ in Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
} 