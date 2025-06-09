"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";

const AuthContainer = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/welcome");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center p-4">
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
              AI-powered skincare analysis designed specifically for African
              skin. Get personalized regimens from trusted dermatologists.
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

        {/* Right Side - Welcome */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome to Skyne
            </h2>
            <p className="text-gray-600 mb-8">
              Discover your perfect skincare routine with AI-powered analysis
              designed for your unique skin.
            </p>

            <button
              onClick={handleGetStarted}
              className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-amber-700 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-200"
            >
              Get Started
            </button>

            <p className="mt-6 text-xs text-gray-500 text-center">
              No account required. Start your skincare journey today.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;
