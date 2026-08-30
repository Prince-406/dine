'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

export default function HeroSection() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = [headingRef?.current, subRef?.current, ctaRef?.current];
    els?.forEach((el, i) => {
      if (!el) return;
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      setTimeout(() => {
        if (!el) return;
        el.style.transition = 'opacity 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 200 + i * 180);
    });
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <AppImage
          src="https://images.unsplash.com/photo-1668246791341-7d30c2bbb4c3"
          alt="Dimly lit fine dining restaurant interior with warm candlelight, elegant table settings, and deep mahogany tones"
          fill
          priority
          sizes="100vw"
          className="object-cover" />
        
      </div>

      {/* Gradient Scrim */}
      <div className="absolute inset-0 z-10 bg-hero-scrim" />
      <div className="absolute inset-0 z-10 md:hidden bg-hero-scrim-mobile" />

      {/* Decorative Curve SVG */}
      <div className="absolute bottom-0 right-0 z-10 opacity-20 pointer-events-none hidden lg:block">
        <svg width="300" height="300" viewBox="0 0 300 300" fill="none">
          <path d="M300 0 C200 0 0 100 0 300" stroke="#C8965A" strokeWidth="1" strokeDasharray="4 6" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-16 pt-28 pb-20 md:pt-36 md:pb-24">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-px bg-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              New York · Est. 2018
            </span>
          </div>

          {/* Heading */}
          <h1
            ref={headingRef}
            className="font-serif text-hero-xl text-white mb-6 opacity-100">
            
            Crafted for<br />
            <span className="italic text-primary">Extraordinary</span><br />
            Moments
          </h1>

          {/* Subheading */}
          <p
            ref={subRef}
            className="text-base md:text-lg text-white/75 font-light leading-relaxed mb-10 max-w-md opacity-100">
            
            Where seasonal ingredients meet culinary artistry. Every dish tells a story — yours begins with a reservation.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 opacity-100">
            <Link href="/booking" className="btn-primary">
              Reserve Your Table
            </Link>
            <a href="#menu" className="btn-outline border-white/30 text-white hover:border-primary hover:text-primary">
              View Menu
            </a>
          </div>

          {/* Stats Row */}
          <div className="flex items-center gap-8 mt-12 pt-8 border-t border-white/10">
            {[
            { value: '7+', label: 'Years of Excellence' },
            { value: '48', label: 'Signature Dishes' },
            { value: '4.9★', label: 'Guest Rating' }]?.
            map((stat) =>
            <div key={stat?.label} className="flex flex-col">
                <span className="font-serif text-2xl text-primary">{stat?.value}</span>
                <span className="text-xs text-white/50 uppercase tracking-wider mt-0.5">{stat?.label}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-60">
        <span className="text-xs text-white uppercase tracking-[0.2em]">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/60 to-transparent" />
      </div>
    </section>);

}