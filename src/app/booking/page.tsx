import React from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingPageContent from './components/BookingPageContent';

export default function BookingPage() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-1">
          <BookingPageContent />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}