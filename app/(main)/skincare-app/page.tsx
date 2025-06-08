'use client'

import React, { useState, useEffect } from 'react';
import { Sun, Moon, Droplets, Shield, Sparkles, Camera, RefreshCw, MapPin } from 'lucide-react';
import { PRODUCT_DATABASE } from '@/app/components/african-skin/data';

// Skincare Quiz Component
interface Product {
  name?: string;
  brand?: string;
  skinTypes?: string[];
  climate?: string;
  melaninFriendly?: boolean;
  type?: string;
}
type SkinType = 'dry' | 'oily' | 'combination' | 'sensitive';
type Concern =
  | 'hyperpigmentation'
  | 'dark spots'
  | 'acne'
  | 'dryness'
  | 'oiliness'
  | 'sensitivity'
  | 'fine lines'
  | 'dullness';
type Climate = 'tropical' | 'humid' | 'dry';
type MelaninTone = 'light-medium' | 'medium' | 'medium-deep' | 'deep';

interface SkincareQuizAnswers {
  skinType: SkinType | '';
  concerns: Concern[];
  climate: Climate | '';
  melaninTone: MelaninTone | '';
  sensitivity: string;
  currentProducts: string[];
}

interface SkincareQuizProps {
  onComplete: (answers: SkincareQuizAnswers) => void;
}

