'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import { useTheme } from '@/context/ThemeContext';
import { SunIcon, MoonIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  const { theme, toggleTheme, isDark } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navLinks = [
    { label: 'Menu', href: '/#menu' },
    { label: 'Events', href: '/#events' },
    { label: 'About', href: '/#about' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <AppLogo size={32} />
            <span className="font-serif text-xl tracking-tight text-foreground group-hover:text-primary transition-colors duration-200">
              Dine
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks?.map((link) => (
              <Link key={link?.label} href={link?.href} className="nav-link-item">
                {link?.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              className="w-9 h-9 flex items-center justify-center border border-border text-muted-foreground hover:text-primary hover:border-primary transition-all duration-200"
            >
              {isDark ? (
                <SunIcon className="w-4 h-4" />
              ) : (
                <MoonIcon className="w-4 h-4" />
              )}
            </button>

            {/* Book CTA */}
            <Link href="/booking" className="btn-primary hidden md:inline-flex text-xs px-5 py-3">
              Reserve a Table
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="md:hidden w-9 h-9 flex items-center justify-center text-foreground"
            >
              <Bars3Icon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100] bg-background/98 backdrop-blur-xl flex flex-col">
          <div className="flex items-center justify-between px-6 h-16">
            <Link href="/" className="flex items-center gap-2.5" onClick={() => setMenuOpen(false)}>
              <AppLogo size={32} />
              <span className="font-serif text-xl tracking-tight text-foreground">Dine</span>
            </Link>
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="w-9 h-9 flex items-center justify-center text-foreground"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-col justify-center flex-1 px-8 gap-8">
            {navLinks?.map((link, i) => (
              <Link
                key={link?.label}
                href={link?.href}
                onClick={() => setMenuOpen(false)}
                className="font-serif text-4xl text-foreground hover:text-primary transition-colors duration-200"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                {link?.label}
              </Link>
            ))}
            <div className="mt-4 pt-8 border-t border-border">
              <Link
                href="/booking"
                onClick={() => setMenuOpen(false)}
                className="btn-primary w-full justify-center"
              >
                Reserve a Table
              </Link>
            </div>
          </div>

          <div className="px-8 pb-12 text-sm text-muted-foreground">
            <p>42 Harrington Lane, New York, NY 10001</p>
            <p className="mt-1">hello@dinenyc.com · +1 212 555 0198</p>
          </div>
        </div>
      )}
    </>
  );
}