'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import PublicRoute from '@/components/PublicRoute';
import { useSearchParams } from 'next/navigation';

function ChangePasswordContent() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [token, setToken] = useState('');
  
  const { changePassword } = useAuth();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get token from URL query parameter
    const tokenFromUrl = searchParams.get('token');
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (!token) {
      setError('Invalid or missing reset token');
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      await changePassword({ password, token });
      setIsSuccess(true);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to change password. Please try again.';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <PublicRoute>
        <div className="min-h-screen flex">
          {/* Left Side - Background Image */}
          <div className="hidden lg:flex lg:w-1/2 relative lg:fixed lg:left-0 lg:top-0 lg:h-screen overflow-hidden">
            <Image
              src="/features/Auth.png"
              alt="Financial Intelligence Platform"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Right Side - Success Message */}
          <div className="w-full lg:w-1/2 lg:ml-[50%] flex items-center justify-center p-8 bg-white min-h-screen">
            <div className="w-full max-w-md space-y-8 text-center">
              {/* Header */}
              <div className="space-y-6">
                {/* Logo */}
                <div className="flex justify-center">
                  <Image
                    src="/x-only.png"
                    alt="Logo"
                    width={48}
                    height={48}
                    className="w-12 h-12 object-contain"
                  />
                </div>

                {/* Success Icon */}
                <div className="flex justify-center">
                  <CheckCircle className="w-16 h-16 text-green-500" />
                </div>

                {/* Title */}
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold text-gray-900">Password Changed!</h1>
                  <p className="text-gray-600">
                    Your password has been successfully updated. You can now log in with your new password.
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-4">
                <Link href="/login">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium text-base transition-colors shadow-sm">
                    Go to Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </PublicRoute>
    );
  }

  if (!token) {
    return (
      <PublicRoute>
        <div className="min-h-screen flex">
          {/* Left Side - Background Image */}
          <div className="hidden lg:flex lg:w-1/2 relative lg:fixed lg:left-0 lg:top-0 lg:h-screen overflow-hidden">
            <Image
              src="/features/Auth.png"
              alt="Financial Intelligence Platform"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Right Side - Error Message */}
          <div className="w-full lg:w-1/2 lg:ml-[50%] flex items-center justify-center p-8 bg-white min-h-screen">
            <div className="w-full max-w-md space-y-8 text-center">
              {/* Header */}
              <div className="space-y-6">
                {/* Logo */}
                <div className="flex justify-center">
                  <Image
                    src="/x-only.png"
                    alt="Logo"
                    width={48}
                    height={48}
                    className="w-12 h-12 object-contain"
                  />
                </div>

                {/* Error Icon */}
                <div className="flex justify-center">
                  <AlertCircle className="w-16 h-16 text-red-500" />
                </div>

                {/* Title */}
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold text-gray-900">Invalid Link</h1>
                  <p className="text-gray-600">
                    This password reset link is invalid or has expired. Please request a new one.
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-4">
                <Link href="/forgot-password">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium text-base transition-colors shadow-sm">
                    Request New Reset Link
                  </Button>
                </Link>
                
                <Link 
                  href="/login" 
                  className="block text-blue-600 hover:text-blue-700 font-medium"
                >
                  Back to Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </PublicRoute>
    );
  }

  return (
    <PublicRoute>
      <div className="min-h-screen flex">
        {/* Left Side - Background Image */}
        <div className="hidden lg:flex lg:w-1/2 relative lg:fixed lg:left-0 lg:top-0 lg:h-screen overflow-hidden">
          <Image
            src="/features/Auth.png"
            alt="Financial Intelligence Platform"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right Side - Change Password Form */}
        <div className="w-full lg:w-1/2 lg:ml-[50%] flex items-center justify-center p-8 bg-white min-h-screen">
          <div className="w-full max-w-md space-y-8">
            {/* Header */}
            <div className="space-y-6">
              <Link 
                href="/login" 
                className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Login
              </Link>
              
              {/* Logo */}
              <div className="flex justify-start">
                <Image
                  src="/x-only.png"
                  alt="Logo"
                  width={48}
                  height={48}
                  className="w-12 h-12 object-contain"
                />
              </div>

              {/* Title */}
              <div className="text-left space-y-2">
                <h1 className="text-3xl font-bold text-gray-900">Change Password</h1>
                <p className="text-gray-600">
                  Enter your new password below
                </p>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <span className="text-red-700 text-sm">{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  New Password
                </Label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    placeholder="Enter your new password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                  Confirm New Password
                </Label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    placeholder="Confirm your new password"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-medium text-base transition-colors shadow-sm"
              >
                {isSubmitting ? 'Changing Password...' : 'Change Password'}
              </Button>
            </form>

            {/* Back to Login */}
            <div className="text-center">
              <p className="text-gray-600">
                Remember your password?{' '}
                <Link 
                  href="/login" 
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </PublicRoute>
  );
}

export default function ChangePasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <ChangePasswordContent />
    </Suspense>
  );
}
