'use client';

import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';
import BookingForm from '@/app/components/BookingForm';
import { MapPinIcon, ClockIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

export default function BookingPageContent() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.scroll-reveal').forEach((el, i) => {
              setTimeout(() => (el as HTMLElement).classList.add('revealed'), i * 100);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef}>
      {/* Hero Banner */}
      <div className="relative w-full h-52 md:h-72 overflow-hidden">
        <AppImage
          src="https://images.unsplash.com/photo-1668365320695-804ae97fa044"
          alt="Warm amber-lit upscale restaurant interior with elegant booth seating, glowing pendant lights, and a full bar in the background"
          fill
          priority
          sizes="100vw"
          className="object-cover" />
        
        <div className="absolute inset-0" style={{ background: 'rgba(13,13,13,0.72)' }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-16">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-6 h-px bg-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Reservations</span>
            <div className="w-6 h-px bg-primary" />
          </div>
          <h1 className="font-serif text-display text-white text-center px-4">
            Reserve Your Table
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">

          {/* Left: Info Panel (2/5) */}
          <div className="lg:col-span-2 flex flex-col gap-8 lg:sticky lg:top-24">
            {/* Restaurant Image */}
            <div className="scroll-reveal relative card-hover-image overflow-hidden rounded-2xl aspect-[4/3]">
              <AppImage
                src="https://images.unsplash.com/photo-1695067742333-e7684dfef664"
                alt="Sunlit restaurant exterior with stone facade, window boxes of herbs, and a hand-lettered chalkboard menu sign"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover" />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="text-xs uppercase tracking-widest font-semibold text-white/90">42 Harrington Lane</span>
              </div>
            </div>

            {/* Info Cards */}
            <div className="scroll-reveal flex flex-col gap-4">
              <h2 className="font-serif text-2xl text-foreground">Visit Information</h2>
              <div className="decorative-divider mb-2" />

              {[
              {
                icon: <MapPinIcon className="w-4 h-4" />,
                label: 'Address',
                lines: ['42 Harrington Lane', 'New York, NY 10001']
              },
              {
                icon: <ClockIcon className="w-4 h-4" />,
                label: 'Hours',
                lines: ['Mon – Fri: 5:00pm – 11:00pm', 'Sat – Sun: 12:00pm – 11:00pm']
              },
              {
                icon: <PhoneIcon className="w-4 h-4" />,
                label: 'Phone',
                lines: ['+1 212 555 0198']
              },
              {
                icon: <EnvelopeIcon className="w-4 h-4" />,
                label: 'Email',
                lines: ['hello@dinenyc.com']
              }].
              map((item) =>
              <div key={item.label} className="flex gap-3 p-4 border border-border hover:border-primary transition-colors duration-200">
                  <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center text-primary">
                    {item.icon}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{item.label}</span>
                    {item.lines.map((line) =>
                  <span key={line} className="text-sm text-foreground font-light">{line}</span>
                  )}
                  </div>
                </div>
              )}
            </div>

            {/* Policy Note */}
            <div className="scroll-reveal p-4 border border-primary/30 bg-primary/5">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Reservation Policy</p>
              <p className="text-xs text-muted-foreground font-light leading-relaxed">
                Tables are held for 15 minutes past reservation time. For parties of 8 or more, a credit card is required to secure the booking. 24-hour cancellation notice is appreciated.
              </p>
            </div>
          </div>

          {/* Right: Form (3/5) */}
          <div className="lg:col-span-3 scroll-reveal">
            <div className="mb-8">
              <h2 className="font-serif text-section-heading text-foreground mb-3">
                Make a Reservation
              </h2>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                Complete the form below and we'll confirm your table within 15 minutes. Fields marked with <span className="text-primary">*</span> are required.
              </p>
            </div>
            <BookingForm />
          </div>
        </div>
      </div>
    </div>);

}