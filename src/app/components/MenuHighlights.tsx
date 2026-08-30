'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import { MenuItem } from '@/types';

const MENU_ITEMS: MenuItem[] = [
{
  id: '1',
  name: 'Seared Diver Scallops',
  description: 'Pan-seared with cauliflower purée, crispy capers, and brown butter emulsion',
  price: '$38',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_11b19f6cb-1772256983972.png",
  alt: 'Three golden seared scallops on white cauliflower purée, garnished with microgreens and capers against a dark slate plate',
  dietary: ['gluten-free'],
  category: 'Starter'
},
{
  id: '2',
  name: 'Wagyu Beef Tenderloin',
  description: 'A5 Wagyu, truffle jus, roasted bone marrow, seasonal root vegetables',
  price: '$89',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_17ca1976d-1771885391374.png",
  alt: 'Thick-cut wagyu beef tenderloin sliced to reveal perfect medium-rare pink interior, garnished with microgreens on a dark ceramic plate',
  dietary: ['gluten-free'],
  category: 'Main'
},
{
  id: '3',
  name: 'Wild Mushroom Tagliatelle',
  description: 'Hand-rolled egg pasta, porcini, chanterelle, aged Parmigiano, black truffle',
  price: '$34',
  image: "https://images.unsplash.com/photo-1551631759-96b8377f491c",
  alt: 'Nest of fresh egg tagliatelle pasta tossed with golden chanterelle mushrooms and shaved black truffle in a wide shallow bowl',
  dietary: ['vegetarian'],
  category: 'Main'
},
{
  id: '4',
  name: 'Roasted Beet & Burrata',
  description: 'Heirloom beets, fresh burrata, candied walnuts, aged balsamic, microgreens',
  price: '$22',
  image: "https://images.unsplash.com/photo-1600444573323-a0427f3b6192",
  alt: 'Vibrant purple and gold roasted beet slices fanned around a torn burrata ball, drizzled with aged balsamic on a white plate',
  dietary: ['vegetarian', 'gluten-free'],
  category: 'Starter'
},
{
  id: '5',
  name: 'Vanilla Bean Crème Brûlée',
  description: 'Madagascar vanilla custard, caramelized crust, seasonal berry compote',
  price: '$18',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_16c421f68-1772202881776.png",
  alt: 'Classic crème brûlée in a white ramekin with a perfectly caramelized amber sugar crust, served with fresh raspberries',
  dietary: ['vegetarian', 'gluten-free'],
  category: 'Dessert'
},
{
  id: '6',
  name: 'Herb-Crusted Cod Provençal',
  description: 'Atlantic cod, ratatouille, saffron bouillabaisse, fennel fronds',
  price: '$42',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_15ce1f95f-1772075169756.png",
  alt: 'Herb-crusted white cod fillet resting on colorful ratatouille vegetables in a shallow pool of golden saffron broth',
  dietary: ['gluten-free'],
  category: 'Main'
}];


type Filter = 'all' | 'vegetarian' | 'vegan' | 'gluten-free';

const FILTERS: {label: string;value: Filter;}[] = [
{ label: 'All', value: 'all' },
{ label: 'Vegetarian', value: 'vegetarian' },
{ label: 'Vegan', value: 'vegan' },
{ label: 'Gluten-Free', value: 'gluten-free' }];


function DietaryBadge({ type }: {type: string;}) {
  if (type === 'vegetarian') return <span className="dietary-badge badge-veg">Veg</span>;
  if (type === 'vegan') return <span className="dietary-badge badge-vegan">Vegan</span>;
  if (type === 'gluten-free') return <span className="dietary-badge badge-gf">GF</span>;
  return null;
}

