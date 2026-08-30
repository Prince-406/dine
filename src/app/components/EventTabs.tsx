'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import { EventTab } from '@/types';

const EVENTS: EventTab[] = [
{
  id: 'family',
  label: 'Family Gatherings',
  heading: 'Celebrate together around a table that matters',
  description: 'From intimate Sunday lunches to milestone birthdays, our private dining room seats up to 20 guests. Our team handles every detail — from bespoke menus to floral arrangements — so you can be fully present with the people who matter most.',
  image: "https://images.unsplash.com/photo-1544122911-5e081666536e",
  alt: 'Large multigenerational family gathered around a long wooden dining table set with candles and fresh flowers in a warm restaurant private room'
},
{
  id: 'special',
  label: 'Special Events',
  heading: 'Anniversaries, proposals, and once-in-a-lifetime evenings',
  description: 'Our sommelier pairs each course with a curated wine flight. Our pastry team crafts custom desserts for any occasion. Whether it\'s a champagne toast at midnight or a sunrise breakfast for two, we orchestrate the extraordinary.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1e41a4593-1772258386032.png",
  alt: 'Intimate candlelit table for two set with crystal wine glasses, white roses, and a handwritten menu card for a special anniversary celebration'
},
{
  id: 'social',
  label: 'Social Events',
  heading: 'Corporate dinners and cocktail receptions done right',
  description: 'Dine transforms seamlessly for corporate entertaining. Our buyout option seats 80 guests for a standing reception or 50 for a seated dinner. Branded menus, AV support, and a dedicated event coordinator are standard inclusions.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1641970d7-1764740995390.png",
  alt: 'Elegant corporate cocktail reception with guests in formal attire mingling around high cocktail tables with ambient warm lighting and city skyline views'
}];


export default function EventTabs() {
  const [activeTab, setActiveTab] = useState('family');
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const activeEvent = EVENTS.find((e) => e.id === activeTab) ?? EVENTS[0];

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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleTabChange = (id: string) => {
    if (contentRef.current) {
      contentRef.current.style.opacity = '0';
      contentRef.current.style.transform = 'translateY(8px)';
    }
    setTimeout(() => {
      setActiveTab(id);
      if (contentRef.current) {
        contentRef.current.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        contentRef.current.style.opacity = '1';
        contentRef.current.style.transform = 'translateY(0)';
      }
    }, 200);
  };

  return (
    <section
      id="events"
      ref={sectionRef}
      className="w-full py-20 md:py-28">
      
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <div className="scroll-reveal flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Private Dining</span>
            </div>
            <h2 className="scroll-reveal font-serif text-section-heading text-foreground">
              Every occasion<br />
              <span className="italic text-primary">deserves a story</span>
            </h2>
          </div>
        </div>

        {/* Tabs */}
        <div className="scroll-reveal flex flex-col sm:flex-row gap-0 border-b border-border mb-10 overflow-x-auto no-scrollbar">
          {EVENTS.map((event) =>
          <button
            key={event.id}
            onClick={() => handleTabChange(event.id)}
            className={`event-tab-btn flex-shrink-0 pr-6 mr-6 ${activeTab === event.id ? 'active' : ''}`}>
            
              {event.label}
            </button>
          )}
        </div>

        {/* Content */}
        <div
          ref={contentRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
          style={{ opacity: 1, transform: 'translateY(0)' }}>
          
          {/* Text */}
          <div className="flex flex-col gap-5 order-2 lg:order-1">
            <h3 className="font-serif text-display text-foreground leading-tight">
              {activeEvent.heading}
            </h3>
            <div className="w-10 h-px bg-primary" />
            <p className="text-base text-muted-foreground font-light leading-relaxed">
              {activeEvent.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <Link href="/booking" className="btn-primary">
                Enquire Now
              </Link>
              <a href="mailto:events@dinenyc.com" className="btn-outline">
                Email Our Team
              </a>
            </div>
            {/* Detail pills */}
            <div className="flex flex-wrap gap-3 mt-2">
              {[
              activeTab === 'family' ? 'Up to 20 guests' : activeTab === 'special' ? 'Tailored menus' : 'Up to 80 guests',
              activeTab === 'family' ? 'Custom menus' : activeTab === 'special' ? 'Sommelier pairing' : 'AV support',
              activeTab === 'family' ? 'Floral arrangements' : activeTab === 'special' ? 'Custom desserts' : 'Dedicated coordinator'].
              map((pill) =>
              <span key={pill} className="text-xs font-medium uppercase tracking-wider text-muted-foreground border border-border px-3 py-1.5">
                  {pill}
                </span>
              )}
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 relative card-hover-image overflow-hidden rounded-2xl aspect-[4/3]">
            <AppImage
              src={activeEvent.image}
              alt={activeEvent.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover" />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        </div>
      </div>
    </section>);

}