'use client';

import { useEffect, useRef } from 'react';
import { animations, createTimeline } from '@/lib/gsap-utils';
import { Star, Quote, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// First set of testimonials (for top marquee - moving right)
const testimonialsDataTop = [
  {
    name: "Sarah Johnson",
    profile_picture: "https://randomuser.me/api/portraits/women/21.jpg",
    role: "Senior Regulator",
    organization: "OJK Indonesia",
    rating: 5,
    testimonial: "Dextektif has revolutionized our ability to monitor financial crime in real-time. The AI-powered detection system has significantly improved our compliance efficiency.",
  },
  {
    name: "Michael Chen",
    profile_picture: "https://randomuser.me/api/portraits/men/54.jpg",
    role: "CTO",
    organization: "CryptoExchange Pro",
    rating: 5,
    testimonial: "The API integration was seamless, and it helped us block high-risk wallets instantly. Our compliance team can now focus on strategic initiatives rather than manual monitoring.",
  },
  {
    name: "Ahmad Rahman",
    profile_picture: "https://randomuser.me/api/portraits/men/67.jpg",
    role: "Founder & CEO",
    organization: "SolanaDEX Indonesia",
    rating: 5,
    testimonial: "As a DEX operator, Dextektif provides the security and compliance tools we need to operate confidently in the Indonesian market. Highly recommended.",
  },
  {
    name: "Diana Putri",
    profile_picture: "https://randomuser.me/api/portraits/women/32.jpg",
    role: "Risk Manager",
    organization: "FinTech Innovations",
    rating: 5,
    testimonial: "Real-time wallet monitoring has transformed how we approach AML compliance. The accuracy of risk scoring is impressive and saves us countless hours.",
  },
  {
    name: "Bambang Suryanto",
    profile_picture: "https://randomuser.me/api/portraits/men/48.jpg",
    role: "Compliance Officer",
    organization: "Bank Digital Indonesia",
    rating: 5,
    testimonial: "Dextektif's comprehensive dashboard gives us complete visibility into suspicious transactions. The alert system is precise and actionable.",
  },
];

// Second set of testimonials (for bottom marquee - moving left)
const testimonialsDataBottom = [
  {
    name: "Sari Kusuma",
    profile_picture: "https://randomuser.me/api/portraits/women/62.jpg",
    role: "AML Specialist",
    organization: "Crypto Solutions Ltd",
    rating: 5,
    testimonial: "The automated compliance reporting feature has streamlined our regulatory submissions. We can now generate detailed reports in minutes instead of hours.",
  },
  {
    name: "Farhan Aditya",
    profile_picture: "https://randomuser.me/api/portraits/men/33.jpg",
    role: "Head of Security",
    organization: "BlockChain Finance",
    rating: 5,
    testimonial: "Integration with multiple blockchain networks gives us unprecedented insight into cross-chain transactions. Essential for modern compliance operations.",
  },
  {
    name: "Helena Wijaya",
    profile_picture: "https://randomuser.me/api/portraits/women/18.jpg",
    role: "Regulatory Affairs Manager",
    organization: "Digital Assets Corp",
    rating: 5,
    testimonial: "The machine learning algorithms continuously improve detection accuracy. False positives have decreased by 80% since implementation.",
  },
  {
    name: "Irfan Maulana",
    profile_picture: "https://randomuser.me/api/portraits/men/23.jpg",
    role: "Transaction Monitoring Lead",
    organization: "Trust Wallet Services",
    rating: 4,
    testimonial: "24/7 monitoring capabilities ensure we never miss suspicious activities. The real-time alerts have prevented multiple high-risk transactions.",
  },
  {
    name: "Nisa Aulia",
    profile_picture: "https://randomuser.me/api/portraits/women/41.jpg",
    role: "Chief Compliance Officer",
    organization: "Crypto Bank Indonesia",
    rating: 5,
    testimonial: "Dextektif's API documentation is excellent and implementation was straightforward. Support team is responsive and knowledgeable.",
  },
  {
    name: "Raka Pratama",
    profile_picture: "https://randomuser.me/api/portraits/men/90.jpg",
    role: "Financial Crime Investigator",
    organization: "Digital Investigation Unit",
    rating: 5,
    testimonial: "The forensic capabilities for wallet analysis are outstanding. We can trace complex transaction patterns with unprecedented detail and speed.",
  },
];

interface TestimonialProps {
  testimonial: {
    name: string;
    profile_picture: string;
    role: string;
    organization: string;
    rating: number;
    testimonial: string;
  };
}

const TestimonialCard: React.FC<TestimonialProps> = ({ testimonial }) => {
  // Keywords related to AML/compliance to highlight
  const keywordsToHighlight = [
    "real-time",
    "monitoring",
    "compliance",
    "detection",
    "security",
    "API",
    "integration",
    "accuracy",
    "automated",
    "alerts",
    "blockchain",
    "transactions",
    "risk",
    "suspicious",
    "prevention",
    "forensic",
  ];

  // Function to highlight keywords in text
  const highlightKeyword = (text: string) => {
    const foundKeyword = keywordsToHighlight.find((keyword) =>
      text.toLowerCase().includes(keyword.toLowerCase())
    );

    if (!foundKeyword) return text;

    const regex = new RegExp(`(${foundKeyword})`, 'gi');
    const parts = text.split(regex);

    return (
      <>
        {parts.map((part, index) => 
          part.toLowerCase() === foundKeyword.toLowerCase() ? (
            <span key={index} className="text-emerald-600 font-medium">{part}</span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <Card className="min-w-[380px] max-w-[420px] mx-4 shadow-sm rounded-3xl overflow-hidden bg-white flex flex-col h-full border-0">
      <CardContent className="pt-8 pb-6 px-7 flex flex-col justify-between h-full">
        <div>
          <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mb-4">
            <Quote className="text-emerald-500" size={24} />
          </div>

          <p className="text-gray-700 text-base leading-relaxed mb-6 whitespace-normal">
            &ldquo;{highlightKeyword(testimonial.testimonial)}&rdquo;
          </p>
        </div>

        <div>
          <div className="h-px bg-gray-200 my-4"></div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 relative rounded-full overflow-hidden">
                <img
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                  src={testimonial.profile_picture}
                />
              </div>
              <div className="ml-3">
                <div className="font-semibold text-gray-900">
                  {testimonial.name}
                </div>
                <div className="text-gray-600 text-sm">
                  {testimonial.role}
                </div>
                <div className="text-emerald-600 text-sm font-medium">
                  {testimonial.organization}
                </div>
              </div>
            </div>

            <div className="flex gap-1">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  className={
                    i < testimonial.rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-gray-200 text-gray-200"
                  }
                  size={16}
                />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = createTimeline({ delay: 0.3 });
    
    tl.add(animations.fadeIn('.testimonials-headline', { duration: 1 }))
      .add(animations.fadeIn('.testimonials-description', { duration: 0.8 }), '-=0.5');

  }, []);

  return (
    <section 
      ref={sectionRef}
      id="testimonials" 
      className="py-20 relative overflow-hidden -mt-60"
    >
      {/* Pure white base background */}
      <div className="absolute inset-0 bg-white z-0" />

      {/* Light green content area with inset margins for smooth transition */}
      <div className="absolute inset-x-0 top-[60px] bottom-[60px] bg-emerald-50/90 z-0" />

      {/* Top transition - subtle gradient from white to emerald */}
      <div className="absolute top-0 left-0 right-0 h-[80px] bg-gradient-to-b from-white to-emerald-50/90 z-0" />

      {/* Bottom transition - subtle gradient from emerald to white */}
      <div className="absolute bottom-0 left-0 right-0 h-[80px] bg-gradient-to-t from-white to-emerald-50/90 z-0" />

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-10 w-32 h-32 bg-emerald-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-10 w-48 h-48 bg-emerald-300/20 rounded-full blur-3xl"></div>

      {/* Title content */}
      <div className="max-w-5xl mx-auto text-center relative z-10 mb-16 md:mb-20">
        <div className="flex justify-center mb-4">
          <Badge className='bg-emerald-100 text-emerald-700 border-emerald-200'>
            <MessageCircle className="-ms-0.5 opacity-60" size={12} aria-hidden="true" />
            Testimonials
          </Badge>
        </div>
        <h2 className="testimonials-headline text-3xl md:text-5xl lg:text-6xl font-medium font-nohemi text-gray-900 mb-6">
          What Our Users Say
        </h2>
        <p className="testimonials-description text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Trusted by regulators and crypto businesses across Indonesia for reliable AML compliance
        </p>
      </div>

      {/* Marquee content container */}
      <div className="relative z-10">
        {/* First row - moving right - with first set of testimonials */}
        <div className="mb-12 -mx-4">
          <div className="flex animate-marquee">
            {[...testimonialsDataTop, ...testimonialsDataTop].map(
              (testimonial, idx) => (
                <div
                  key={`${testimonial.name}-${idx}`}
                  className="whitespace-normal"
                >
                  <TestimonialCard testimonial={testimonial} />
                </div>
              )
            )}
          </div>
        </div>

        {/* Second row - moving left - with second set of testimonials */}
        <div className="-mx-4">
          <div className="flex animate-marquee-reverse">
            {[...testimonialsDataBottom, ...testimonialsDataBottom].map(
              (testimonial, idx) => (
                <div
                  key={`${testimonial.name}-reverse-${idx}`}
                  className="whitespace-normal"
                >
                  <TestimonialCard testimonial={testimonial} />
                </div>
              )
            )}
          </div>
        </div>
      </div>


    </section>
  );
} 