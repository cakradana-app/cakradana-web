'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import PublicRoute from '@/components/PublicRoute';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('dev@cakradana.org');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const { forgotPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await forgotPassword({ email });
      setIsSuccess(true);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to send reset email. Please try again.';
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
              src="/features/auth.png"
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
                <Link 
                  href="/login" 
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Login
                </Link>
                
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
                  <h1 className="text-3xl font-bold text-gray-900">Check Your Email</h1>
                  <p className="text-gray-600">
                    We&apos;ve sent a password reset link to <strong>{email}</strong>
                  </p>
                </div>

                {/* Instructions */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
                  <p className="text-blue-800 text-sm">
                    Please check your email and click the link to reset your password. 
                    If you don&apos;t see the email, check your spam folder.
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-4">
                <Button
                  onClick={() => setIsSuccess(false)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium text-base transition-colors shadow-sm"
                >
                  Resend Email
                </Button>
                
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
            src="/features/auth.png"
            alt="Financial Intelligence Platform"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right Side - Forgot Password Form */}
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
                <h1 className="text-3xl font-bold text-gray-900">Forgot Password?</h1>
                <p className="text-gray-600">
                  Enter your email address and we&apos;ll send you a link to reset your password
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
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </Label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  placeholder="Enter your email address"
                  required
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-medium text-base transition-colors shadow-sm"
              >
                {isSubmitting ? 'Sending...' : 'Send Reset Link'}
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
