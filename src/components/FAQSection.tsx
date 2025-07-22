'use client';

import { useEffect, useRef } from 'react';
import { animations, createTimeline } from '@/lib/gsap-utils';
import { HelpCircle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const faqs = [
  {
    question: "What is Dextektif?",
    answer: "Dextektif is an AI-powered tool for detecting and preventing money laundering in crypto trading. It provides real-time monitoring, analytics, and compliance reporting for decentralized exchanges on the Solana blockchain."
  },
  {
    question: "How does the API work?",
    answer: "The API allows businesses to verify wallet addresses in real-time against a dynamic blacklist. It provides instant risk assessment and transaction monitoring capabilities with simple REST API endpoints."
  },
  {
    question: "Is Dextektif compliant with Indonesian regulations?",
    answer: "Yes, Dextektif adheres to OJK's AML/CFT guidelines and UU PDP (Personal Data Protection Law). Our system is designed to meet Indonesian regulatory requirements while ensuring data privacy."
  },
  {
    question: "What DEXs does Dextektif support?",
    answer: "Dextektif currently supports major Solana-based DEXs including Jupiter, Raydium, and Pump Fun. We continuously expand our coverage to include new platforms as they emerge."
  },
  {
    question: "How accurate is the AI detection system?",
    answer: "Our AI-powered detection system achieves 99.9% accuracy in identifying suspicious transactions and wallet activities. The system continuously learns and improves from new data patterns."
  },
  {
    question: "Can I integrate Dextektif with my existing platform?",
    answer: "Yes, Dextektif offers seamless API integration with comprehensive documentation and SDKs. Our team provides technical support to ensure smooth implementation with your existing systems."
  }
];

export default function FAQSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = createTimeline({ delay: 0.3 });
    
    tl.add(animations.fadeIn('.faq-headline', { duration: 1 }))
      .add(animations.fadeIn('.faq-description', { duration: 0.8 }), '-=0.5')
      .add(animations.staggerIn('.faq-item', { duration: 0.6, stagger: 0.1 }), '-=0.3');

  }, []);

  return (
    <section 
      ref={sectionRef}
      id="faq" 
      className="py-20 md:py-32 bg-white relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-sekunder/5 via-transparent to-primer/5"></div>
      <div className="absolute top-1/4 right-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-10 w-48 h-48 bg-primer/10 rounded-full blur-3xl"></div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="faq-headline text-3xl md:text-5xl lg:text-6xl font-medium font-nohemi text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="faq-description text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Got questions? We've got answers. Find everything you need to know about Dextektif
          </p>
        </div>

        {/* FAQ Accordion */}
        <Card className="faq-item bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-0">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-100 last:border-b-0">
                  <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                    <div className="flex items-center gap-3">
                      <HelpCircle className="w-5 h-5 text-primer flex-shrink-0" />
                      <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <p className="text-gray-700 leading-relaxed pl-8">
                      {faq.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Contact CTA */}
        <div className="text-center mt-16 md:mt-20">
          <Card className="bg-gradient-to-r from-primer to-sekunder border-0 text-white">
            <CardContent className="p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-semibold mb-4">
                Still Have Questions?
              </h3>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Our team is here to help. Get in touch with us for personalized support and guidance
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" className="bg-white text-primer hover:bg-gray-100">
                  Contact Support
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primer">
                  Schedule a Call
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
} 