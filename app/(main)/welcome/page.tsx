"use client";

import React, { useState, useRef } from "react";
import {
  Camera,
  Upload,
  Brain,
  Droplets,
  Sun,
  Palette,
  Shield,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Sparkles,
  Target,
  TrendingUp,
  Award,
  User,
  Zap,
  Heart,
  Star,
  Share2,
} from "lucide-react";

// Mock data (since we don't have the original arrays)
const quizQuestions = [
  {
    id: "skinType",
    question: "What's your skin type?",
    multiple: false,
    options: [
      { value: "oily", label: "Oily - Shiny with large pores" },
      { value: "dry", label: "Dry - Tight, flaky, or rough" },
      { value: "combination", label: "Combination - Oily T-zone, dry cheeks" },
      { value: "sensitive", label: "Sensitive - Easily irritated or reactive" },
      { value: "normal", label: "Normal - Balanced and comfortable" },
    ],
  },
  {
    id: "skinConcerns",
    question: "What are your main skin concerns? (Select all that apply)",
    multiple: true,
    options: [
      { value: "acne", label: "Acne & Breakouts" },
      { value: "hyperpigmentation", label: "Dark Spots & Hyperpigmentation" },
      { value: "aging", label: "Fine Lines & Wrinkles" },
      { value: "dullness", label: "Dull & Uneven Skin Tone" },
      { value: "pores", label: "Large Pores" },
      { value: "redness", label: "Redness & Inflammation" },
    ],
  },
  {
    id: "budget",
    question: "What's your monthly skincare budget?",
    multiple: false,
    options: [
      { value: "low", label: "₦10,000 - ₦25,000" },
      { value: "medium", label: "₦25,000 - ₦50,000" },
      { value: "high", label: "₦50,000 - ₦100,000" },
      { value: "premium", label: "₦100,000+" },
    ],
  },
];

const mockResults = {
  hydration: { score: 72, level: "Good", description: "Your skin shows good hydration levels with room for improvement" },
  texture: { score: 68, level: "Fair", description: "Some texture irregularities detected, consistent care recommended" },
  pigmentation: { score: 85, level: "Excellent", description: "Even skin tone with minimal pigmentation concerns" },
  sunDamage: { score: 45, level: "Moderate", description: "Some sun damage present, daily SPF protection essential" },
};

interface AnalysisResults {
  hydration: { score: number; level: string; description: string };
  texture: { score: number; level: string; description: string };
  pigmentation: { score: number; level: string; description: string };
  sunDamage: { score: number; level: string; description: string };
}

