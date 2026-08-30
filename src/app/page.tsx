import React from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import MenuHighlights from './components/MenuHighlights';
import EventTabs from './components/EventTabs';
import CTABanner from './components/CTABanner';

export default function HomePage() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-1">
          <HeroSection />
          <AboutSection />
          <MenuHighlights />
          <EventTabs />
          <CTABanner />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}