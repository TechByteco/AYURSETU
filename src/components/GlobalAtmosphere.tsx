'use client';

import React from 'react';
import { DynamicStreamConvergence } from '@/components/threeui/ThreeUIWrappers';

export function GlobalAtmosphere() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
      {/* 4K UHD Mountain Nature Backdrop */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
        style={{
          backgroundImage: "url('/nature-bg.jpg')",
          transform: "translateZ(0)",
        }}
      />

      {/* ThreeUI Living Energy Stream — subtle WebGL aura over peaks */}
      <div className="absolute inset-0 pointer-events-none opacity-15 overflow-hidden">
        <DynamicStreamConvergence speed={0.25} opacity={0.3} hue={145} fidelity={0.35} />
      </div>

      {/* Atmospheric dark emerald glass veil (48% opacity) ensuring crystal clear contrast for text & cards */}
      <div className="absolute inset-0 bg-[#030d07]/50 backdrop-blur-[0.5px]" />

      {/* Radial depth light vignettes */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020a05]/60 via-transparent to-[#020a05]/80" />

      {/* Ambient glowing energy blooms */}
      <div className="absolute top-0 left-1/4 w-[750px] h-[550px] bg-emerald-500/10 rounded-full blur-[150px]" />
      <div className="absolute top-1/3 right-0 w-[550px] h-[550px] bg-teal-500/8 rounded-full blur-[160px]" />
      <div className="absolute bottom-0 left-1/3 w-[800px] h-[450px] bg-amber-500/8 rounded-full blur-[160px]" />
    </div>
  );
}
