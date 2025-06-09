'use client'

import React, { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, User, Sparkles } from 'lucide-react';
import SkyneMetaBallsDemo from '@/app/(main)/screen/page';

const AuthContainer = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSplash, setShowSplash] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError('');
  };

  // Helper to handle navigation and splash
  const handleRedirect = (url: string) => {
    setShowSplash(true);
    router.push(url);
  };

  // Hide splash when route changes (when redirected)
  useEffect(() => {
    setShowSplash(false);
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (isLogin) {
        // Handle login
        const result = await signIn('credentials', {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });

        if (result?.error) {
          setError('Invalid credentials. Please try again.');
        } else {
          handleRedirect('/dashboard');
          return; // Prevent setIsLoading(false) below, let splash show until navigation
        }
      } else {
        // Handle registration
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          setIsLoading(false);
          return;
        }

        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }),
        });

        if (response.ok) {
          // Auto-login after registration
          const result = await signIn('credentials', {
            email: formData.email,
            password: formData.password,
            redirect: false,
          });

          if (!result?.error) {
            handleRedirect('/welcome');
            return;
          }
        } else {
          const data = await response.json();
          setError(data.message || 'Registration failed');
        }
      }
    } catch (_) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center p-4">
      {/* Splash overlay */}
      {showSplash && (
        <SkyneMetaBallsDemo />
        // <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80">
        //   <div className="flex flex-col items-center">
        //     <Sparkles className="w-16 h-16 text-amber-600 animate-spin mb-4" />
        //     <span className="text-xl font-semibold text-amber-700">Loading...</span>
        //   </div>
        // </div>
      )}

      <div className="w-full max-w-6xl flex bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-amber-600 via-orange-600 to-red-600 p-12 flex-col justify-center items-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 text-center">
            <div className="mb-8 flex justify-center">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Sparkles className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4">Your Skin, Perfected</h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              AI-powered skincare analysis designed specifically for African skin. 
              Get personalized regimens from trusted dermatologists.
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold">60s</div>
                <div className="text-white/80">Quick Analysis</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">100%</div>
                <div className="text-white/80">Vetted Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-white/80">AI Support</div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-white/10 rounded-full"></div>
          <div className="absolute -top-8 -left-8 w-24 h-24 bg-white/5 rounded-full"></div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-gray-600">
                {isLogin 
                  ? 'Sign in to your account to continue your skincare journey'
                  : 'Join thousands who trust us with their skincare needs'
                }
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    required={!isLogin}
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                  />
                </div>
              )}

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email Address"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>

              {!isLogin && (
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    required={!isLogin}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm Password"
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              )}

              {isLogin && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                  </label>
                  <a href="#" className="text-sm text-orange-600 hover:text-orange-500">
                    Forgot password?
                  </a>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-amber-700 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-orange-600 hover:text-orange-500 font-semibold"
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>

            {!isLogin && (
              <p className="mt-6 text-xs text-gray-500 text-center">
                By creating an account, you agree to our{' '}
                <a href="#" className="text-orange-600 hover:text-orange-500">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-orange-600 hover:text-orange-500">Privacy Policy</a>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;