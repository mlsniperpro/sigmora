'use client';

import { useState, useEffect } from 'react';
import { AppShell } from '@/components/app-shell';

type MemorySectionProps = {
  title: string;
  description: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
};

function MemorySection({ title, description, value, onChange, placeholder }: MemorySectionProps) {
  return (
    <div className="bg-white/5 rounded-2xl p-6 border border-white/5 space-y-3">
      <div>
        <h3 className="text-base font-bold text-white">{title}</h3>
        <p className="text-xs text-[var(--text-muted)]">{description}</p>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        className="w-full bg-black/20 border border-white/5 rounded-xl p-3 text-sm focus:outline-none focus:border-[var(--color-accent-400)] transition-all resize-none"
      />
    </div>
  );
}

export default function WorkspaceMemoryPage() {
  const [memory, setMemory] = useState({
    brand: '',
    audience: '',
    voice: '',
    setsApart: ''
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved'>('idle');

  // Load from localStorage on mount (Simulated Persistence)
  useEffect(() => {
    const saved = localStorage.getItem('sigmora-workspace-memory');
    if (saved) {
      try {
        setMemory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse memory:", e);
      }
    }
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      localStorage.setItem('sigmora-workspace-memory', JSON.stringify(memory));
      setIsSaving(false);
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 800);
  };

  return (
    <AppShell
      title="Workspace Memory 🧠"
      subtitle="Context Directives"
      description="Define the persistent context tied to every conversation in this workspace. These values anchor prompt generations to your exact brand."
    >
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-bold">Manage Memory Directives</h2>
          <p className="text-xs text-[var(--text-secondary)]">These will be appended to your AI content briefings.</p>
        </div>
        <button 
          onClick={handleSave} 
          disabled={isSaving}
          className={`button px-6 transition-all ${saveStatus === 'saved' ? '!bg-teal-600' : ''}`}
        >
          {isSaving ? 'Saving...' : saveStatus === 'saved' ? 'Saved! ✨' : 'Save Changes'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MemorySection 
          title="Your Brand"
          description="What is the name of your brand and high-level mission statement?"
          value={memory.brand}
          onChange={(val) => setMemory(prev => ({ ...prev, brand: val }))}
          placeholder="e.g., Sigmora: Empowering creators with data-driven content analysis..."
        />
        <MemorySection 
          title="Your Audience"
          description="Who are you speaking to? What are their demographics & pain points?"
          value={memory.audience}
          onChange={(val) => setMemory(prev => ({ ...prev, audience: val }))}
          placeholder="e.g., Self-taught software devs trying to break into tech..."
        />
        <MemorySection 
          title="Your Voice & Tone"
          description="How should the AI sound? Calm, hype, professional, educational?"
          value={memory.voice}
          onChange={(val) => setMemory(prev => ({ ...prev, voice: val }))}
          placeholder="e.g., Highly educational, calm, and structured with clean formatting..."
        />
        <MemorySection 
          title="What Sets You Apart"
          description="What is your unique value proposition or angle that separates you from competitors?"
          value={memory.setsApart}
          onChange={(val) => setMemory(prev => ({ ...prev, setsApart: val }))}
          placeholder="e.g., Quick 45s data drilldowns that don't waste any time..."
        />
      </div>

      <div className="bg-white/3 rounded-2xl p-4 border border-white/5">
        <h4 className="text-xs uppercase font-bold text-[var(--text-muted)] mb-1">Why this matters</h4>
        <p className="text-xs text-[var(--text-secondary)] leading-tight">
          Every conversation or content generation inside this workspace reads from these four pillars before rendering execution buffers. Keep them updated representing active targeting goals.
        </p>
      </div>
    </AppShell>
  );
}
