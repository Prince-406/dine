import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-16 md:py-20">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12">
          {/* Left: Logo + Tagline + Address */}
          <div className="flex flex-col gap-4 md:max-w-xs">
            <Link href="/" className="flex items-center gap-2.5 group">
              <AppLogo size={32} />
              <span className="font-serif text-xl tracking-tight text-foreground group-hover:text-primary transition-colors duration-200">
                Dine
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed font-light italic font-serif">
              An unforgettable dining experience crafted with passion, precision, and the finest seasonal ingredients.
            </p>
            <div className="text-xs text-muted-foreground leading-relaxed mt-1">
              <p>42 Harrington Lane</p>
              <p>New York, NY 10001</p>
              <p className="mt-2">Mon – Fri: 5pm – 11pm</p>
              <p>Sat – Sun: 12pm – 11pm</p>
            </div>
          </div>

          {/* Right: Links */}
          <div className="flex flex-col sm:flex-row gap-10">
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">Explore</p>
              {['Menu', 'Events', 'About', 'Press']?.map((item) => (
                <Link
                  key={item}
                  href={`/#${item?.toLowerCase()}`}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200"
                >
                  {item}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">Visit</p>
              <Link href="/booking" className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200">
                Reserve a Table
              </Link>
              <a href="tel:+12125550198" className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200">
                +1 212 555 0198
              </a>
              <a href="mailto:hello@dinenyc.com" className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200">
                hello@dinenyc.com
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200">
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-muted-foreground">
            © {new Date()?.getFullYear()} Dine Restaurant. All rights reserved.
          </p>
          <div className="flex gap-5">
            <Link href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200">Privacy</Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}