'use client';

import { useState, useEffect } from 'react';

type DismissibleTipProps = {
  id: string;
  title: string;
  description: string;
  icon?: string;
};

export function DismissibleTip({ id, title, description, icon = '💡' }: DismissibleTipProps) {
  const [isDismissed, setIsDismissed] = useState<boolean | null>(null);

  useEffect(() => {
    const value = localStorage.getItem(`tip_dismissed_${id}`);
    setIsDismissed(value === 'true');
  }, [id]);

  const handleDismiss = () => {
    localStorage.setItem(`tip_dismissed_${id}`, 'true');
    setIsDismissed(true);
  };

  if (isDismissed === null || isDismissed) return null;

  return (
    <div className="bg-gradient-to-r from-[var(--color-accent-500)]/10 to-transparent border border-[var(--color-accent-400)]/20 p-4 rounded-2xl flex gap-4 items-start relative mb-6 backdrop-blur-sm">
      <div className="bg-[var(--color-accent-500)]/20 text-xl p-2 rounded-xl flex items-center justify-center w-10 h-10">{icon}</div>
      <div className="flex-1 pr-8">
        <h4 className="text-sm font-bold text-white mb-1">{title}</h4>
        <p className="text-xs text-[var(--text-secondary)] leading-tight">{description}</p>
      </div>
      <button 
        onClick={handleDismiss} 
        className="absolute top-3 right-3 text-white/40 hover:text-white transition-colors text-xs bg-white/5 hover:bg-white/10 p-1 rounded-md"
        aria-label="Dismiss tip"
      >
        ✕
      </button>
    </div>
  );
}