function SkincareQuiz({ onComplete }: SkincareQuizProps) {
  const [answers, setAnswers] = useState<SkincareQuizAnswers>({
    skinType: '',
    concerns: [],
    climate: '',
    melaninTone: '',
    sensitivity: '',
    currentProducts: []
  });

  const handleConcernToggle = (concern: Concern) => {
    setAnswers(prev => ({
      ...prev,
      concerns: prev.concerns.includes(concern)
        ? prev.concerns.filter((c) => c !== concern)
        : [...prev.concerns, concern]
    }));
  };

  const handleSubmit = () => {
    onComplete(answers);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Skincare Assessment</h2>
      
      <div className="space-y-6">
        {/* Skin Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">What&apos;s your skin type?</label>
          <div className="grid grid-cols-2 gap-3">
            {['dry', 'oily', 'combination', 'sensitive'].map(type => (
              <button
                key={type}
                type="button"
                onClick={() => setAnswers(prev => ({ ...prev, skinType: type as SkinType }))}
                className={`p-3 rounded-lg border-2 text-sm font-medium capitalize transition-colors ${
                  answers.skinType === type
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Skin Concerns */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Primary skin concerns (select all that apply)</label>
          <div className="grid grid-cols-2 gap-3">
            {['hyperpigmentation', 'dark spots', 'acne', 'dryness', 'oiliness', 'sensitivity', 'fine lines', 'dullness'].map(concern => (
              <button
                key={concern}
                type="button"
                onClick={() => handleConcernToggle(concern as Concern)}
                className={`p-3 rounded-lg border-2 text-sm font-medium capitalize transition-colors ${
                  answers.concerns.includes(concern as Concern)
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                {concern.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Climate */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Your climate</label>
          <div className="grid grid-cols-3 gap-3">
            {['tropical', 'humid', 'dry'].map(climate => (
              <button
                key={climate}
                type="button"
                onClick={() => setAnswers(prev => ({ ...prev, climate: climate as Climate }))}
                className={`p-3 rounded-lg border-2 text-sm font-medium capitalize transition-colors ${
                  answers.climate === climate
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                {climate}
              </button>
            ))}
          </div>
        </div>

        {/* Melanin Tone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Melanin-rich skin tone</label>
          <div className="grid grid-cols-2 gap-3">
            {['light-medium', 'medium', 'medium-deep', 'deep'].map(tone => (
              <button
                key={tone}
                type="button"
                onClick={() => setAnswers(prev => ({ ...prev, melaninTone: tone as MelaninTone }))}
                className={`p-3 rounded-lg border-2 text-sm font-medium capitalize transition-colors ${
                  answers.melaninTone === tone
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                {tone.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!answers.skinType || !answers.climate || !answers.melaninTone}
          className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Generate My Routine
        </button>
      </div>
    </div>
  );
}

// AI Scan Placeholder Component
interface AIScanComponentProps {
  onScanComplete: (results: { detectedConcerns: string[]; confidenceScore: number; recommendations: string }) => void;
}
function AIScanComponent({ onScanComplete }: AIScanComponentProps) {
  const [scanning, setScanning] = useState(false);

  const handleScan = () => {
    setScanning(true);
    // Simulate AI scan processing
    setTimeout(() => {
      setScanning(false);
      onScanComplete({
        detectedConcerns: ['hyperpigmentation', 'dryness'],
        confidenceScore: 0.85,
        recommendations: 'Focus on brightening and hydration'
      });
    }, 3000);
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-dashed border-purple-200">
      <div className="text-center">
        <Camera className="mx-auto h-12 w-12 text-purple-500 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Optional AI Skin Analysis</h3>
        <p className="text-gray-600 mb-4">Upload a photo for personalized insights (Coming Soon)</p>
        <button
          onClick={handleScan}
          disabled={scanning}
          className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50 transition-colors"
        >
          {scanning ? (
            <>
              <Sparkles className="inline w-4 h-4 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            'Start AI Scan'
          )}
        </button>
      </div>
    </div>
  );
}

// Product Recommendation Logic
interface RoutineStep {
  step: string;
  product: Product;
  order: number;
}
interface Routine {
  AM: RoutineStep[];
  PM: RoutineStep[];
}

function generateRecommendations(userProfile: SkincareQuizAnswers, season = 'default') {
  const { skinType, concerns, climate } = userProfile;
  
  // Base routine structure
  const routine: Routine = {
    AM: [],
    PM: []
  };

  // Cleanser selection
  const cleanser = PRODUCT_DATABASE.cleansers.find(p => 
    p.skinTypes.includes(skinType) && 
    (p.climate === climate || p.climate === 'all') &&
    p.melaninFriendly
  ) || PRODUCT_DATABASE.cleansers[0];

  routine.AM.push({ step: 'cleanse', product: cleanser, order: 1 });
  routine.PM.push({ step: 'cleanse', product: cleanser, order: 1 });

  // Treatment selection based on concerns
  if (concerns.includes('hyperpigmentation') || concerns.includes('dark spots')) {
    const vitaminC = PRODUCT_DATABASE.treatments.find(p => p.type === 'antioxidant');
    const brightening = PRODUCT_DATABASE.treatments.find(p => p.type === 'brightening');
    
    if (vitaminC) routine.AM.push({ step: 'treat', product: vitaminC, order: 2 });
    if (brightening) routine.PM.push({ step: 'treat', product: brightening, order: 2 });
  }

  // Moisturizer selection
  const moisturizer = PRODUCT_DATABASE.moisturizers.find(p => 
    p.skinTypes.includes(skinType) && 
    p.melaninFriendly &&
    (climate === 'humid' ? p.type === 'lightweight' : true)
  ) || PRODUCT_DATABASE.moisturizers[0];

  routine.AM.push({ step: 'moisturize', product: moisturizer, order: 3 });
  routine.PM.push({ step: 'moisturize', product: moisturizer, order: 3 });

  // Sunscreen for AM routine
  const sunscreen = PRODUCT_DATABASE.sunscreens.find(p => 
    p.skinTypes.includes(skinType) || p.skinTypes.includes('all')
  ) || PRODUCT_DATABASE.sunscreens[0];

  routine.AM.push({ step: 'protect', product: sunscreen, order: 4 });

  // Seasonal adjustments
  if (season === 'dry' && climate === 'tropical') {
    // Add extra hydration for dry season
    routine.PM.push({ 
      step: 'extra-moisture', 
      product: PRODUCT_DATABASE.moisturizers.find(p => p.type === 'rich') || PRODUCT_DATABASE.moisturizers[0],
      order: 4 
    });
  }

  // Sort by order
  routine.AM.sort((a, b) => a.order - b.order);
  routine.PM.sort((a, b) => a.order - b.order);

  return routine;
}

// Routine Display Component
// Routine Display Component
interface RoutineStep {
  step: string;
  product: Product;
  order: number;
}
interface RoutineDisplayProps {
  routine: RoutineStep[];
  timeOfDay: 'AM' | 'PM';
}
function RoutineDisplay({ routine, timeOfDay }: RoutineDisplayProps) {
  const icon = timeOfDay === 'AM' ? <Sun className="h-6 w-6 text-yellow-500" /> : <Moon className="h-6 w-6 text-indigo-500" />;
  const bgColor = timeOfDay === 'AM' ? 'from-yellow-50 to-orange-50' : 'from-indigo-50 to-purple-50';

  return (
    <div className={`bg-gradient-to-br ${bgColor} p-6 rounded-xl`}>
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="text-xl font-bold text-gray-900 ml-2">{timeOfDay} Routine</h3>
      </div>
      
      <div className="space-y-4">
        {routine.map((step, index) => (
          <div key={index} className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-semibold text-sm">{index + 1}</span>
              </div>
            </div>
            <div className="flex-grow">
              <h4 className="font-semibold text-gray-900 capitalize">{step.step.replace('-', ' ')}</h4>
              <p className="text-gray-600">{step.product.name}</p>
              <p className="text-sm text-gray-500">{step.product.brand}</p>
            </div>
            <div className="flex-shrink-0">
              {step.step === 'protect' && <Shield className="h-5 w-5 text-yellow-500" />}
              {step.step === 'moisturize' && <Droplets className="h-5 w-5 text-blue-500" />}
              {step.step === 'treat' && <Sparkles className="h-5 w-5 text-purple-500" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
// Seasonal Refresh Component
function SeasonalRefresh({ onRefresh }: { onRefresh: (season: string) => void }) {
  const [currentSeason, setCurrentSeason] = useState('default');
  useEffect(() => {
    // Simple season detection based on date
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) setCurrentSeason('spring');
    else if (month >= 5 && month <= 7) setCurrentSeason('summer');
    else if (month >= 8 && month <= 10) setCurrentSeason('fall');
    else setCurrentSeason('winter');
  }, []);

  const handleRefresh = () => {
    // In a real app, you might call weather API here
    onRefresh(currentSeason);
  };

  return (
    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <MapPin className="h-5 w-5 text-green-600 mr-2" />
          <div>
            <p className="font-medium text-green-800">Seasonal Routine Update</p>
            <p className="text-sm text-green-600">Current season: {currentSeason}</p>
          </div>
        </div>
        <button
          onClick={handleRefresh}
          className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </button>
      </div>
    </div>
  );
}

// Main App Component
export default function SkincareApp() {
  const [step, setStep] = useState('quiz');
  const [userProfile, setUserProfile] = useState<SkincareQuizAnswers | null>(null);
  interface RoutineStep { step: string; product: Product; order: number };
  interface Routine  { AM: RoutineStep[]; PM: RoutineStep[] };
  const [routine, setRoutine] = useState<Routine | null>(null);
  const [aiScanResults, setAiScanResults] = useState<{
    detectedConcerns: string[];
    confidenceScore: number;
    recommendations: string;
  } | null>(null);

  const handleQuizComplete = (answers: SkincareQuizAnswers) => {
    setUserProfile(answers);
    const generatedRoutine = generateRecommendations(answers);
    setRoutine(generatedRoutine);
    setStep('routine');
  };

  const handleAiScanComplete = (results: { detectedConcerns: string[]; confidenceScore: number; recommendations: string }) => {
    setAiScanResults(results);
    // Merge AI insights with existing profile
    if (userProfile && typeof userProfile === 'object' && 'concerns' in userProfile && Array.isArray(userProfile.concerns)) {
      const updatedProfile = {
        ...userProfile,
        concerns: [...new Set([...(userProfile.concerns as string[]), ...results.detectedConcerns])] as Concern[]
      };
      setUserProfile(updatedProfile);
      const updatedRoutine = generateRecommendations(updatedProfile);
      setRoutine(updatedRoutine);
    }
  };

  const handleSeasonalRefresh = (season: string) => {
    if (userProfile) {
      const updatedRoutine = generateRecommendations(userProfile, season);
      setRoutine(updatedRoutine);
    }
  };

  const resetApp = () => {
    setStep('quiz');
    setUserProfile(null);
    setRoutine(null);
    setAiScanResults(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">AfriSkin Care</h1>
          <p className="text-lg text-gray-600">Personalized skincare for melanin-rich skin in tropical climates</p>
        </div>

        {step === 'quiz' && (
          <div className="space-y-8">
            <SkincareQuiz onComplete={handleQuizComplete} />
            <AIScanComponent onScanComplete={handleAiScanComplete} />
          </div>
        )}

        {step === 'routine' && routine && (
          <div className="space-y-8">
            <SeasonalRefresh onRefresh={handleSeasonalRefresh} />
            
            <div className="grid md:grid-cols-2 gap-8">
              <RoutineDisplay routine={routine.AM} timeOfDay="AM" />
              <RoutineDisplay routine={routine.PM} timeOfDay="PM" />
            </div>

            {aiScanResults && (
              <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
                <h3 className="text-lg font-semibold text-purple-900 mb-2">AI Scan Insights</h3>
                <p className="text-purple-700 mb-2">Confidence: {Math.round(aiScanResults.confidenceScore * 100)}%</p>
                <p className="text-purple-600">{aiScanResults.recommendations}</p>
              </div>
            )}

            <div className="text-center">
              <button
                onClick={resetApp}
                className="bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
              >
                Start New Assessment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}