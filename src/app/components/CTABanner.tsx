'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

export default function CTABanner() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.scroll-reveal').forEach((el, i) => {
              setTimeout(() => (el as HTMLElement).classList.add('revealed'), i * 120);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full relative overflow-hidden">
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <AppImage
          src="https://images.unsplash.com/photo-1572200979854-0c51d7ac364d"
          alt="Overhead aerial view of an elegantly set restaurant table with fine china, crystal glasses, and artfully folded white napkins in deep shadow"
          fill
          sizes="100vw"
          className="object-cover" />
        
      </div>
      {/* Scrim */}
      <div className="absolute inset-0 z-10" style={{ background: 'rgba(13,13,13,0.78)' }} />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-20 md:py-28">
        <div className="max-w-2xl mx-auto text-center">
          <div className="scroll-reveal flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-px bg-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Reserve Tonight</span>
            <div className="w-8 h-px bg-primary" />
          </div>
          <h2 className="scroll-reveal font-serif text-section-heading text-white mb-5">
            Your table is waiting.<br />
            <span className="italic text-primary">Book it now.</span>
          </h2>
          <p className="scroll-reveal text-base text-white/65 font-light leading-relaxed mb-10 max-w-md mx-auto">
            Tables fill quickly, especially on weekends. Secure your preferred time and let us handle the rest — from wine pairing suggestions to dietary accommodations.
          </p>
          <div className="scroll-reveal flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking" className="btn-primary">
              Reserve Your Table
            </Link>
            <a href="tel:+12125550198" className="btn-outline border-white/30 text-white hover:border-primary hover:text-primary">
              Call +1 212 555 0198
            </a>
          </div>
          <p className="scroll-reveal mt-6 text-xs text-white/40 uppercase tracking-widest">
            Mon – Fri 5pm – 11pm · Sat – Sun 12pm – 11pm
          </p>
        </div>
      </div>
    </section>);

}