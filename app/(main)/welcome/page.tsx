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
} from "lucide-react";
import Image from "next/image";
import { mockResults, quizQuestions } from "@/app/components/welcome/array";

interface AnalysisResults {
  hydration: { score: number; level: string; description: string };
  texture: { score: number; level: string; description: string };
  pigmentation: { score: number; level: string; description: string };
  sunDamage: { score: number; level: string; description: string };
}

const SkinDiagnosticTool = () => {
  const [currentStep, setCurrentStep] = useState(0);
  // Define a type for quiz answers: string for single, string[] for multiple
  type QuizAnswerValue = string | string[];
  const [quizAnswers, setQuizAnswers] = useState<Record<string, QuizAnswerValue>>({});
  const [selfiePreview, setSelfiePreview] = useState<string | null>(null);
  const [analysisResults, setAnalysisResults] =
    useState<AnalysisResults | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Specify type for answer parameter
  const handleQuizAnswer = (questionId: string, answer: QuizAnswerValue) => {
    setQuizAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleSelfieUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          setSelfiePreview(
            typeof e.target.result === "string" ? e.target.result : null
          );
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateAIAnalysis = async () => {
    setIsAnalyzing(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Mock AI analysis results

    setAnalysisResults(mockResults as AnalysisResults);
    setIsAnalyzing(false);
    setShowResults(true);
  };

  const generatePersonalizedRegimen = () => {
    const { skinConcerns } = quizAnswers;

    const baseProducts = {
      cleanser: {
        name: "Gentle Foaming Cleanser",
        brand: "CeraVe",
        price: "₦8,500",
        why: "Removes impurities without stripping natural oils",
      },
      moisturizer: {
        name: "Daily Moisturizing Lotion",
        brand: "Neutrogena",
        price: "₦6,200",
        why: "Provides long-lasting hydration for your skin type",
      },
      sunscreen: {
        name: "Broad Spectrum SPF 50",
        brand: "La Roche-Posay",
        price: "₦12,000",
        why: "Essential protection for Nigerian climate",
      },
    };

    const additionalProducts = [];

    if (skinConcerns?.includes("acne")) {
      additionalProducts.push({
        name: "Salicylic Acid Treatment",
        brand: "The Ordinary",
        price: "₦4,800",
        why: "Targets acne and prevents future breakouts",
      });
    }

    if (skinConcerns?.includes("hyperpigmentation")) {
      additionalProducts.push({
        name: "Vitamin C Serum",
        brand: "Olay",
        price: "₦9,500",
        why: "Brightens skin and reduces dark spots",
      });
    }

    return {
      morning: [
        baseProducts.cleanser,
        baseProducts.sunscreen,
        ...additionalProducts.slice(0, 1),
      ],
      evening: [
        baseProducts.cleanser,
        baseProducts.moisturizer,
        ...additionalProducts.slice(1),
      ],
      totalCost: "₦32,000 - ₦45,000",
    };
  };

  const nextStep = () => {
    if (currentStep < quizQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(quizQuestions.length); // Move to selfie upload
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
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-500">
              Question {currentStep + 1} of {quizQuestions.length}
            </span>
            <div className="flex space-x-1">
              {quizQuestions.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index <= currentStep ? "bg-chestnut" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {question.question}
          </h2>
        </div>

        <div className="space-y-3">
          {question.options.map((option) => (
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
              className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                question.multiple
                  ? currentAnswer?.includes(option.value)
                    ? "border-chestnut bg-goldBrown/20"
                    : "border-gray-200 hover:border-gray-300"
                  : currentAnswer === option.value
                  ? "border-chestnut bg-goldBrown/20"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-800">
                  {option.label}
                </span>
                {question.multiple && currentAnswer?.includes(option.value) && (
                  <CheckCircle className="w-5 h-5 text-chestnut" />
                )}
                {!question.multiple && currentAnswer === option.value && (
                  <CheckCircle className="w-5 h-5 text-chestnut" />
                )}
              </div>
            </button>
          ))}
        </div>

        <div className="flex justify-between mt-8">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center px-6 py-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </button>
          <button
            onClick={nextStep}
            disabled={
              !currentAnswer ||
              (question.multiple && currentAnswer.length === 0)
            }
            className="flex items-center px-6 py-3 bg-cocoa text-white rounded-lg hover:bg-caramel disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    );
  };

  const renderSelfieUpload = () => (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Upload Your Selfie (Optional)
      </h2>
      <p className="text-gray-600 mb-6">
        Upload a clear selfie for AI-powered skin analysis. This will help us
        provide more accurate recommendations.
      </p>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        {selfiePreview ? (
          <div className="space-y-4">
            <Image
              width={300}
              height={300}
              src={selfiePreview}
              alt="Selfie preview"
              className="mx-auto max-w-xs max-h-64 object-cover rounded-lg"
            />
            <div className="space-x-4">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-mahogany text-white rounded-lg hover:bg-chestnut"
              >
                Change Photo
              </button>
              <button
                onClick={() => {
                  setSelfiePreview(null);
                }}
                className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <Camera className="w-16 h-16 text-gray-400 mx-auto" />
            <div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center mx-auto px-6 py-3 bg-caramel text-white rounded-lg hover:bg-mahogany transition-all"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Selfie
              </button>
              <p className="text-sm text-gray-500 mt-2">
                Supported formats: JPG, PNG (Max 5MB)
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

      <div className="flex justify-between mt-8">
        <button
          onClick={prevStep}
          className="flex items-center px-6 py-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </button>
        <button
          onClick={simulateAIAnalysis}
          className="flex items-center px-6 py-3 bg-caramel text-white rounded-lg hover:bg-cocoa"
        >
          <Brain className="w-4 h-4 mr-2" />
          Analyze My Skin
        </button>
      </div>
    </div>
  );

  const renderAnalyzing = () => (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg text-center">
      <div className="animate-spin w-16 h-16 border-4 border-goldBrown border-t-transparent rounded-full mx-auto mb-6"></div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Analyzing Your Skin...
      </h2>
      <p className="text-gray-600">
        Our AI is processing your selfie and quiz responses to create your
        personalized skincare analysis.
      </p>
    </div>
  );

  const renderResults = () => {
    const regimen = generatePersonalizedRegimen();

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Analysis Results */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Brain className="w-6 h-6 text-blue-600 mr-2" />
            Your Skin Analysis Results
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Hydration */}
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Droplets className="w-5 h-5 text-blue-600 mr-2" />
                <h3 className="font-semibold text-gray-800">Hydration Level</h3>
              </div>
              <div className="flex items-center mb-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{
                      width: `${analysisResults?.hydration?.score ?? 0}%`,
                    }}
                  ></div>
                </div>
                <span className="text-sm font-medium">
                  {analysisResults?.hydration?.score ?? 0}%
                </span>
              </div>
              <p className="text-sm text-gray-600">
                {analysisResults?.hydration?.description ?? ""}
              </p>
            </div>

            {/* Texture */}
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Palette className="w-5 h-5 text-green-600 mr-2" />
                <h3 className="font-semibold text-gray-800">Skin Texture</h3>
              </div>
              <div className="flex items-center mb-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{
                      width: `${analysisResults?.texture?.score ?? 0}%`,
                    }}
                  ></div>
                </div>
                <span className="text-sm font-medium">
                  {analysisResults?.texture?.score ?? 0}%
                </span>
              </div>
              <p className="text-sm text-gray-600">
                {analysisResults?.texture?.description ?? ""}
              </p>
            </div>

            {/* Pigmentation */}
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Sun className="w-5 h-5 text-purple-600 mr-2" />
                <h3 className="font-semibold text-gray-800">Pigmentation</h3>
              </div>
              <div className="flex items-center mb-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                  <div
                    className="bg-purple-600 h-2 rounded-full"
                    style={{
                      width: `${analysisResults?.pigmentation?.score ?? 0}%`,
                    }}
                  ></div>
                </div>
                <span className="text-sm font-medium">
                  {analysisResults?.pigmentation?.score ?? 0}%
                </span>
              </div>
              <p className="text-sm text-gray-600">
                {analysisResults?.pigmentation?.description ?? ""}
              </p>
            </div>

            {/* Sun Damage */}
            <div className="bg-orange-50 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Shield className="w-5 h-5 text-orange-600 mr-2" />
                <h3 className="font-semibold text-gray-800">Sun Damage</h3>
              </div>
              <div className="flex items-center mb-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                  <div
                    className="bg-orange-600 h-2 rounded-full"
                    style={{
                      width: `${analysisResults?.sunDamage?.score ?? 0}%`,
                    }}
                  ></div>
                </div>
                <span className="text-sm font-medium">
                  {analysisResults?.sunDamage?.score ?? 0}%
                </span>
              </div>
              <p className="text-sm text-gray-600">
                {analysisResults?.sunDamage?.description ?? ""}
              </p>
            </div>
          </div>
        </div>

        {/* Personalized Regimen */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Your Personalized Skincare Regimen
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Morning Routine */}
            <div className="bg-yellow-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                <Sun className="w-5 h-5 text-yellow-600 mr-2" />
                Morning Routine
              </h3>
              <div className="space-y-3">
                {regimen.morning.map((product, index) => (
                  <div key={index} className="bg-white rounded-lg p-3 border">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-800">
                        {product.name}
                      </h4>
                      <span className="text-green-600 font-semibold">
                        {product.price}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-1">
                      {product.brand}
                    </p>
                    <p className="text-sm text-gray-600">{product.why}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Evening Routine */}
            <div className="bg-indigo-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                <div className="w-5 h-5 bg-indigo-600 rounded-full mr-2"></div>
                Evening Routine
              </h3>
              <div className="space-y-3">
                {regimen.evening.map((product, index) => (
                  <div key={index} className="bg-white rounded-lg p-3 border">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-800">
                        {product.name}
                      </h4>
                      <span className="text-green-600 font-semibold">
                        {product.price}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-1">
                      {product.brand}
                    </p>
                    <p className="text-sm text-gray-600">{product.why}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-800">
                Estimated Monthly Cost:
              </span>
              <span className="text-xl font-bold text-green-600">
                {regimen.totalCost}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Based on your budget preference and local market prices in
              Nigeria.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            <button
              onClick={() => {
                // Collect product names and brands from regimen
                const allProducts = [...regimen.morning, ...regimen.evening];
                const names = Array.from(
                  new Set(allProducts.map((p) => p.name))
                ).join(",");
                const brands = Array.from(
                  new Set(allProducts.map((p) => p.brand))
                ).join(",");
                // Redirect with query params for name and brand
                window.location.href = `/products?names=${encodeURIComponent(
                  names
                )}&brands=${encodeURIComponent(brands)}`;
              }}
              className="flex-1 border-cocoa/80 border-2 text-cocoa/80 py-3 px-6 rounded-lg hover:bg-cocoa font-medium transition-all hover:text-white"
            >
              Shop Recommended Products
            </button>
            <button className="flex-1 bg-cocoa/80 text-white py-3 px-6 rounded-lg hover:bg-cocoa font-medium">
              Book Expert Consultation
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#a67b50a1] via-white to-purple-50 py-8 px-4">
      {/*  background: "linear-gradient(135deg, #D1A27A 0%, #B98560 50%, #6B3F33 100%)" */}
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-amber-800 mb-2">
            Skyne AI Skin Diagnostic
          </h1>
          <p className="text-gray-600 text-lg">
            Discover your perfect skincare routine with AI-powered analysis
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
