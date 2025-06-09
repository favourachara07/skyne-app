// "use client";

// import { motion } from "framer-motion";
// import { useInView } from "framer-motion";
// import Link from "next/link";
// import { ServiceCard } from "./components/common/ServiceCard";
// import anim1 from "./components/animations/facial3.json";
// import { useRouter } from "next/navigation";
// import { useRef } from "react";
// import dynamic from "next/dynamic";
// import { useSession } from "next-auth/react";

// const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
// // Animation variants
// const fadeInUp = {
//   hidden: { opacity: 0, y: 60 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.8, ease: "easeOut" },
//   },
// };

// // const fadeInLeft = {
// //   hidden: { opacity: 0, x: -60 },
// //   visible: {
// //     opacity: 1,
// //     x: 0,
// //     transition: { duration: 0.8, ease: "easeOut" },
// //   },
// // };

// // const fadeInRight = {
// //   hidden: { opacity: 0, x: 60 },
// //   visible: {
// //     opacity: 1,
// //     x: 0,
// //     transition: { duration: 0.8, ease: "easeOut" },
// //   },
// // };

// const staggerContainer = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.2,
//       delayChildren: 0.1,
//     },
//   },
// };

// const scaleIn = {
//   hidden: { scale: 0.8, opacity: 0 },
//   visible: {
//     scale: 1,
//     opacity: 1,
//     transition: { duration: 0.6, ease: "easeOut" },
//   },
// };

// const slideInFromBottom = {
//   hidden: { y: 100, opacity: 0 },
//   visible: {
//     y: 0,
//     opacity: 1,
//     transition: { duration: 0.8, ease: "easeOut" },
//   },
// };

// // Component for scroll-triggered animations
// interface AnimatedSectionProps {
//   children: React.ReactNode;
//   variants?: any;
//   className?: string;
// };

// const AnimatedSection = ({
//   children,
//   variants = fadeInUp,
//   className = "",
// }: AnimatedSectionProps) => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, margin: "-100px" });

//   return (
//     <motion.div
//       ref={ref}
//       initial="hidden"
//       animate={isInView ? "visible" : "hidden"}
//       variants={variants}
//       className={className}
//     >
//       {children}
//     </motion.div>
//   );
// };

// const Home = () => {
//   const router = useRouter();
//   const { data: session } = useSession();
//   const isAuthenticated = !!session;

//   const handleAnalysisClick = () => {
//     // router.push("/welcome");
//   };

//   const handleConsultationClick = () => {
//     router.push("/consult");
//   };

//   const handleShopClick = () => {
//     console.log("Shop products clicked");
//     router.push("/products");
//     // Navigate to marketplace
//   };

//   const handleStartAnalysis = () => {
//     console.log("Start skin analysis");
//     // Navigate to 60-second diagnostic
//   };

//   const handleExploreProducts = () => {
//     console.log("Explore products");
//     // Navigate to curated marketplace
//   };

//   // const handleBookConsultation = () => {
//   //   console.log("Book consultation");
//   //   // Navigate to expert booking
//   // };

//   return (
//     <div className="mt-10">
//       {/* Hero Section */}
//       <div className="relative flex md:flex-row items-center justify-center min-h-[85vh] overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
//         <motion.div
//           className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 1.5 }}
//         />

//         <motion.div
//           className="md:flex-1 flex justify-center items-center"
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
//         >
//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             transition={{ type: "spring", stiffness: 300, damping: 20 }}
//           >
//             <Lottie
//               animationData={anim1}
//               loop
//               autoplay
//               className="w-full md:block max-w-lg hidden drop-shadow-2xl rounded-lg"
//             />
//           </motion.div>
//         </motion.div>

//         <motion.div
//           className="md:flex-1 text-center md:text-left flex flex-col items-center md:items-start px-6 md:px-12"
//           initial={{ opacity: 0, x: 50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
//         >
//           <motion.h1
//             className="text-5xl md:text-7xl font-black text-amber-900 mb-6 leading-tight tracking-tight"
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.5 }}
//           >
//             Your Skin,
//             <br />
//             <motion.span
//               className="bg-gradient-to-r from-amber-700 to-orange-600 bg-clip-text text-transparent"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 1, delay: 1 }}
//             >
//               Perfected
//             </motion.span>
//           </motion.h1>

//           <motion.p
//             className="text-xl md:text-2xl text-amber-800/90 mb-8 max-w-2xl leading-relaxed"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.7 }}
//           >
//             AI-powered skincare analysis designed specifically for African skin.
//             Get personalized regimens from trusted Nigerian dermatologists.
//           </motion.p>

