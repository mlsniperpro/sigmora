export type AppNavItem = {
  href: string;
  label: string;
  description: string;
  icon: string;
};

export type AppNavGroup = {
  title: string;
  items: AppNavItem[];
};

export const groupedNavigation: AppNavGroup[] = [
  {
    title: 'Main',
    items: [
      { href: '/activate', label: 'Activate', description: 'Reach first value.', icon: 'rocket' },
      { href: '/dashboard', label: 'Dashboard', description: 'Overview and priorities.', icon: 'home' },
      { href: '/studio', label: 'Content Studio 🚀', description: 'Central creation cockpit.', icon: 'layers' },
      { href: '/library', label: 'Library', description: 'Assets and uploads.', icon: 'library' },
    ]
  },
  {
    title: 'Strategy & Research',
    items: [
      { href: '/benchmarks', label: 'Viral Database', description: 'Curated viral references.', icon: 'database' },
      { href: '/trends', label: 'Trends', description: 'Emerging patterns.', icon: 'trending' },
      { href: '/competitors', label: 'Competitors', description: 'Account watchlists.', icon: 'users' },
      { href: '/automation', label: 'Automation', description: 'Autopilot research.', icon: 'zap' },
      { href: '/memory', label: 'Memory Directives 🧠', description: 'Persistent AI context.', icon: 'book' },
    ]
  },
  {
    title: 'Execution',
    items: [
      { href: '/prompts', label: 'Prompts', description: 'Generation formulas.', icon: 'message' },
      { href: '/playbooks', label: 'Playbooks', description: 'Creative workflows.', icon: 'book' },
      { href: '/jobs', label: 'Jobs', description: 'Remix and analysis.', icon: 'cpu' },
      { href: '/compare', label: 'Compare', description: 'Variant comparison.', icon: 'layers' },
    ]
  },
  {
    title: 'Distribution',
    items: [
      { href: '/campaigns', label: 'Campaigns', description: 'Platform campaigns.', icon: 'rocket' },
      { href: '/publishing', label: 'Publishing', description: 'Post scheduling.', icon: 'share' },
      { href: '/cms', label: 'CMS', description: 'Blog and owned-media.', icon: 'globe' },
    ]
  },
  {
    title: 'Management',
    items: [
      { href: '/analytics', label: 'Analytics', description: 'Global performance.', icon: 'bar-chart' },
      { href: '/settings', label: 'Settings', description: 'Accounts and config.', icon: 'settings' },
    ]
  },
  {
    title: 'Support & Community',
    items: [
      { href: '/dashboard?onboarded=true', label: 'Watch Tutorial', description: 'Quick setup overview.', icon: 'zap' },
      { href: '#', label: 'Slack Channel', description: 'Join our community.', icon: 'globe' },
    ]
  }
];

export const appNavigation: AppNavItem[] = groupedNavigation.flatMap(g => g.items);
