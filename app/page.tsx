"use client";

import Link from "next/link";
import { ServiceCard } from "./components/common/ServiceCard";
import anim1 from "./components/animations/facial3.json";
import Lottie from "lottie-react";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  const handleAnalysisClick = () => {
    // router.push("/welcome");
  };

  const handleConsultationClick = () => {
    router.push("/consult");
  };

  const handleShopClick = () => {
    console.log("Shop products clicked");
    router.push("/products");
    // Navigate to marketplace
  };

  const handleStartAnalysis = () => {
    console.log("Start skin analysis");
    // Navigate to 60-second diagnostic
  };

  const handleExploreProducts = () => {
    console.log("Explore products");
    // Navigate to curated marketplace
  };

  // const handleBookConsultation = () => {
  //   console.log("Book consultation");
  //   // Navigate to expert booking
  // };

  return (
    <div className='mt-10'>
      {/* Hero Section */}
      <div className="relative flex md:flex-row items-center justify-center min-h-[85vh] overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        
        <div className="flex-1 flex justify-center items-center">
          <Lottie 
            animationData={anim1} 
            loop 
            autoplay 
            className="w-full md:block max-w-lg hidden drop-shadow-2xl" 
          />
        </div>
    
        <div className="md:flex-1 text-center md:text-left flex flex-col items-center md:items-start px-6 md:px-12">
          <h1 className="text-5xl md:text-7xl font-black text-amber-900 mb-6 leading-tight tracking-tight">
            Your Skin,
            <br />
            <span className="bg-gradient-to-r from-amber-700 to-orange-600 bg-clip-text text-transparent">
              Perfected
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-amber-800/90 mb-8 max-w-2xl leading-relaxed">
            AI-powered skincare analysis designed specifically for African skin. 
            Get personalized regimens from trusted Nigerian dermatologists.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            {/* flex-1 bg-gradient-to-r from-amber-700 to-amber-900 text-white px-8 py-4 rounded-2xl shadow-2xl hover:scale-105  hover:shadow-amber-500/25 transition-all duration-300 font-bold text-lg */}
            <Link
              href="/welcome"
              className="flex-1 bg-caramel/80 backdrop-blur-sm text-white border-2 border-amber-200 px-8 py-4 rounded-2xl shadow-xl hover:bg-caramel hover:scale-105 transition-all duration-300 font-semibold text-lg text-center"
            >
              Start 60s Analysis
            </Link>
            <Link
              href="/brands"
              className="flex-1 bg-white/90 backdrop-blur-sm text-amber-900 border-2 border-amber-200 px-8 py-4 rounded-2xl shadow-xl hover:bg-white hover:scale-105 transition-all duration-300 font-semibold text-lg text-center"
            >
              Explore Brands
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Skincare Made <span className="text-amber-700">Smarter</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Combining cutting-edge AI technology with expert dermatological knowledge, 
              tailored specifically for melanin-rich skin in tropical climates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {/* AI-Powered Analysis */}
            <ServiceCard
              imageSrc="/ai.jpeg"
              imageAlt="AI skin analysis technology"
              title="AI-Powered Analysis"
              description="Get instant skin insights with our 60-second diagnostic tool. Upload a selfie for AI-powered texture, hydration, and pigmentation analysis tailored for African skin."
              buttonText="Start Analysis"
              onButtonClick={handleAnalysisClick}
            />

            {/* Expert Consultation */}
            <ServiceCard
              imageSrc="/consult.jpg"
              imageAlt="Nigerian dermatologist consultation"
              title="Expert Consultation"
              description="Connect with licensed Nigerian dermatologists and estheticians. Book affordable video consultations and get professional advice for your unique skin needs."
              buttonText="Book Consultation"
              onButtonClick={handleConsultationClick}
            />

            {/* Curated Marketplace */}
            <ServiceCard
              imageSrc="/cart.jpeg"
              imageAlt="Curated skincare products"
              title="Curated Marketplace"
              description="Shop from our carefully vetted collection of local and global brands. Every product is tested and approved for melanin-rich skin in tropical climates."
              buttonText="Shop Now"
              onButtonClick={handleShopClick}
            />
          </div>
        </div>
      </div>

      {/* Why Skyne Section */}
      <div className="bg-gradient-to-br from-amber-900 to-orange-900 py-20 px-4 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose Skyne?
            </h2>
            <p className="text-xl text-amber-100 max-w-3xl mx-auto">
              The first skincare platform built specifically for African skin, 
              combining local expertise with global innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-4 hover:bg-white/20 transition-all duration-300">
                <div className="text-4xl font-bold text-amber-300 mb-2">60s</div>
                <div className="text-sm font-semibold">Skin Analysis</div>
              </div>
              <p className="text-amber-100">Quick diagnostic with instant results</p>
            </div>

            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-4 hover:bg-white/20 transition-all duration-300">
                <div className="text-4xl font-bold text-amber-300 mb-2">100%</div>
                <div className="text-sm font-semibold">Vetted Products</div>
              </div>
              <p className="text-amber-100">Every product tested for African skin</p>
            </div>

            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-4 hover:bg-white/20 transition-all duration-300">
                <div className="text-4xl font-bold text-amber-300 mb-2">24/7</div>
                <div className="text-sm font-semibold">AI Support</div>
              </div>
              <p className="text-amber-100">Personalized recommendations anytime</p>
            </div>

            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-4 hover:bg-white/20 transition-all duration-300">
                <div className="text-4xl font-bold text-amber-300 mb-2">🇳🇬</div>
                <div className="text-sm font-semibold">Local Experts</div>
              </div>
              <p className="text-amber-100">Nigerian dermatologists & estheticians</p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gray-50 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get personalized skincare in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-amber-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-amber-800">1</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Analyze</h3>
              <p className="text-gray-600 leading-relaxed">
                Take our 60-second skin quiz and optional selfie upload. 
                Our AI analyzes your skin type, concerns, and climate factors.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-amber-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-amber-800">2</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Personalize</h3>
              <p className="text-gray-600 leading-relaxed">
                Get custom AM/PM regimens designed for melanin-rich skin. 
                Consult with Nigerian experts for professional guidance.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-amber-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-amber-800">3</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Transform</h3>
              <p className="text-gray-600 leading-relaxed">
                Shop curated products with exclusive member discounts. 
                Track your progress and refine your routine over time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-amber-700 to-orange-600 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Skin?
          </h2>
          <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
            Join thousands of Nigerians who have discovered their perfect skincare routine with Skyne.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <button
              onClick={handleStartAnalysis}
              className="bg-white text-amber-800 px-8 py-4 rounded-2xl shadow-2xl hover:scale-105 hover:bg-amber-50 transition-all duration-300 font-bold text-lg"
            >
              Start Free Analysis
            </button>
            <button
              onClick={handleExploreProducts}
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-2xl hover:bg-white hover:text-amber-800 transition-all duration-300 font-semibold text-lg"
            >
              Browse Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;