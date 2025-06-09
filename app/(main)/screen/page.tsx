'use client';

import MetaBalls from "@/app/components/animations/MetalBalls";
import { useState } from "react";

const SkyneMetaBallsDemo = () => {
  const [textTouched, setTextTouched] = useState(false);

  return (
    <div className="fixed top-0 left-0 w-screen z-50 h-screen bg-white ">
      <MetaBalls
        color="#C68642"
        cursorBallColor="#C68642"
        cursorBallSize={2}
        ballCount={15}
        animationSize={10}
        enableMouseInteraction={true}
        enableTransparency={true}
        hoverSmoothness={0.05}
        clumpFactor={1}
        speed={0.3}
        onTextTouch={setTextTouched}
      />
      
      {/* Stylish SKYNE text overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
        <h1 
          className={`text-8xl md:text-9xl font-black tracking-wider select-none transition-all duration-300 ${
            textTouched 
              ? 'text-transparent drop-shadow-2xl' 
              : 'text-transparent bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 bg-clip-text'
          }`}
          style={{
            textShadow: textTouched ? '3px 3px 0px #8B4513, -1px -1px 0px #8B4513, 1px -1px 0px #8B4513, -1px 1px 0px #8B4513, 1px 1px 0px #8B4513' : 'none',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            WebkitTextStroke: textTouched ? '2px #8B4513' : '0px',
          }}
        >
          SKYNE
        </h1>
      </div>
      
      {/* Additional styling overlay for extra effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div 
          className={`text-8xl md:text-9xl font-black tracking-wider transition-opacity duration-300 ${
            textTouched ? 'opacity-20' : 'opacity-0'
          }`}
          style={{
            background: 'linear-gradient(45deg, #C68642, #D4AF37, #B8860B)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'blur(1px)',
            transform: 'scale(1.02)',
          }}
        >
          SKYNE
        </div>
      </div>
    </div>
  );
};

export default SkyneMetaBallsDemo;
