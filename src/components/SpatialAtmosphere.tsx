import React from 'react';
import { motion } from 'motion/react';

export const SpatialAtmosphere: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" aria-hidden="true">
      {/* Twilight Dusk Sky Gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #030712 0%, #081126 28%, #141b3d 52%, #2c1a4d 70%, #581c40 85%, #883332 94%, #c2410c 98%, #ea580c 100%)',
        }}
      />

      {/* Ambient Twilight Glow & Volumetric Lights */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.35, 0.5, 0.35],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[28%] left-1/2 -translate-x-1/2 w-[1400px] h-[360px] bg-gradient-to-t from-[#ea580c]/30 via-[#c026d3]/20 to-transparent blur-[110px] rounded-full"
      />

      <motion.div
        animate={{
          x: [-20, 20, -20],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-10 right-10 w-[600px] h-[500px] bg-gradient-to-br from-[#38bdf8]/15 via-[#6366f1]/20 to-transparent blur-[130px] rounded-full"
      />

      <motion.div
        animate={{
          x: [20, -20, 20],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 -left-20 w-[550px] h-[550px] bg-gradient-to-tr from-[#a855f7]/20 via-[#3b82f6]/15 to-transparent blur-[140px] rounded-full"
      />

      {/* Twinkling Dusk Stars in Upper Atmosphere */}
      <svg className="absolute inset-0 w-full h-1/2 opacity-70" xmlns="http://www.w3.org/2000/svg">
        <circle cx="8%" cy="12%" r="1" fill="#ffffff" opacity="0.6" className="animate-pulse" />
        <circle cx="15%" cy="24%" r="1.2" fill="#e0f2fe" opacity="0.8" />
        <circle cx="22%" cy="8%" r="0.8" fill="#ffffff" opacity="0.5" />
        <circle cx="34%" cy="18%" r="1.4" fill="#bae6fd" opacity="0.9" className="animate-pulse" />
        <circle cx="45%" cy="10%" r="1" fill="#ffffff" opacity="0.7" />
        <circle cx="58%" cy="22%" r="1.1" fill="#e0e7ff" opacity="0.6" />
        <circle cx="67%" cy="6%" r="1.3" fill="#ffffff" opacity="0.8" />
        <circle cx="78%" cy="16%" r="0.9" fill="#fbcfe8" opacity="0.7" className="animate-pulse" />
        <circle cx="86%" cy="28%" r="1.5" fill="#ffffff" opacity="0.85" />
        <circle cx="92%" cy="12%" r="1" fill="#e0f2fe" opacity="0.6" />
        <circle cx="29%" cy="32%" r="0.9" fill="#ffffff" opacity="0.4" />
        <circle cx="72%" cy="30%" r="1.2" fill="#ffffff" opacity="0.5" />
      </svg>

      {/* Cinematic Shooting Stars */}
      <div className="absolute top-12 right-[25%] w-[120px] h-[2px] bg-gradient-to-r from-transparent via-sky-300 to-white animate-shooting-star opacity-80" />
      <div className="absolute top-28 right-[45%] w-[160px] h-[2px] bg-gradient-to-r from-transparent via-indigo-300 to-white animate-shooting-star-delayed opacity-75" />
      <div className="absolute top-6 right-[15%] w-[90px] h-[1.5px] bg-gradient-to-r from-transparent via-cyan-200 to-white animate-shooting-star opacity-60" style={{ animationDelay: '4.5s' }} />

      {/* Silhouette Mountain Ranges (Layer 1: Far Mountains with Misty Horizon) */}
      <svg
        className="absolute bottom-[22%] left-0 w-full h-[320px] object-cover opacity-60 pointer-events-none"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,230 L95,195 L190,225 L320,150 L440,210 L580,135 L690,190 L810,120 L940,185 L1080,130 L1210,195 L1330,155 L1440,210 L1440,320 L0,320 Z"
          fill="#3b1d3d"
          fillOpacity="0.75"
        />
      </svg>

      {/* Silhouette Mountain Ranges (Layer 2: Mid Mountain Ridges) */}
      <svg
        className="absolute bottom-[14%] left-0 w-full h-[380px] object-cover opacity-85 pointer-events-none"
        viewBox="0 0 1440 380"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,260 L140,190 L260,240 L390,165 L520,235 L640,170 L780,250 L910,150 L1040,225 L1180,180 L1320,245 L1440,190 L1440,380 L0,380 Z"
          fill="#1e1b38"
        />
        {/* Soft edge highlight on mountain peaks reflecting dusk light */}
        <path
          d="M0,260 L140,190 L260,240 L390,165 L520,235 L640,170 L780,250 L910,150 L1040,225 L1180,180 L1320,245 L1440,190"
          stroke="rgba(249, 115, 22, 0.4)"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>

      {/* Silhouette Mountain Ranges (Layer 3: Near Dark Mountain Foot / Foreground Foothills) */}
      <svg
        className="absolute bottom-0 left-0 w-full h-[300px] object-cover pointer-events-none"
        viewBox="0 0 1440 300"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,190 L180,130 L340,185 L510,110 L680,175 L860,120 L1020,180 L1210,105 L1360,165 L1440,140 L1440,300 L0,300 Z"
          fill="#0a0f1d"
        />
        <path
          d="M0,190 L180,130 L340,185 L510,110 L680,175 L860,120 L1020,180 L1210,105 L1360,165 L1440,140"
          stroke="rgba(168, 85, 247, 0.25)"
          strokeWidth="1"
          fill="none"
        />
      </svg>

      {/* Deep Ground Gradient to ensure extreme readability and glass contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030712]/50 to-[#030712]/92 pointer-events-none" />

      {/* Delicate Grid Texture / Spatial Depth Plane */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />
    </div>
  );
};