const SkinDiagnosticTool = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string | string[]>>({});
  const [selfiePreview, setSelfiePreview] = useState<string | null>(null);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleQuizAnswer = (questionId: string, answer: string | string[]) => {
    setQuizAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSelfieUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setSelfiePreview(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateAIAnalysis = async () => {
    setIsAnalyzing(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setAnalysisResults(mockResults as AnalysisResults);
    setIsAnalyzing(false);
    setShowResults(true);
  };

  const generatePersonalizedRegimen = () => {
    const baseProducts = {
      cleanser: { name: "Gentle Foaming Cleanser", brand: "CeraVe", price: "₦8,500", why: "Removes impurities without stripping natural oils" },
      moisturizer: { name: "Daily Moisturizing Lotion", brand: "Neutrogena", price: "₦6,200", why: "Provides long-lasting hydration" },
      sunscreen: { name: "Broad Spectrum SPF 50", brand: "La Roche-Posay", price: "₦12,000", why: "Essential protection for Nigerian climate" },
    };

    return {
      morning: [baseProducts.cleanser, baseProducts.sunscreen],
      evening: [baseProducts.cleanser, baseProducts.moisturizer],
      totalCost: "₦32,000 - ₦45,000",
    };
  };

  const nextStep = () => {
    if (currentStep < quizQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(quizQuestions.length);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderQuizStep = () => {
    const question = quizQuestions[currentStep];
    const currentAnswer = quizAnswers[question.id];

    return (
      <div className="max-w-4xl mx-auto">
        {/* Enhanced Progress Bar */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <User className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shadow-md">
                  <Star className="w-3 h-3 text-white" />
                </div>
              </div>
              <div>
                <p className="text-lg font-bold text-gray-800">Step {currentStep + 1} of {quizQuestions.length}</p>
                <p className="text-sm text-gray-500 font-medium">Personalization Assessment</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-4xl font-black bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 bg-clip-text text-transparent">
                {Math.round(((currentStep + 1) / quizQuestions.length) * 100)}%
              </p>
              <p className="text-sm text-gray-500 font-medium">Complete</p>
            </div>
          </div>
          
          <div className="relative">
            <div className="w-full bg-gray-100 rounded-full h-4 shadow-inner">
              <div 
                className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 h-4 rounded-full transition-all duration-1000 ease-out relative shadow-lg"
                style={{ width: `${((currentStep + 1) / quizQuestions.length) * 100}%` }}
              >
                <div className="absolute right-0 top-0 w-4 h-4 bg-white rounded-full shadow-xl transform translate-x-2 flex items-center justify-center">
                  <div className="w-2 h-2 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Question Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-10 mb-12 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-amber-50 to-transparent rounded-full transform translate-x-32 -translate-y-32 opacity-60"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-50 to-transparent rounded-full transform -translate-x-24 translate-y-24 opacity-60"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-12">
             
              <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">
                {question.question}
              </h2>
              <p className="text-gray-600 text-lg font-medium">Select the option that best describes your skin</p>
            </div>

            <div className="grid gap-4">
              {question.options.map((option, index) => (
                <button
                  key={option.value}
                  onClick={() => {
                    if (question.multiple) {
                      const current = Array.isArray(currentAnswer) ? currentAnswer : [];
                      const updated = current.includes(option.value)
                        ? current.filter((v: string) => v !== option.value)
                        : [...current, option.value];
                      handleQuizAnswer(question.id, updated);
                    } else {
                      handleQuizAnswer(question.id, option.value);
                    }
                  }}
                  className={`group w-full p-6 text-left rounded-2xl border-2 transition-all duration-300 hover:scale-[1.01] relative overflow-hidden ${
                    question.multiple
                      ? Array.isArray(currentAnswer) && currentAnswer.includes(option.value)
                        ? "border-amber-400 bg-gradient-to-r from-amber-50 to-orange-50 shadow-xl shadow-amber-100"
                        : "border-gray-200 hover:border-amber-300 bg-white hover:shadow-xl hover:shadow-gray-100"
                      : currentAnswer === option.value
                      ? "border-amber-400 bg-gradient-to-r from-amber-50 to-orange-50 shadow-xl shadow-amber-100"
                      : "border-gray-200 hover:border-amber-300 bg-white hover:shadow-xl hover:shadow-gray-100"
                  }`}
                  style={{
                    animationDelay: `${index * 150}ms`,
                    animation: "fadeInUp 0.8s ease-out forwards"
                  }}
                >
                  {/* Selection indicator background */}
                  {((question.multiple && Array.isArray(currentAnswer) && currentAnswer.includes(option.value)) ||
                    (!question.multiple && currentAnswer === option.value)) && (
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-orange-500/5"></div>
                  )}
                  
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center space-x-5">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg ${
                        (question.multiple && Array.isArray(currentAnswer) && currentAnswer.includes(option.value)) ||
                        (!question.multiple && currentAnswer === option.value)
                          ? "bg-gradient-to-r from-amber-500 to-amber-600 scale-110"
                          : "bg-gray-100 group-hover:bg-gradient-to-r group-hover:from-amber-100 group-hover:to-orange-100"
                      }`}>
                        {((question.multiple && Array.isArray(currentAnswer) && currentAnswer.includes(option.value)) ||
                          (!question.multiple && currentAnswer === option.value)) ? (
                          <CheckCircle className="w-7 h-7 text-white" />
                        ) : (
                          <div className="w-4 h-4 rounded-full bg-gray-400 group-hover:bg-amber-400 transition-colors"></div>
                        )}
                      </div>
                      <div>
                        <span className="font-bold text-gray-900 text-xl leading-tight">
                          {option.label}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-amber-500 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center px-10 py-5 bg-white backdrop-blur text-gray-700 rounded-2xl hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 border border-gray-200 shadow-lg hover:shadow-xl font-semibold"
          >
            <ArrowLeft className="w-5 h-5 mr-3" />
            Previous
          </button>
          <button
            onClick={nextStep}
            disabled={!currentAnswer || (question.multiple && Array.isArray(currentAnswer) && currentAnswer.length === 0)}
            className="flex items-center px-10 py-5 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-white rounded-2xl hover:from-amber-600 hover:via-amber-700 hover:to-amber-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 font-bold"
          >
            Continue Journey
            <ArrowRight className="w-5 h-5 ml-3" />
          </button>
        </div>
      </div>
    );
  };

  const renderSelfieUpload = () => (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-12 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-50 to-transparent rounded-full transform translate-x-48 -translate-y-48 opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-50 to-transparent rounded-full transform -translate-x-32 translate-y-32 opacity-60"></div>
        
        <div className="relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 rounded-3xl mb-8 shadow-2xl">
              <Camera className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-4xl font-black text-gray-900 mb-6 tracking-tight">
              Upload Your Photo
            </h2>
            <p className="text-gray-600 text-xl font-medium max-w-3xl mx-auto leading-relaxed">
              Take or upload a clear, well-lit selfie for our advanced AI to analyze your skin and provide personalized recommendations
            </p>
          </div>

          <div className={`border-3 border-dashed rounded-3xl p-16 text-center transition-all duration-500 relative overflow-hidden ${
            selfiePreview ? "border-emerald-400 bg-gradient-to-br from-emerald-50 to-green-50" : "border-gray-300 bg-gradient-to-br from-gray-50 to-blue-50 hover:border-blue-400 hover:from-blue-50 hover:to-indigo-50"
          }`}>
            {selfiePreview ? (
              <div className="space-y-8">
                <div className="relative inline-block group">
                  <img
                    src={selfiePreview}
                    alt="Selfie preview"
                    className="mx-auto max-w-sm max-h-96 object-cover rounded-3xl shadow-2xl group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center shadow-xl">
                    <CheckCircle className="w-7 h-7 text-white" />
                  </div>
                </div>
                <div className="flex justify-center space-x-6">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-8 py-4 bg-white border-2 border-blue-400 text-blue-600 rounded-2xl hover:bg-blue-50 transition-all duration-300 font-bold shadow-lg hover:shadow-xl"
                  >
                    Change Photo
                  </button>
                  <button
                    onClick={() => setSelfiePreview(null)}
                    className="px-8 py-4 bg-gray-100 text-gray-600 rounded-2xl hover:bg-gray-200 transition-all duration-300 font-bold shadow-lg"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="w-32 h-32 mx-auto bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 rounded-3xl flex items-center justify-center mb-8 shadow-xl">
                  <Upload className="w-16 h-16 text-blue-600" />
                </div>
                <div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center px-12 py-6 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-white rounded-2xl hover:from-blue-600 hover:via-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 font-bold text-lg"
                  >
                    <Camera className="w-6 h-6 mr-4" />
                    Choose Your Best Photo
                  </button>
                  <p className="text-sm text-gray-500 mt-6 font-medium">
                    Supported formats: JPG, PNG, HEIC • Max size: 10MB
                  </p>
                </div>
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleSelfieUpload}
            className="hidden"
          />

          <div className="flex justify-between items-center mt-12">
            <button
              onClick={prevStep}
              className="flex items-center px-10 py-5 bg-white backdrop-blur text-gray-700 rounded-2xl hover:bg-gray-50 transition-all duration-300 border border-gray-200 shadow-lg hover:shadow-xl font-semibold"
            >
              <ArrowLeft className="w-5 h-5 mr-3" />
              Previous
            </button>
            <button
              onClick={simulateAIAnalysis}
              disabled={!selfiePreview}
              className="flex items-center px-12 py-5 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-white rounded-2xl hover:from-blue-600 hover:via-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 font-bold"
            >
              <Brain className="w-6 h-6 mr-3" />
              Analyze My Skin
              <Sparkles className="w-5 h-5 ml-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalyzing = () => (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-16 text-center relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full animate-pulse opacity-20"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-gradient-to-r from-blue-300 to-indigo-300 rounded-full animate-pulse opacity-20" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-r from-green-300 to-emerald-300 rounded-full animate-pulse opacity-20" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="relative z-10">
          <div className="relative mb-12">
            <div className="w-32 h-32 mx-auto relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full animate-spin opacity-20" style={{animationDuration: '3s'}}></div>
              <div className="absolute inset-2 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full animate-ping opacity-30"></div>
              <div className="relative w-full h-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full flex items-center justify-center animate-pulse shadow-2xl">
                <Brain className="w-16 h-16 text-white" />
              </div>
            </div>
          </div>
          <h2 className="text-4xl font-black text-gray-900 mb-6 tracking-tight">
            Analyzing Your Skin...
          </h2>
          <p className="text-gray-600 text-xl font-medium mb-12 leading-relaxed max-w-2xl mx-auto">
            Our advanced AI is processing your photo and quiz responses to create your personalized skincare analysis
          </p>
          <div className="flex justify-center space-x-3">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-bounce shadow-lg"
                style={{ animationDelay: `${i * 0.3}s` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderResults = () => {
    const regimen = generatePersonalizedRegimen();

    return (
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-r from-emerald-500 via-green-600 to-teal-600 rounded-3xl mb-8 shadow-2xl">
            <Award className="w-14 h-14 text-white" />
          </div>
          <h2 className="text-5xl font-black text-gray-900 mb-6 tracking-tight">
            Your Skin Analysis Results
          </h2>
          <p className="text-gray-600 text-2xl font-medium max-w-3xl mx-auto">
            Personalized insights and recommendations crafted just for you
          </p>
        </div>

        {/* Enhanced Analysis Results Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {Object.entries({
            hydration: { icon: Droplets, gradient: "from-blue-500 via-cyan-500 to-teal-500", bg: "from-blue-50 to-cyan-50" },
            texture: { icon: Palette, gradient: "from-emerald-500 via-green-500 to-lime-500", bg: "from-emerald-50 to-green-50" },
            pigmentation: { icon: Sun, gradient: "from-purple-500 via-violet-500 to-indigo-500", bg: "from-purple-50 to-violet-50" },
            sunDamage: { icon: Shield, gradient: "from-orange-500 via-red-500 to-pink-500", bg: "from-orange-50 to-red-50" }
          }).map(([key, { icon: Icon, gradient, bg }]) => {
            const result = analysisResults?.[key as keyof AnalysisResults];
            return (
              <div key={key} className={`bg-gradient-to-br ${bg} rounded-3xl shadow-xl border border-white/50 p-8 hover:transform hover:scale-105 transition-all duration-500 relative overflow-hidden`}>
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/20 rounded-full transform translate-x-10 -translate-y-10"></div>
                
                <div className="relative z-10">
                  <div className="text-center mb-6">
                    <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${gradient} rounded-3xl mb-6 shadow-xl`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="font-black text-gray-900 text-xl capitalize mb-3">
                      {key === 'sunDamage' ? 'Sun Protection' : key}
                    </h3>
                  </div>
                  
                  <div className="relative mb-6">
                    <div className="w-full bg-white/70 rounded-full h-4 shadow-inner">
                      <div
                        className={`bg-gradient-to-r ${gradient} h-4 rounded-full transition-all duration-1500 ease-out shadow-lg relative`}
                        style={{ width: `${result?.score || 0}%` }}
                      >
                        <div className="absolute right-0 top-0 w-4 h-4 bg-white rounded-full shadow-lg transform translate-x-2"></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-sm font-bold text-gray-700">{result?.level}</span>
                      <span className="text-2xl font-black text-gray-900">{result?.score}%</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-700 text-center font-medium leading-relaxed">
                    {result?.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enhanced Skincare Regimen */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-12 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-100 via-orange-100 to-pink-100"></div>
          </div>
          
          <div className="relative z-10">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-3xl mb-6 shadow-xl">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">
                Your Personalized Regimen
              </h3>
              <p className="text-gray-600 text-lg font-medium">Curated specifically for your unique skin needs</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-10">
              {/* Enhanced Morning Routine */}
              <div className="bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50 rounded-3xl p-8 border border-yellow-200 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-yellow-200/20 to-transparent rounded-full transform translate-x-16 -translate-y-16"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 via-orange-400 to-amber-500 rounded-3xl flex items-center justify-center mr-6 shadow-xl">
                      <Sun className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900 text-2xl">Morning Routine</h4>
                      <p className="text-gray-600 font-medium">Start your day with confidence</p>
                    </div>
                  </div>
                  
                  <div className="space-y-5">
                    {regimen.morning.map((product, index) => (
                      <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-yellow-100 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                        <div className="flex justify-between items-start mb-3">
                          <h5 className="font-bold text-gray-900 text-lg">{product.name}</h5>
                          <span className="text-emerald-600 font-black text-lg">{product.price}</span>
                        </div>
                        <p className="text-purple-600 font-bold mb-3">{product.brand}</p>
                        <p className="text-gray-600 font-medium leading-relaxed">{product.why}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Enhanced Evening Routine */}
              <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 rounded-3xl p-8 border border-indigo-200 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-200/20 to-transparent rounded-full transform translate-x-16 -translate-y-16"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-600 rounded-3xl flex items-center justify-center mr-6 shadow-xl">
                      <div className="w-8 h-8 bg-white rounded-full opacity-90 flex items-center justify-center">
                        <div className="w-4 h-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900 text-2xl">Evening Routine</h4>
                      <p className="text-gray-600 font-medium">Repair and restore overnight</p>
                    </div>
                  </div>
                  
                  <div className="space-y-5">
                    {regimen.evening.map((product, index) => (
                      <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-indigo-100 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                        <div className="flex justify-between items-start mb-3">
                          <h5 className="font-bold text-gray-900 text-lg">{product.name}</h5>
                          <span className="text-emerald-600 font-black text-lg">{product.price}</span>
                        </div>
                        <p className="text-purple-600 font-bold mb-3">{product.brand}</p>
                        <p className="text-gray-600 font-medium leading-relaxed">{product.why}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Cost Summary */}
            <div className="mt-12 p-8 bg-gradient-to-r from-emerald-50 via-green-50 to-teal-50 rounded-3xl border border-emerald-200 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 rounded-3xl flex items-center justify-center mr-6 shadow-xl">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="font-black text-gray-900 text-2xl">Estimated Monthly Investment</h4>
                    <p className="text-gray-600 font-medium">Based on your budget and premium Nigerian brands</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-4xl font-black bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
                    {regimen.totalCost}
                  </span>
                </div>
              </div>
            </div>

            {/* Enhanced Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 mt-12">
              <button className="flex-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white py-6 px-10 rounded-2xl hover:from-purple-600 hover:via-pink-600 hover:to-red-600 font-bold text-lg transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 flex items-center justify-center">
                <Heart className="w-6 h-6 mr-3" />
                Shop Recommended Products
              </button>
              <button className="flex-1 bg-white border-3 border-purple-300 text-purple-600 py-6 px-10 rounded-2xl hover:bg-purple-50 font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center">
                <Zap className="w-6 h-6 mr-3" />
                Get Advanced Analysis
              </button>
              <button className="bg-gray-100 border-2 border-gray-300 text-gray-600 py-6 px-8 rounded-2xl hover:bg-gray-200 font-bold transition-all duration-300 flex items-center justify-center">
                <Share2 className="w-6 h-6 mr-3" />
                Share Results
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-12 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-l from-amber-200/20 to-transparent rounded-full"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-orange-200/20 to-transparent rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-yellow-100/10 via-amber-100/10 to-orange-100/10 rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          
          <h1 className="text-6xl font-black bg-gradient-to-r from-amber-800 via-orange-900 to-yellow-800 bg-clip-text text-transparent mb-4 tracking-tight">
            Skyne AI Skin Diagnostic
          </h1>
          <p className="text-gray-700 text-2xl font-medium max-w-3xl mx-auto leading-relaxed">
            Discover your perfect skincare routine with advanced AI-powered analysis
          </p>
        </div>

        {/* Content */}
        {!showResults &&
          !isAnalyzing &&
          currentStep < quizQuestions.length &&
          renderQuizStep()}
        {!showResults &&
          !isAnalyzing &&
          currentStep === quizQuestions.length &&
          renderSelfieUpload()}
        {isAnalyzing && renderAnalyzing()}
        {showResults && renderResults()}
      </div>
    </div>
  );
};

export default SkinDiagnosticTool;
