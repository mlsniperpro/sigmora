'use client';

import { useEffect, useState } from 'react';

type WelcomeModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function WelcomeModal({ isOpen, onClose }: WelcomeModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative bg-zinc-900/90 border border-white/10 rounded-3xl p-6 w-full max-w-2xl shadow-2xl backdrop-blur-xl transform transition-all duration-300 scale-100 space-y-4">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>

        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold font-display">Welcome to Sigmora!</h2>
          <p className="text-sm text-zinc-400">
            Watch this quick tutorial to learn how to get the most out of the platform.
          </p>
        </div>

        {/* Video Aspect Ratio 16:9 */}
        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black/40 border border-white/5 shadow-inner">
          <iframe 
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1" 
            title="Sigmora Tutorial"
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className="flex justify-center pt-2">
          <button onClick={onClose} className="button px-8">Get Started</button>
        </div>
      </div>
    </div>
  );
}