//           <motion.div
//             className="flex flex-col sm:flex-row gap-4 w-full max-w-md"
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.9 }}
//           >
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               transition={{ type: "spring", stiffness: 400, damping: 17 }}
//             >
//               {isAuthenticated ? (
//                 <Link
//                   href="/welcome"
//                   className="flex-1 bg-caramel/80 backdrop-blur-sm text-white border-2 border-amber-200 px-8 py-4 rounded-2xl shadow-xl hover:bg-caramel hover:scale-105 transition-all duration-300 font-semibold text-lg text-center block"
//                 >
//                   Start 60s Analysis
//                 </Link>
//               ) : (
//                 <Link
//                   href="/auth"
//                   className="flex-1 bg-caramel/80 backdrop-blur-sm text-white border-2 border-amber-200 px-8 py-4 rounded-2xl shadow-xl hover:bg-caramel hover:scale-105 transition-all duration-300 font-semibold text-lg text-center block"
//                 >
//                   Sign Up
//                 </Link>
//               )}
//             </motion.div>

//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               transition={{ type: "spring", stiffness: 400, damping: 17 }}
//             >
//               <Link
//                 href="/brands"
//                 className="flex-1 bg-white/90 backdrop-blur-sm text-amber-900 border-2 border-amber-200 px-8 py-4 rounded-2xl shadow-xl hover:bg-white hover:scale-105 transition-all duration-300 font-semibold text-lg text-center block"
//               >
//                 Explore Brands
//               </Link>
//             </motion.div>
//           </motion.div>
//         </motion.div>
//       </div>

//       {/* Features Section */}
//       <AnimatedSection className="bg-white py-20 px-4">
//         <div className="max-w-7xl mx-auto">
//           <motion.div
//             className="text-center mb-16"
//             variants={staggerContainer}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//           >
//             <motion.h2
//               className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
//               variants={fadeInUp}
//             >
//               Skincare Made <span className="text-amber-700">Smarter</span>
//             </motion.h2>
//             <motion.p
//               className="text-xl text-gray-600 max-w-3xl mx-auto"
//               variants={fadeInUp}
//             >
//               Combining cutting-edge AI technology with expert dermatological
//               knowledge, tailored specifically for melanin-rich skin in tropical
//               climates.
//             </motion.p>
//           </motion.div>

//           <motion.div
//             className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16"
//             variants={staggerContainer}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//           >
//             <motion.div variants={scaleIn}>
//               <motion.div
//                 whileHover={{ y: -10 }}
//                 transition={{ type: "spring", stiffness: 300, damping: 20 }}
//               >
//                 <ServiceCard
//                   imageSrc="/ai.jpeg"
//                   imageAlt="AI skin analysis technology"
//                   title="AI-Powered Analysis"
//                   description="Get instant skin insights with our 60-second diagnostic tool. Upload a selfie for AI-powered texture, hydration, and pigmentation analysis tailored for African skin."
//                   buttonText="Start Analysis"
//                   onButtonClick={handleAnalysisClick}
//                 />
//               </motion.div>
//             </motion.div>

//             <motion.div variants={scaleIn}>
//               <motion.div
//                 whileHover={{ y: -10 }}
//                 transition={{ type: "spring", stiffness: 300, damping: 20 }}
//               >
//                 <ServiceCard
//                   imageSrc="/consult.jpg"
//                   imageAlt="Nigerian dermatologist consultation"
//                   title="Expert Consultation"
//                   description="Connect with licensed Nigerian dermatologists and estheticians. Book affordable video consultations and get professional advice for your unique skin needs."
//                   buttonText="Book Consultation"
//                   onButtonClick={handleConsultationClick}
//                 />
//               </motion.div>
//             </motion.div>

//             <motion.div variants={scaleIn}>
//               <motion.div
//                 whileHover={{ y: -10 }}
//                 transition={{ type: "spring", stiffness: 300, damping: 20 }}
//               >
//                 <ServiceCard
//                   imageSrc="/cart.jpeg"
//                   imageAlt="Curated skincare products"
//                   title="Curated Marketplace"
//                   description="Shop from our carefully vetted collection of local and global brands. Every product is tested and approved for melanin-rich skin in tropical climates."
//                   buttonText="Shop Now"
//                   onButtonClick={handleShopClick}
//                 />
//               </motion.div>
//             </motion.div>
//           </motion.div>
//         </div>
//       </AnimatedSection>

//       {/* Why Skyne Section */}
//       <AnimatedSection className="bg-gradient-to-br from-amber-900 to-orange-900 py-20 px-4 text-white">
//         <div className="max-w-6xl mx-auto">
//           <motion.div
//             className="text-center mb-16"
//             variants={staggerContainer}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//           >
//             <motion.h2
//               className="text-4xl md:text-5xl font-bold mb-6"
//               variants={fadeInUp}
//             >
//               Why Choose Skyne?
//             </motion.h2>
//             <motion.p
//               className="text-xl text-amber-100 max-w-3xl mx-auto"
//               variants={fadeInUp}
//             >
//               The first skincare platform built specifically for African skin,
//               combining local expertise with global innovation.
//             </motion.p>
//           </motion.div>

