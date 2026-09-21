import './globals.css';
import type { Metadata } from 'next';
import GovTopBar from '@/components/gov/GovTopBar';
import GovMasthead from '@/components/gov/GovMasthead';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { GlobalAtmosphere } from '@/components/GlobalAtmosphere';

export const metadata: Metadata = {
  title: 'AyushSkillBridge | National Ayush Skill & Placement Portal (Ministry of Ayush)',
  description: 'Government of India national digital platform for academia-industry collaboration, skill mapping, clinical DOAP logbooks, and verified placements under Problem Statement SIH26044.',
  manifest: '/manifest.json',
  icons: {
    icon: '/icon-192.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <meta name="theme-color" content="#044e3b" />
        <meta name="color-scheme" content="dark" />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-[#030a06] text-zinc-100 selection:bg-emerald-500/30 selection:text-emerald-200 relative overflow-x-hidden">
        {/* Universal 4K Nature & ThreeUI WebGL Atmosphere */}
        <GlobalAtmosphere />
        
        {/* Government of India Official Top Bar (GIGW 3.0 Accessibility) */}
        <GovTopBar />

        {/* Official Ministry of Ayush Masthead (Ashoka Emblem, Helpline, Persona Switcher) */}
        <GovMasthead />

        {/* Government Primary Navigation Bar */}
        <Navbar />

        {/* Main Content Area with Landmark Anchor for Accessibility */}
        <main id="main-content" className="flex-grow relative z-10">
          {children}
        </main>

        {/* Official GIGW 3.0 Government Footer */}
        <Footer />
      </body>
    </html>
  );
}
