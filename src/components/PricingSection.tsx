'use client';

import { useEffect, useRef } from 'react';
import { animations, createTimeline } from '@/lib/gsap-utils';
import { Check, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const plans = [
  {
    name: "Basic",
    price: "$500",
    period: "/month",
    description: "Perfect for small crypto businesses",
    features: [
      "10,000 API calls/month",
      "Basic wallet monitoring",
      "Email support",
      "Standard compliance reports",
      "Basic dashboard access"
    ],
    popular: false,
    color: "border-gray-200"
  },
  {
    name: "Pro",
    price: "$1,000",
    period: "/month",
    description: "Ideal for growing exchanges",
    features: [
      "100,000 API calls/month",
      "Advanced AI detection",
      "Priority support",
      "Custom compliance reports",
      "Full dashboard access",
      "Real-time alerts",
      "API webhooks"
    ],
    popular: true,
    color: "border-primer"
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large-scale operations",
    features: [
      "Unlimited API calls",
      "Custom AI models",
      "Dedicated support",
      "Custom integrations",
      "White-label solutions",
      "On-premise deployment",
      "SLA guarantees"
    ],
    popular: false,
    color: "border-gray-200"
  }
];

export default function PricingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = createTimeline({ delay: 0.3 });
    
    tl.add(animations.fadeIn('.pricing-headline', { duration: 1 }))
      .add(animations.fadeIn('.pricing-description', { duration: 0.8 }), '-=0.5')
      .add(animations.staggerIn('.pricing-card', { duration: 0.6, stagger: 0.2 }), '-=0.3');

  }, []);

  return (
    <section 
      ref={sectionRef}
      id="pricing" 
      className="py-20 md:py-32 bg-gray-50 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primer/5 via-transparent to-sekunder/5"></div>
      <div className="absolute top-1/3 left-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 right-10 w-48 h-48 bg-primer/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="pricing-headline text-3xl md:text-5xl lg:text-6xl font-medium font-nohemi text-gray-900 mb-6">
            Flexible Pricing for Every Business
          </h2>
          <p className="pricing-description text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Choose the plan that fits your needs and scale as you grow
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`pricing-card relative hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm ${
                plan.popular ? 'ring-2 ring-primer/20 scale-105' : ''
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primer text-white px-4 py-2 flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-semibold text-gray-900 mb-2">{plan.name}</CardTitle>
                <CardDescription className="text-gray-600">{plan.description}</CardDescription>
                <div className="flex items-baseline justify-center mt-4">
                  <span className="text-4xl md:text-5xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-1">{plan.period}</span>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-primer hover:bg-primer/90 text-white' 
                      : 'border-2 border-primer text-primer hover:bg-primer hover:text-white'
                  }`}
                >
                  {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-16 md:mt-20">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
                Need a Custom Solution?
              </h3>
              <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                We offer custom pricing and features for enterprise clients with specific requirements
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="default" size="lg">
                  Schedule a Demo
                </Button>
                <Button variant="outline" size="lg">
                  Contact Sales Team
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
} 