import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimationOptions {
  delay?: number;
  duration?: number;
  ease?: string;
  y?: number;
  x?: number;
  scale?: number;
  opacity?: number;
  stagger?: number;
  yoyo?: boolean;
  repeat?: number;
  onUpdate?: () => void;
}

export const animations = {
  // Fade in animation
  fadeIn: (element: string | Element, options: AnimationOptions = {}) => {
    return gsap.fromTo(element, 
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6,
        ease: "power2.out",
        ...options 
      }
    );
  },

  // Scale in animation
  scaleIn: (element: string | Element, options: AnimationOptions = {}) => {
    return gsap.fromTo(element,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "back.out(1.7)",
        ...options
      }
    );
  },

  // Slide in from left
  slideInLeft: (element: string | Element, options: AnimationOptions = {}) => {
    return gsap.fromTo(element,
      { x: -100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        ...options
      }
    );
  },

  // Slide in from right
  slideInRight: (element: string | Element, options: AnimationOptions = {}) => {
    return gsap.fromTo(element,
      { x: 100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        ...options
      }
    );
  },

  // Hover scale effect
  hoverScale: (element: string | Element) => {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (!el) return;

    el.addEventListener('mouseenter', () => {
      gsap.to(el, { scale: 1.05, duration: 0.3, ease: "power2.out" });
    });

    el.addEventListener('mouseleave', () => {
      gsap.to(el, { scale: 1, duration: 0.3, ease: "power2.out" });
    });
  },

  // Stagger animation for multiple elements
  staggerIn: (elements: string | NodeList, options: AnimationOptions = {}) => {
    return gsap.fromTo(elements,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        ...options
      }
    );
  },

  // Float animation for continuous movement
  float: (element: string | Element, options: AnimationOptions = {}) => {
    return gsap.to(element, {
      y: -10,
      duration: 2,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
      ...options
    });
  },

  // Counter animation for numbers
  countUp: (element: string | Element, endValue: number, options: AnimationOptions = {}) => {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (!el) return;

    const obj = { value: 0 };
    return gsap.to(obj, {
      value: endValue,
      duration: 2,
      ease: "power2.out",
      onUpdate: () => {
        if (el instanceof HTMLElement) {
          el.textContent = Math.round(obj.value).toLocaleString();
        }
      },
      ...options
    });
  },

  // Navigation menu animation
  navMenuOpen: (element: string | Element) => {
    return gsap.fromTo(element,
      { 
        opacity: 0, 
        y: -20,
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      }
    );
  },

  // Button press animation
  buttonPress: (element: string | Element) => {
    return gsap.to(element, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.out"
    });
  }
};

// Timeline helpers
export const createTimeline = (options: { delay?: number; duration?: number } = {}) => {
  return gsap.timeline(options);
};

// Scroll trigger helper
export const createScrollTrigger = (element: string | Element, animation: AnimationOptions, options: { trigger?: string | Element; start?: string; end?: string; toggleActions?: string } = {}) => {
  return gsap.to(element, {
    ...animation,
    scrollTrigger: {
      trigger: element,
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
      ...options
    }
  });
}; 