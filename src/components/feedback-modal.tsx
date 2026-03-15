'use client';

import { useState } from 'react';

type FeedbackModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setDescription('');
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 1500);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Card */}
      <form 
        onSubmit={handleSubmit}
        className="relative bg-zinc-900/90 border border-white/10 rounded-3xl p-6 w-full max-w-lg shadow-2xl backdrop-blur-xl transform transition-all duration-300 scale-100 space-y-4"
      >
        <button 
          type="button"
          onClick={onClose} 
          className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>

        <div className="space-y-1">
          <h2 className="text-xl font-bold font-display">Prompt A Feature Request 💡</h2>
          <p className="text-xs text-zinc-400">
            Tell us what you want to build or fix, and our team will get on it.
          </p>
        </div>

        <div className="space-y-3">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Type your feature request or bug report here... optionally paste a screenshot desk description if related."
            rows={5}
            disabled={submitted || isSubmitting}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-[var(--color-accent-400)] transition-all resize-none"
            required
          />

          <div className="border-2 border-dashed border-white/5 rounded-xl p-4 text-center hover:border-white/10 cursor-pointer transition-colors">
            <p className="text-xs text-zinc-400">📸 Drag & drop a screenshot or click to upload</p>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button 
            type="submit" 
            disabled={isSubmitting || submitted}
            className={`button px-8 ${submitted ? '!bg-teal-600' : ''}`}
          >
            {isSubmitting ? 'Submitting...' : submitted ? 'Received! 🚀' : 'Submit Request'}
          </button>
        </div>
      </form>
    </div>
  );
}