//           <motion.div
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
//             variants={staggerContainer}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//           >
//             {[
//               {
//                 number: "60s",
//                 label: "Skin Analysis",
//                 description: "Quick diagnostic with instant results",
//               },
//               {
//                 number: "100%",
//                 label: "Vetted Products",
//                 description: "Every product tested for African skin",
//               },
//               {
//                 number: "24/7",
//                 label: "AI Support",
//                 description: "Personalized recommendations anytime",
//               },
//               {
//                 number: "🇳🇬",
//                 label: "Local Experts",
//                 description: "Nigerian dermatologists & estheticians",
//               },
//             ].map((item, index) => (
//               <motion.div
//                 key={index}
//                 className="text-center"
//                 variants={slideInFromBottom}
//               >
//                 <motion.div
//                   className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-4 hover:bg-white/20 transition-all duration-300"
//                   whileHover={{
//                     scale: 1.05,
//                     backgroundColor: "rgba(255,255,255,0.2)",
//                   }}
//                   transition={{ type: "spring", stiffness: 300, damping: 20 }}
//                 >
//                   <div className="text-4xl font-bold text-amber-300 mb-2">
//                     {item.number}
//                   </div>
//                   <div className="text-sm font-semibold">{item.label}</div>
//                 </motion.div>
//                 <p className="text-amber-100">{item.description}</p>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>
//       </AnimatedSection>

//       {/* How It Works Section */}
//       <AnimatedSection className="bg-gray-50 py-20 px-4">
//         <div className="max-w-6xl mx-auto">
//           <motion.div
//             className="text-center mb-16"
//             variants={staggerContainer}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//           >
//             <motion.h2
//               className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
//               variants={fadeInUp}
//             >
//               How It Works
//             </motion.h2>
//             <motion.p
//               className="text-xl text-gray-600 max-w-3xl mx-auto"
//               variants={fadeInUp}
//             >
//               Get personalized skincare in three simple steps
//             </motion.p>
//           </motion.div>

//           <motion.div
//             className="grid grid-cols-1 md:grid-cols-3 gap-8"
//             variants={staggerContainer}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//           >
//             {[
//               {
//                 step: "1",
//                 title: "Analyze",
//                 description:
//                   "Take our 60-second skin quiz and optional selfie upload. Our AI analyzes your skin type, concerns, and climate factors.",
//               },
//               {
//                 step: "2",
//                 title: "Personalize",
//                 description:
//                   "Get custom AM/PM regimens designed for melanin-rich skin. Consult with Nigerian experts for professional guidance.",
//               },
//               {
//                 step: "3",
//                 title: "Transform",
//                 description:
//                   "Shop curated products with exclusive member discounts. Track your progress and refine your routine over time.",
//               },
//             ].map((item, index) => (
//               <motion.div
//                 key={index}
//                 className="text-center"
//                 variants={fadeInUp}
//               >
//                 <motion.div
//                   className="bg-amber-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
//                   whileHover={{ scale: 1.1, rotate: 5 }}
//                   transition={{ type: "spring", stiffness: 300, damping: 20 }}
//                 >
//                   <span className="text-2xl font-bold text-amber-800">
//                     {item.step}
//                   </span>
//                 </motion.div>
//                 <motion.h3
//                   className="text-2xl font-bold text-gray-900 mb-4"
//                   initial={{ opacity: 0 }}
//                   whileInView={{ opacity: 1 }}
//                   transition={{ delay: 0.2 }}
//                 >
//                   {item.title}
//                 </motion.h3>
//                 <motion.p
//                   className="text-gray-600 leading-relaxed"
//                   initial={{ opacity: 0 }}
//                   whileInView={{ opacity: 1 }}
//                   transition={{ delay: 0.4 }}
//                 >
//                   {item.description}
//                 </motion.p>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>
//       </AnimatedSection>

//       {/* CTA Section */}
//       <AnimatedSection className="bg-gradient-to-r from-amber-700 to-orange-600 py-16 px-4">
//         <motion.div
//           className="max-w-4xl mx-auto text-center"
//           variants={staggerContainer}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//         >
//           <motion.h2
//             className="text-4xl md:text-5xl font-bold text-white mb-6"
//             variants={fadeInUp}
//           >
//             Ready to Transform Your Skin?
//           </motion.h2>
//           <motion.p
//             className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto"
//             variants={fadeInUp}
//           >
//             Join thousands of Nigerians who have discovered their perfect
//             skincare routine with Skyne.
//           </motion.p>

//           <motion.div
//             className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto"
//             variants={fadeInUp}
//           >
//             <motion.button
//               onClick={handleStartAnalysis}
//               className="bg-white text-amber-800 px-8 py-4 rounded-2xl shadow-2xl hover:scale-105 hover:bg-amber-50 transition-all duration-300 font-bold text-lg"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               transition={{ type: "spring", stiffness: 400, damping: 17 }}
//             >
//               Start Free Analysis
//             </motion.button>
//             <motion.button
//               onClick={handleExploreProducts}
//               className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-2xl hover:bg-white hover:text-amber-800 transition-all duration-300 font-semibold text-lg"
//               whileHover={{
//                 scale: 1.05,
//                 backgroundColor: "white",
//                 color: "#92400e",
//               }}
//               whileTap={{ scale: 0.95 }}
//               transition={{ type: "spring", stiffness: 400, damping: 17 }}
//             >
//               Browse Products
//             </motion.button>
//           </motion.div>
//         </motion.div>
//       </AnimatedSection>
//     </div>
//   );
// };

// export default Home;