export default function MenuHighlights() {
  const [activeFilter, setActiveFilter] = useState<Filter>('all');
  const sectionRef = useRef<HTMLElement>(null);

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

  const filtered = activeFilter === 'all' ?
  MENU_ITEMS :
  MENU_ITEMS.filter((item) => item.dietary.includes(activeFilter as any));

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="w-full py-20 md:py-28 bg-muted/30">
      
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <div className="scroll-reveal flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Seasonal Menu</span>
            </div>
            <h2 className="scroll-reveal font-serif text-section-heading text-foreground">
              Curated highlights<br />
              <span className="italic text-primary">from our kitchen</span>
            </h2>
          </div>
          {/* Filters */}
          <div className="scroll-reveal flex flex-wrap gap-2">
            {FILTERS.map((f) =>
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`filter-btn ${activeFilter === f.value ? 'active' : ''}`}>
              
                {f.label}
              </button>
            )}
          </div>
        </div>

        {/* Bento Grid */}
        {/* 
           BENTO AUDIT — lg (3-col):
           Row 1: [col-1: item[0] cs-1 rs-2] [col-2: item[1] cs-1] [col-3: item[2] cs-1]
           Row 2: [col-1: occupied(rs-2)] [col-2: item[3] cs-1] [col-3: item[4] cs-1]
           Row 3: [col-1+2+3: item[5] cs-3]
           Placed 6/6 ✓
            md (2-col):
           Row 1: [col-1+2: item[0] cs-2]
           Row 2: [col-1: item[1]] [col-2: item[2]]
           Row 3: [col-1: item[3]] [col-2: item[4]]
           Row 4: [col-1+2: item[5] cs-2]
           Placed 6/6 ✓
          */
        }
        {filtered.length === 0 ?
        <div className="text-center py-20 text-muted-foreground font-light">
            <p className="font-serif text-2xl mb-2">No dishes match this filter</p>
            <p className="text-sm">Try selecting a different dietary preference</p>
          </div> :
        filtered.length >= 6 && activeFilter === 'all' ?
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Card 0 — spans rows 1+2 on lg, spans cols 1+2 on md */}
            <div className="scroll-reveal md:col-span-2 lg:col-span-1 lg:row-span-2 relative card-hover-image overflow-hidden rounded-2xl group">
              <div className="md:aspect-[16/7] lg:aspect-auto lg:h-full min-h-[280px]">
                <AppImage
                src={filtered[0].image}
                alt={filtered[0].alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover" />
              
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex gap-1.5 mb-2 flex-wrap">
                  {filtered[0].dietary.map((d) => <DietaryBadge key={d} type={d} />)}
                </div>
                <p className="text-xs uppercase tracking-widest text-white/60 mb-1">{filtered[0].category}</p>
                <h3 className="font-serif text-xl text-white mb-1">{filtered[0].name}</h3>
                <p className="text-xs text-white/70 font-light leading-relaxed mb-2 hidden group-hover:block transition-all">{filtered[0].description}</p>
                <span className="font-serif text-primary text-lg">{filtered[0].price}</span>
              </div>
            </div>

            {/* Cards 1,2 — normal on lg */}
            {[filtered[1], filtered[2]].map((item) =>
          <div key={item.id} className="scroll-reveal relative card-hover-image overflow-hidden rounded-2xl group aspect-[4/3]">
                <AppImage
              src={item.image}
              alt={item.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover" />
            
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex gap-1.5 mb-1.5 flex-wrap">
                    {item.dietary.map((d) => <DietaryBadge key={d} type={d} />)}
                  </div>
                  <p className="text-xs uppercase tracking-widest text-white/60 mb-0.5">{item.category}</p>
                  <h3 className="font-serif text-lg text-white mb-0.5">{item.name}</h3>
                  <span className="font-serif text-primary">{item.price}</span>
                </div>
              </div>
          )}

            {/* Cards 3,4 — normal on lg */}
            {[filtered[3], filtered[4]].map((item) =>
          <div key={item.id} className="scroll-reveal relative card-hover-image overflow-hidden rounded-2xl group aspect-[4/3]">
                <AppImage
              src={item.image}
              alt={item.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover" />
            
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex gap-1.5 mb-1.5 flex-wrap">
                    {item.dietary.map((d) => <DietaryBadge key={d} type={d} />)}
                  </div>
                  <p className="text-xs uppercase tracking-widest text-white/60 mb-0.5">{item.category}</p>
                  <h3 className="font-serif text-lg text-white mb-0.5">{item.name}</h3>
                  <span className="font-serif text-primary">{item.price}</span>
                </div>
              </div>
          )}

            {/* Card 5 — full width on lg */}
            <div className="scroll-reveal lg:col-span-3 md:col-span-2 relative card-hover-image overflow-hidden rounded-2xl group aspect-[16/6]">
              <AppImage
              src={filtered[5].image}
              alt={filtered[5].alt}
              fill
              sizes="100vw"
              className="object-cover" />
            
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 top-0 flex flex-col justify-end p-6 md:p-8 max-w-md">
                <div className="flex gap-1.5 mb-2 flex-wrap">
                  {filtered[5].dietary.map((d) => <DietaryBadge key={d} type={d} />)}
                </div>
                <p className="text-xs uppercase tracking-widest text-white/60 mb-1">{filtered[5].category}</p>
                <h3 className="font-serif text-2xl text-white mb-1">{filtered[5].name}</h3>
                <p className="text-sm text-white/70 font-light leading-relaxed mb-2">{filtered[5].description}</p>
                <span className="font-serif text-primary text-xl">{filtered[5].price}</span>
              </div>
            </div>
          </div> : (

        /* Filtered view — uniform grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filtered.map((item) =>
          <div key={item.id} className="scroll-reveal relative card-hover-image overflow-hidden rounded-2xl group aspect-[4/3]">
                <AppImage
              src={item.image}
              alt={item.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover" />
            
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex gap-1.5 mb-1.5 flex-wrap">
                    {item.dietary.map((d) => <DietaryBadge key={d} type={d} />)}
                  </div>
                  <p className="text-xs uppercase tracking-widest text-white/60 mb-0.5">{item.category}</p>
                  <h3 className="font-serif text-lg text-white mb-0.5">{item.name}</h3>
                  <p className="text-xs text-white/70 font-light leading-relaxed mb-1.5 hidden group-hover:block">{item.description}</p>
                  <span className="font-serif text-primary">{item.price}</span>
                </div>
              </div>
          )}
          </div>)
        }

        {/* CTA */}
        <div className="scroll-reveal mt-10 text-center">
          <Link href="/booking" className="btn-primary">
            Book a Table to Taste
          </Link>
        </div>
      </div>
    </section>);

}