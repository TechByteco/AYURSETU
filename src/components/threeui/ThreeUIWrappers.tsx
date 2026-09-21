"use client";

import dynamic from "next/dynamic";
import React from "react";

export const DynamicDotMatrix = dynamic(
  () =>
    import("@designcodeio/threeui/components/DotMatrixBackground").then(
      (mod) => mod.DotMatrixBackground
    ),
  { ssr: false }
);

export const DynamicStreamConvergence = dynamic(
  () =>
    import("@designcodeio/threeui/components/StreamConvergenceBackground").then(
      (mod) => mod.StreamConvergenceBackground
    ),
  { ssr: false }
);

export const DynamicEmeraldHorizon = dynamic(
  () =>
    import("@designcodeio/threeui/components/EmeraldHorizonBackground").then(
      (mod) => mod.EmeraldHorizonBackground
    ),
  { ssr: false }
);

export const DynamicOrbitalSphere = dynamic(
  () =>
    import("@designcodeio/threeui/components/OrbitalSphereBackground").then(
      (mod) => mod.OrbitalSphereBackground
    ),
  { ssr: false }
);

export const DynamicConstellationField = dynamic(
  () =>
    import("@designcodeio/threeui/components/ConstellationField").then(
      (mod) => mod.ConstellationField
    ),
  { ssr: false }
);
