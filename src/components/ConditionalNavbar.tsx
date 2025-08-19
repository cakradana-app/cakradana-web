'use client';

import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import Navbar from './Navbar';
import DashboardNavbar from './DashboardNavbar';

export default function ConditionalNavbar() {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();
  
  // Show dashboard navbar for authenticated users on dashboard pages
  if (isAuthenticated && (pathname.startsWith('/dashboard') || pathname.startsWith('/candidates') || pathname.startsWith('/donations') || pathname.startsWith('/reports') || pathname.startsWith('/risk-analysis') || pathname.startsWith('/network-view') || pathname.startsWith('/upload'))) {
    return <DashboardNavbar />;
  }
  
  // Show main navbar for home page
  if (pathname === '/') {
    return <Navbar />;
  }
  
  // Don't show navbar for auth pages
  if (pathname.startsWith('/login') || pathname.startsWith('/signup') || pathname.startsWith('/forgot-password')) {
    return null;
  }
  
  return null;
}