import { useEffect, useRef } from 'react';
import { useAuth } from './auth-context';

export const useAutoRefresh = () => {
  const { refreshToken, isAuthenticated } = useAuth();
  const refreshTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    const scheduleRefresh = () => {
      // Get token from localStorage
      const token = localStorage.getItem('access_token');
      if (!token) return;

      try {
        // Parse JWT to get expiration time
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Date.now() / 1000;
        const timeUntilExpiry = payload.exp - currentTime;
        
        // Refresh token 5 minutes before expiry
        const refreshTime = Math.max((timeUntilExpiry - 300) * 1000, 0);
        
        refreshTimeoutRef.current = setTimeout(() => {
          refreshToken();
        }, refreshTime);
      } catch (error) {
        console.error('Error parsing JWT token for auto-refresh:', error);
      }
    };

    // Schedule initial refresh
    scheduleRefresh();

    // Set up interval to check and schedule refresh every minute
    const intervalId = setInterval(scheduleRefresh, 60000);

    return () => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
      clearInterval(intervalId);
    };
  }, [isAuthenticated, refreshToken]);
};
