'use client';

import React, { useState, useCallback } from 'react';
import { BookingFormData, FormErrors } from '@/types';
import ConfirmationModal from './ConfirmationModal';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';

const INITIAL_FORM: BookingFormData = {
  name: '',
  email: '',
  phone: '',
  date: '',
  time: '',
  guests: 2,
  seating: '',
  occasion: '',
  specialRequests: '',
  preOrderStarter: false,
  preOrderMain: false,
  preOrderDessert: false,
};

const TIMES = [
  '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM',
  '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM',
  '9:00 PM', '9:30 PM', '10:00 PM',
];

const OCCASIONS = ['', 'Birthday', 'Anniversary', 'Business Dinner', 'Date Night', 'Family Celebration', 'Other'];

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function BookingForm() {
  const [form, setForm] = useState<BookingFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = useCallback((): FormErrors => {
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = 'This field is required';
    if (!form.email.trim()) {
      errs.email = 'This field is required';
    } else if (!validateEmail(form.email)) {
      errs.email = 'Please use a valid email address';
    }
    if (!form.date) errs.date = 'This field is incomplete';
    if (!form.time) errs.time = 'This field is incomplete';
    return errs;
  }, [form]);

  const handleChange = (field: keyof BookingFormData, value: string | number | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field as keyof FormErrors];
        return next;
      });
    }
  };

  const handleGuestChange = (delta: number) => {
    setForm((prev) => ({ ...prev, guests: Math.max(1, Math.min(20, prev.guests + delta)) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsSubmitting(false);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setForm(INITIAL_FORM);
    setErrors({});
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <>
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
        {/* Personal Info */}
        <div className="flex flex-col gap-6">
          <h3 className="font-serif text-xl text-foreground border-b border-border pb-3">
            Your Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Full Name <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Marcus Webb"
                className={`form-input ${errors.name ? 'error' : ''}`}
                autoComplete="name"
              />
              {errors.name && (
                <p className="text-xs text-red-500 mt-0.5">{errors.name}</p>
              )}
            </div>
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Email Address <span className="text-primary">*</span>
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="marcus@email.com"
                className={`form-input ${errors.email ? 'error' : ''}`}
                autoComplete="email"
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-0.5">{errors.email}</p>
              )}
            </div>
            {/* Phone */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Phone Number
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="+1 212 555 0000"
                className="form-input"
                autoComplete="tel"
              />
            </div>
            {/* Occasion */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Occasion
              </label>
              <select
                value={form.occasion}
                onChange={(e) => handleChange('occasion', e.target.value)}
                className="form-input"
              >
                {OCCASIONS.map((o) => (
                  <option key={o} value={o}>{o || 'Select occasion…'}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Reservation Details */}
        <div className="flex flex-col gap-6">
          <h3 className="font-serif text-xl text-foreground border-b border-border pb-3">
            Reservation Details
          </h3>

          {/* Date + Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Date <span className="text-primary">*</span>
              </label>
              <input
                type="date"
                value={form.date}
                min={today}
                onChange={(e) => handleChange('date', e.target.value)}
                className={`form-input ${errors.date ? 'error' : ''}`}
              />
              {errors.date && (
                <p className="text-xs text-red-500 mt-0.5">{errors.date}</p>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Time <span className="text-primary">*</span>
              </label>
              <select
                value={form.time}
                onChange={(e) => handleChange('time', e.target.value)}
                className={`form-input ${errors.time ? 'error' : ''}`}
              >
                <option value="">Select a time…</option>
                {TIMES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              {errors.time && (
                <p className="text-xs text-red-500 mt-0.5">{errors.time}</p>
              )}
            </div>
          </div>

          {/* Guest Count */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Number of Guests
            </label>
            <div className="flex items-center gap-0">
              <button
                type="button"
                onClick={() => handleGuestChange(-1)}
                disabled={form.guests <= 1}
                aria-label="Decrease guests"
                className="w-12 h-12 flex items-center justify-center border border-border text-foreground hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
              >
                <MinusIcon className="w-4 h-4" />
              </button>
              <div className="w-16 h-12 flex items-center justify-center border-y border-border bg-input">
                <span className="font-serif text-xl text-foreground">{form.guests}</span>
              </div>
              <button
                type="button"
                onClick={() => handleGuestChange(1)}
                disabled={form.guests >= 20}
                aria-label="Increase guests"
                className="w-12 h-12 flex items-center justify-center border border-border text-foreground hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
              >
                <PlusIcon className="w-4 h-4" />
              </button>
              <span className="ml-4 text-sm text-muted-foreground font-light">
                {form.guests === 1 ? 'guest' : 'guests'} · {form.guests > 10 ? 'Large party — we\'ll call to confirm' : 'Standard seating available'}
              </span>
            </div>
          </div>

          {/* Seating Preference */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Seating Preference
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              {[
                { value: 'main', label: 'Main Room', desc: 'Lively atmosphere' },
                { value: 'terrace', label: 'Terrace', desc: 'Open air dining' },
                { value: 'booth', label: 'Private Booth', desc: 'Intimate & secluded' },
              ].map((s) => (
                <button
                  key={s.value}
                  type="button"
                  onClick={() => handleChange('seating', s.value)}
                  className={`seating-btn flex flex-col items-start gap-0.5 text-left ${form.seating === s.value ? 'active' : ''}`}
                >
                  <span>{s.label}</span>
                  <span className="text-xs font-normal normal-case tracking-normal opacity-70">{s.desc}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Pre-Order */}
        <div className="flex flex-col gap-6">
          <h3 className="font-serif text-xl text-foreground border-b border-border pb-3">
            Optional Pre-Orders
          </h3>
          <p className="text-sm text-muted-foreground font-light -mt-2">
            Let us know if you'd like to pre-select any courses. Our team will send a menu 48 hours before your visit.
          </p>
          <div className="flex flex-col gap-3">
            {[
              { key: 'preOrderStarter' as const, label: 'Starter Course', desc: 'Seasonal amuse-bouche + first course' },
              { key: 'preOrderMain' as const, label: 'Main Course', desc: 'Chef\'s selection or à la carte choice' },
              { key: 'preOrderDessert' as const, label: 'Dessert Course', desc: 'Pastry chef\'s creation or special occasion cake' },
            ].map((item) => (
              <label
                key={item.key}
                className="flex items-center gap-4 cursor-pointer group p-4 border border-border hover:border-primary transition-colors duration-200"
              >
                <div
                  onClick={() => handleChange(item.key, !form[item.key])}
                  className={`w-5 h-5 flex-shrink-0 border flex items-center justify-center transition-all duration-200 cursor-pointer ${
                    form[item.key] ? 'bg-primary border-primary' : 'border-border group-hover:border-primary'
                  }`}
                >
                  {form[item.key] && (
                    <svg className="w-3 h-3 text-foreground" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-foreground">{item.label}</span>
                  <span className="text-xs text-muted-foreground font-light">{item.desc}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Special Requests */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Special Requests or Dietary Notes
          </label>
          <textarea
            value={form.specialRequests}
            onChange={(e) => handleChange('specialRequests', e.target.value)}
            placeholder="Allergies, accessibility needs, dietary restrictions, or anything that will help us prepare for your visit…"
            rows={4}
            className="form-input resize-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full justify-center py-4 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              Confirming Reservation…
            </span>
          ) : (
            'Confirm Reservation'
          )}
        </button>

        <p className="text-xs text-muted-foreground text-center font-light">
          You will receive a confirmation email within 15 minutes. For same-day reservations, please call us at +1 212 555 0198.
        </p>
      </form>

      {showModal && (
        <ConfirmationModal formData={form} onClose={handleCloseModal} />
      )}
    </>
  );
}