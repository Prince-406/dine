'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.scroll-reveal').forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).classList.add('revealed');
              }, i * 120);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="w-full py-20 md:py-28 overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        {/* Top: Asymmetric split — text 60 / image 40 */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 items-center mb-20 md:mb-28">
          {/* Text col (3/5) */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <div className="scroll-reveal flex items-center gap-3">
              <div className="w-8 h-px bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Our Philosophy</span>
            </div>
            <h2 className="scroll-reveal font-serif text-section-heading text-foreground">
              A dining experience<br />
              <span className="italic text-primary">rooted in craft</span>
            </h2>
            <p className="scroll-reveal text-base md:text-lg text-muted-foreground font-light leading-relaxed max-w-lg">
              Dine was born from a singular obsession: that every meal should feel like a memory in the making. Our chefs source exclusively from family farms within 150 miles of Manhattan, changing the menu with each season's best.
            </p>
            <p className="scroll-reveal text-sm text-muted-foreground font-light leading-relaxed max-w-lg">
              From the hand-rolled pasta to the wood-fired proteins, every plate reflects weeks of testing, tasting, and refining. We believe great food is a conversation between the kitchen and the guest — one we take very seriously.
            </p>
            <div className="scroll-reveal flex flex-col sm:flex-row gap-6 mt-2">
              {[
              { value: '150mi', label: 'Sourcing Radius' },
              { value: '100%', label: 'Seasonal Menu' },
              { value: '12', label: 'Partner Farms' }].
              map((s) =>
              <div key={s.label} className="flex flex-col gap-1">
                  <span className="font-serif text-3xl text-primary">{s.value}</span>
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">{s.label}</span>
                </div>
              )}
            </div>
            <div className="scroll-reveal mt-2">
              <Link href="/booking" className="btn-outline">
                Meet Our Chef
              </Link>
            </div>
          </div>

          {/* Image col (2/5) */}
          <div className="lg:col-span-2 scroll-reveal">
            <div className="relative card-hover-image overflow-hidden rounded-2xl aspect-[3/4]">
              <AppImage
                src="https://img.rocket.new/generatedImages/rocket_gen_img_15df498c3-1780547421918.png"
                alt="Executive chef plating an elegant dish with tweezers in a bright professional kitchen, white coat, focused expression"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover" />
              
              {/* Decorative pill caption */}
              <div className="absolute bottom-5 left-5 bg-background/90 backdrop-blur-sm px-4 py-2.5 rounded-full">
                <p className="text-xs uppercase tracking-widest font-semibold text-foreground">
                  Chef Marcus Webb
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Interior photo strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {[
          {
            src: "https://images.unsplash.com/photo-1725715077714-87c2624414f8",
            alt: 'Warm amber-lit restaurant dining room with exposed brick walls, intimate booth seating, and flickering candles on every table',
            label: 'The Main Room'
          },
          {
            src: "https://images.unsplash.com/photo-1628797292362-1f382b2f4b5d",
            alt: 'Open kitchen pass with gleaming stainless steel counters and rows of copper pots hanging above a professional range',
            label: 'The Kitchen'
          },
          {
            src: "https://img.rocket.new/generatedImages/rocket_gen_img_16b2ccc96-1767313038076.png",
            alt: 'Sunlit outdoor terrace dining area with lush greenery, white linen tablecloths, and wrought iron chairs',
            label: 'The Terrace'
          }].
          map((img) =>
          <div key={img.label} className="scroll-reveal relative card-hover-image overflow-hidden rounded-2xl aspect-[4/3]">
              <AppImage
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover" />
            
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <p className="text-xs uppercase tracking-widest font-semibold text-white/90">{img.label}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}