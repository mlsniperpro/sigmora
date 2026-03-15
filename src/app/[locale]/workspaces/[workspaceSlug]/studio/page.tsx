'use client';

import Link from 'next/link';
import { AppShell } from '@/components/app-shell';
import { useParams } from 'next/navigation';

export default function ContentStudioPage() {
  const params = useParams();
  const workspaceSlug = params.workspaceSlug as string;

  return (
    <AppShell
      title="Content Studio 🚀"
      subtitle="Creation Cockpit"
      description="Select content from your database or upload your own to get started with AI Remixer or Coaching loops."
    >
      {/* Top Header Status */}
      <div className="flex justify-between items-center bg-white/5 border border-white/5 rounded-2xl p-4">
        <div>
          <h2 className="text-sm font-bold text-white">Prompt a feature</h2>
          <p className="text-xs text-[var(--text-muted)]">Describe what you want to build and press Cmd+J</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold bg-amber-500/20 text-amber-400 px-2 py-1 rounded-full">200 credits available</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Interface */}
        <div className="md:col-span-2 space-y-6">
          {/* Section 1: Select Content */}
          <div className="space-y-3">
            <div>
              <h3 className="text-lg font-bold">Select content to remix</h3>
              <p className="text-xs text-[var(--text-secondary)]">Choose content from the viral database or add your own to get started</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Link href={`/workspaces/${workspaceSlug}/benchmarks`} className="flex flex-col items-center justify-center p-6 bg-white/3 rounded-2xl border border-white/5 hover:border-[var(--color-accent-400)] hover:bg-white/5 transition-all text-center">
                <span className="text-2xl mb-2">🔥</span>
                <span className="text-xs font-semibold">Viral Content</span>
              </Link>
              <Link href={`/workspaces/${workspaceSlug}/library`} className="flex flex-col items-center justify-center p-6 bg-white/3 rounded-2xl border border-white/5 hover:border-[var(--color-accent-400)] hover:bg-white/5 transition-all text-center">
                <span className="text-2xl mb-2">🔗</span>
                <span className="text-xs font-semibold">Add From URL</span>
              </Link>
              <Link href={`/workspaces/${workspaceSlug}/competitors`} className="flex flex-col items-center justify-center p-6 bg-white/3 rounded-2xl border border-white/5 hover:border-[var(--color-accent-400)] hover:bg-white/5 transition-all text-center">
                <span className="text-2xl mb-2">🕵️‍♂️</span>
                <span className="text-xs font-semibold">Spy Posts</span>
              </Link>
              <Link href={`/workspaces/${workspaceSlug}/library`} className="flex flex-col items-center justify-center p-6 bg-white/3 rounded-2xl border border-white/5 hover:border-[var(--color-accent-400)] hover:bg-white/5 transition-all text-center">
                <span className="text-2xl mb-2">📁</span>
                <span className="text-xs font-semibold">Files / Uploads</span>
              </Link>
            </div>
          </div>

          {/* Section 2: Workflows */}
          <div className="space-y-3">
            <div>
              <h3 className="text-lg font-bold">What can you do here?</h3>
              <p className="text-xs text-[var(--text-secondary)]">Add content to your workspace, then use the chat to work with it in two ways</p>
            </div>
            <div className="space-y-3">
              <div className="bg-white/3 rounded-2xl border border-white/5 p-4 flex gap-4 items-start">
                <div className="bg-[var(--color-accent-500)]/10 text-[var(--color-accent-400)] p-2 rounded-xl text-xl">🎬</div>
                <div>
                  <h4 className="text-sm font-bold">Remix Content</h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-tight">Transform viral videos into custom scripts tailored to your brand, product, and target audience.</p>
                </div>
              </div>
              <div className="bg-white/3 rounded-2xl border border-white/5 p-4 flex gap-4 items-start">
                <div className="bg-teal-500/10 text-teal-400 p-2 rounded-xl text-xl">💡</div>
                <div>
                  <h4 className="text-sm font-bold">Get Feedback</h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-tight">Get suggestions from our content coach on how to improve your hook story setups & pacing strategies.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Side Panel: Tips & Quick Links */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-[var(--color-accent-500)]/10 to-transparent rounded-2xl p-4 border border-[var(--color-accent-400)]/20 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent-400)]">Pro Tip 💡</span>
              <span className="text-xs text-white/40">3 / 5</span>
            </div>
            <p className="text-xs text-white leading-relaxed">
              Add a saved prompt with your brand context so you don't repeat yourself each chat session.
            </p>
            <Link href={`/workspaces/${workspaceSlug}/memory`} className="button-secondary text-xs !rounded-xl py-2 w-full block text-center">
              Configure Memory
            </Link>
          </div>

          <div className="bg-white/3 rounded-2xl p-4 border border-white/5">
            <h4 className="text-xs font-bold mb-2">Saved Prompts</h4>
            <p className="text-[10px] text-[var(--text-muted)] mb-3">No saved prompts yet. Create formulas to accelerate execution.</p>
            <Link href={`/workspaces/${workspaceSlug}/prompts`} className="text-xs text-[var(--color-accent-400)] hover:underline">Manage Prompts →</Link>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
