'use client';

import { ReactNode } from 'react';
import { useAutoRefresh } from './use-auto-refresh';

interface AutoRefreshWrapperProps {
  children: ReactNode;
}

export const AutoRefreshWrapper: React.FC<AutoRefreshWrapperProps> = ({ children }) => {
  useAutoRefresh();
  
  return <>{children}</>;
};
