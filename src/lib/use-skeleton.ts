import React, { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { DashboardSkeleton } from '@/components/LoadingSkeleton';
import { 
  NetworkViewSkeleton, 
  DonationsSkeleton, 
  RiskAnalysisSkeleton, 
  UploadDataSkeleton, 
  CandidatesSkeleton, 
  ReportsSkeleton 
} from '@/components/PageSpecificSkeletons';

// Mapping antara path dan skeleton component
const SKELETON_MAP = {
  '/': DashboardSkeleton,
  '/dashboard': DashboardSkeleton,
  '/network-view': NetworkViewSkeleton,
  '/donations': DonationsSkeleton,
  '/risk-analysis': RiskAnalysisSkeleton,
  '/upload': UploadDataSkeleton,
  '/candidates': CandidatesSkeleton,
  '/reports': ReportsSkeleton,
};

export const useSkeleton = () => {
  const pathname = usePathname();

  const SkeletonComponent = useMemo(() => {
    return SKELETON_MAP[pathname as keyof typeof SKELETON_MAP] || DashboardSkeleton;
  }, [pathname]);

  const getSkeleton = () => {
    return React.createElement(SkeletonComponent);
  };

  const getSkeletonForPath = (path: string) => {
    const Component = SKELETON_MAP[path as keyof typeof SKELETON_MAP] || DashboardSkeleton;
    return React.createElement(Component);
  };

  return {
    SkeletonComponent,
    getSkeleton,
    getSkeletonForPath,
    currentPath: pathname,
  };
};

// Hook untuk preload skeleton berdasarkan menu yang sering diakses
export const useSkeletonPreload = () => {
  const pathname = usePathname();

  const preloadSkeletons = () => {
    // Preload skeleton components untuk menu yang sering diakses
    const commonPaths = ['/dashboard', '/donations', '/risk-analysis'];
    
    commonPaths.forEach(path => {
      if (path !== pathname) {
        const Component = SKELETON_MAP[path as keyof typeof SKELETON_MAP];
        if (Component) {
          // Trigger component creation to preload
          React.createElement(Component);
        }
      }
    });
  };

  return { preloadSkeletons };
};
