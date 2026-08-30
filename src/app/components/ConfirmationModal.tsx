'use client';

import React, { useEffect } from 'react';
import { BookingFormData } from '@/types';
import { XMarkIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface Props {
  formData: BookingFormData;
  onClose: () => void;
}

export default function ConfirmationModal({ formData, onClose }: Props) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const seatingLabels: Record<string, string> = {
    main: 'Main Room',
    terrace: 'Terrace',
    booth: 'Private Booth',
    '': 'No preference',
  };

  const formatDate = (d: string) => {
    if (!d) return 'Not specified';
    const parts = d.split('-');
    if (parts.length !== 3) return d;
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return `${months[parseInt(parts[1]) - 1]} ${parseInt(parts[2])}, ${parts[0]}`;
  };

  const preOrders = [
    formData.preOrderStarter && 'Starter',
    formData.preOrderMain && 'Main',
    formData.preOrderDessert && 'Dessert',
  ].filter(Boolean);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-card text-card-foreground w-full max-w-md mx-auto animate-scale-in overflow-hidden"
        style={{ maxHeight: '90vh', overflowY: 'auto' }}
      >
        {/* Header */}
        <div className="relative bg-primary px-6 pt-8 pb-6 text-center">
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-primary-foreground/70 hover:text-primary-foreground transition-colors"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
          <CheckCircleIcon className="w-12 h-12 text-primary-foreground mx-auto mb-3" />
          <h2 className="font-serif text-2xl text-primary-foreground mb-1">Reservation Confirmed</h2>
          <p className="text-sm text-primary-foreground/80 font-light">
            We look forward to welcoming you, {formData.name.split(' ')[0]}.
          </p>
        </div>

        {/* Body */}
        <div className="px-6 py-6 flex flex-col gap-4">
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-1">Booking Summary</p>

          {[
            { label: 'Name', value: formData.name },
            { label: 'Email', value: formData.email },
            { label: 'Date', value: formatDate(formData.date) },
            { label: 'Time', value: formData.time },
            { label: 'Guests', value: `${formData.guests} ${formData.guests === 1 ? 'guest' : 'guests'}` },
            { label: 'Seating', value: seatingLabels[formData.seating] },
            ...(formData.occasion ? [{ label: 'Occasion', value: formData.occasion }] : []),
            ...(preOrders.length > 0 ? [{ label: 'Pre-Orders', value: preOrders.join(', ') }] : []),
            ...(formData.specialRequests ? [{ label: 'Notes', value: formData.specialRequests }] : []),
          ].map((row) => (
            <div key={row.label} className="flex justify-between gap-4 border-b border-border pb-3 last:border-0 last:pb-0">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex-shrink-0">{row.label}</span>
              <span className="text-sm text-foreground text-right font-light">{row.value}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex flex-col gap-3">
          <p className="text-xs text-muted-foreground font-light text-center leading-relaxed">
            A confirmation has been sent to <strong>{formData.email}</strong>. Please arrive 5 minutes early. For changes, call +1 212 555 0198.
          </p>
          <button onClick={onClose} className="btn-primary w-full justify-center">
            Done
          </button>
          <Link href="/" onClick={onClose} className="btn-outline w-full justify-center">
            Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}