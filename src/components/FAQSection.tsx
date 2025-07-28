'use client';

import { useEffect, useRef } from 'react';
import { createScrollTrigger } from '@/lib/gsap-utils';
import { HelpCircle, ArrowRight, CircleQuestionMark } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const faqs = [
  {
    id: "1",
    title: "What is Dextektif?",
    content: "Dextektif is an AI-powered solution designed to detect, monitor, and prevent money laundering activities in cryptocurrency trading. It provides real-time on-chain analysis, an interactive dashboard, and API integration to help regulators and crypto businesses ensure compliance with AML/CFT regulations."
  },
  {
    id: "2",
    title: "How does Dextektif help with AML compliance?",
    content: "Dextektif simplifies AML compliance by using advanced AI and blockchain analytics to detect suspicious wallet activities, trace fund flows, and generate automated compliance reports. It ensures businesses meet OJK's AML/CFT requirements effortlessly while protecting the digital financial ecosystem."
  },
  {
    id: "3",
    title: "Can Dextektif handle Solana's high transaction throughput?",
    content: "Yes, Dextektif is designed to process up to 50,000 transactions per second, matching Solana's high-speed blockchain capabilities. This ensures real-time monitoring and analysis without performance issues, even during peak transaction volumes."
  },
  {
    id: "4",
    title: "How can crypto businesses integrate Dextektif's API?",
    content: "Crypto businesses can easily integrate Dextektif's API into their existing systems. The API allows businesses to verify wallet addresses in real-time, check risk scores, and receive blacklist updates. Integration is seamless and comes with detailed documentation and support."
  },
  {
    id: "5",
    title: "Is Dextektif compliant with Indonesia's data privacy regulations?",
    content: "Absolutely. Dextektif adheres to Indonesia's Personal Data Protection Law (UU PDP) by using anonymized data processing methods. This ensures that all data is handled securely and in compliance with privacy regulations."
  }
];

export default function FAQSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll-triggered animations that wait for viewport (following FeaturesSection pattern)
    if (typeof window !== 'undefined') {
      // Animate FAQ header when it comes into view (20% from top)
      createScrollTrigger('.faq-header', 
        { 
          opacity: 1, 
          y: 0,
          duration: 1.2,
          delay: 0.2,
          ease: "power2.out"
        },
        {
          start: "top 80%", // Triggers when top of element is 80% down the viewport (20% visible)
          toggleActions: "play none none reverse"
        }
      );

      // Animate support section
      createScrollTrigger('.faq-support', 
        { 
          opacity: 1, 
          y: 0,
          duration: 1,
          delay: 0.6,
          ease: "power2.out"
        },
        {
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      );

      // Animate accordion
      createScrollTrigger('.faq-accordion', 
        { 
          opacity: 1, 
          y: 0,
          duration: 1,
          delay: 1.0,
          ease: "power2.out"
        },
        {
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      );
    }
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="faq" 
      className="py-20 md:py-32 bg-white relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-white"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Intro and Support */}
          <div className="space-y-8">
            {/* Header */}
            <div className="faq-header space-y-4">
              <div className="flex mb-4">
                <Badge className='bg-primary/10 text-primary border-primary/20'>
                  <CircleQuestionMark className="-ms-0.5 opacity-60" size={12} aria-hidden="true" />
                  Explore FAQs
                </Badge>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium font-nohemi text-gray-900 leading-tight">
                Common<br />questions
              </h2>
              <p className="faq-description text-lg text-gray-700 leading-relaxed">
                Find the answers to frequently asked questions here.
              </p>
            </div>

            {/* Support Section */}
            <div className="faq-support space-y-4">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-gray-700" />
                <p className="text-gray-700 font-medium">Need further support?</p>
              </div>
              <Button className="bg-accent-three hover:bg-accent-three/90 text-white font-medium px-6 py-3 rounded-lg flex items-center gap-2">
                Contact Us
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Right Column - FAQ Accordion */}
          <div className="faq-accordion">
            <Accordion
              type="single"
              collapsible
              className="w-full space-y-3"
              defaultValue="1"
            >
              {faqs.map((item) => (
                <AccordionItem
                  value={item.id}
                  key={item.id}
                  className="bg-gray-50 rounded-lg border-0 px-4 py-1 outline-none"
                >
                  <AccordionTrigger className="py-3 text-[15px] leading-6 hover:no-underline focus-visible:ring-0 font-semibold text-gray-900">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 ps-7 pb-3 leading-relaxed">
                    {item.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
} 