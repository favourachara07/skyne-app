import ChromaGrid from "@/app/components/animations/ChromaGrid";
import Image from "next/image";

export default function About() {
  const items = [
    {
      image: "https://i.pravatar.cc/300?img=1",
      title: "Azeezat Lasisi",
      subtitle: "CEO",
      handle: "@azeezat",
      borderColor: "#F59E42", // orange-400
      gradient: "linear-gradient(145deg, #F59E42, #000)",
      url: "https://github.com/azeezat",
    },
    {
      image: "/favour.jpg",
      title: "Achara Favour",
      subtitle: "CTO",
      handle: "@favourachara",
      borderColor: "#10B981",
      gradient: "linear-gradient(180deg, #10B981, #000)",
      url: "https://github.com/favourachara07",
    },
    {
      image: "https://i.pravatar.cc/300?img=2",
      title: "Ejindu Blessing",
      subtitle: "CMO",
      handle: "@ejinduoma",
      borderColor: "#6366F1", // indigo-500
      gradient: "linear-gradient(180deg, #6366F1, #000)",
      url: "https://github.com/ejindu",
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-amber-600 via-orange-500 to-amber-700">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
              About <span className="text-amber-200">Skyne</span>
            </h1>
            <p className="text-xl sm:text-2xl text-amber-100 max-w-3xl mx-auto leading-relaxed">
              Revolutionizing skincare through AI-powered personalization and expert guidance
            </p>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 opacity-20">
            <div className="w-96 h-96 rounded-full bg-gradient-to-br from-white to-amber-200 blur-3xl"></div>
          </div>
          <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 opacity-20">
            <div className="w-64 h-64 rounded-full bg-gradient-to-br from-orange-300 to-amber-400 blur-2xl"></div>
          </div>
        </div>
      </div>

      {/* Company Owners Section - Desktop (ChromaGrid) */}
      <div className="laptop:flex hidden justify-center items-center bg-gradient-to-b from-slate-50 to-white" style={{ height: "600px", position: "relative" }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(251,191,36,0.1)_0%,_transparent_70%)]"></div>
        <ChromaGrid
          items={items}
          radius={300}
          damping={0.45}
          fadeOut={0.6}
          ease="power3.out"
        />
      </div>

      {/* Company Owners Section - Mobile/Tablet */}
      <div className="1093:hidden py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Meet Our <span className="text-amber-600">Leadership</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The visionary team behind Skyne&apos;s innovative approach to skincare
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
            {items.map((member, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
                style={{
                  background: `linear-gradient(135deg, white 0%, ${member.borderColor}08 100%)`,
                }}
              >
                {/* Card glow effect */}
                <div 
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                  style={{
                    background: `linear-gradient(135deg, ${member.borderColor}20, transparent)`,
                  }}
                ></div>
                
                <div className="relative z-10">
                  {/* Profile Image */}
                  <div className="relative mb-6 mx-auto w-32 h-32">
                    <div
                      className="absolute inset-0 rounded-full blur-md opacity-60 group-hover:opacity-80 transition-opacity duration-300"
                      style={{ backgroundColor: member.borderColor }}
                    ></div>
                    <Image
                    height={128}
                    width={128}
                      src={member.image}
                      alt={member.title}
                      className="relative w-full h-full rounded-full object-cover border-4 border-white shadow-xl group-hover:scale-105 transition-transform duration-300"
                      style={{ borderColor: member.borderColor }}
                    />
                    
                    {/* Online indicator */}
                    <div
                      className="absolute bottom-2 right-2 w-6 h-6 rounded-full border-3 border-white shadow-lg"
                      style={{ backgroundColor: member.borderColor }}
                    ></div>
                  </div>
                  
                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                      {member.title}
                    </h3>
                    <p 
                      className="text-sm font-semibold mb-3 uppercase tracking-wider"
                      style={{ color: member.borderColor }}
                    >
                      {member.subtitle}
                    </p>
                    <p className="text-gray-500 text-sm mb-6 font-medium">
                      {member.handle}
                    </p>
                    
                    {/* Action Button */}
                    <a
                      href={member.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                      style={{
                        background: member.gradient,
                      }}
                    >
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                      </svg>
                      View Profile
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Vision & Mission */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-amber-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Mission Statement</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                To provide a user-friendly platform that connects skincare brands with customers, offering AI-powered personalized recommendations and expert guidance to promote healthy skin.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-amber-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Vision Statement</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                To revolutionize skincare by integrating cutting-edge AI and expert consultations, creating a seamless and personalized experience for every user.
              </p>
            </div>
          </div>

          {/* Platform Overview */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 shadow-lg border border-amber-200">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Platform Overview</h2>
            </div>
            <div className="space-y-4">
              {[
                "Offer a wide range of skincare products for all skin types, ages, and genders",
                "Provide detailed product information, customer reviews, and ratings",
                "Implement an AI-powered chatbot for personalized product recommendations",
                "Offer consultations with licensed dermatologists for expert guidance",
                "Foster a community of users for support, advice, and shared experiences",
                "Use algorithms to provide tailored product suggestions based on user preferences"
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2.5 flex-shrink-0"></div>
                  <p className="text-gray-700 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          
          {/* Operational Model */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Operational Model</h2>
            </div>
            <div className="space-y-4">
              {[
                "Partner with skincare brands to offer their products on our platform",
                "Implement a dropshipping model, where brands ship products directly to customers",
                "Develop a logistics system to ensure timely and efficient delivery"
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Streams */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Revenue Streams</h2>
            </div>
            <div className="space-y-4">
              {[
                "Commission fees from skincare brands on each sale",
                "Advertising revenue from brands and other relevant businesses"
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2.5 flex-shrink-0"></div>
                  <p className="text-gray-700 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Target Audience */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Target Audience</h2>
            </div>
            <div className="space-y-4">
              {[
                "Individuals seeking personalized skincare solutions",
                "Skincare enthusiasts looking for expert advice and community support",
                "Busy professionals seeking convenient, online skincare shopping"
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2.5 flex-shrink-0"></div>
                  <p className="text-gray-700 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Unique Selling Points */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Unique Selling Points</h2>
            </div>
            <div className="space-y-4">
              {[
                "Personalized product recommendations using AI technology",
                "Access to expert dermatologists for consultations",
                "Community support and shared experiences",
                "Wide range of skincare products for all skin types and concerns"
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2.5 flex-shrink-0"></div>
                  <p className="text-gray-700 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-500 to-amber-700 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Skincare Journey?
          </h2>
          <p className="text-xl text-amber-100 mb-8">
            Join thousands of users who trust Skyne for their skincare needs
          </p>
          <button className="bg-white text-amber-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-amber-50 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Get Started Today
          </button>
        </div>
      </div>
    </div>
  );
}