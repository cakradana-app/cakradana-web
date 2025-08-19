import { useEffect, useRef, useCallback, useState } from 'react';

// Hook untuk debounce function
export const useDebounce = <T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number
): T => {
  const timeoutRef = useRef<NodeJS.Timeout>();

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => callback(...args), delay);
    },
    [callback, delay]
  ) as T;
};

// Hook untuk throttle function
export const useThrottle = <T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number
): T => {
  const lastRun = useRef<number>(0);

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      if (now - lastRun.current >= delay) {
        callback(...args);
        lastRun.current = now;
      }
    },
    [callback, delay]
  ) as T;
};

// Hook untuk intersection observer (lazy loading)
export const useIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {}
) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(callback, options);
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [callback, options]);

  return observerRef.current;
};

// Hook untuk preload resources
export const usePreload = (urls: string[]) => {
  useEffect(() => {
    urls.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = url;
      link.as = 'fetch';
      document.head.appendChild(link);
    });
  }, [urls]);
};

// Hook untuk memory management
export const useMemoryCleanup = () => {
  useEffect(() => {
    return () => {
      // Cleanup function untuk membersihkan memory
      if (typeof window !== 'undefined' && 'gc' in window) {
        // @ts-expect-error - gc() is not standard but available in some environments
        window.gc();
      }
    };
  }, []);
};

// Hook untuk performance monitoring
export const usePerformanceMonitor = (componentName: string) => {
  const startTime = useRef<number>(Date.now());

  useEffect(() => {
    const endTime = Date.now();
    const renderTime = endTime - startTime.current;
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`${componentName} rendered in ${renderTime}ms`);
    }

    // Report to performance API if available
    if (typeof window !== 'undefined' && 'performance' in window) {
      const entry = performance.getEntriesByName(componentName)[0];
      if (entry) {
        performance.measure(`${componentName}-render`, entry.startTime.toString(), (entry.startTime + renderTime).toString());
      }
    }
  });
};

// Hook untuk image lazy loading
export const useLazyImage = (src: string, placeholder: string) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
    };
  }, [src]);

  return { imageSrc, isLoaded };
};
