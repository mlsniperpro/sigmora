export type AppNavItem = {
  href: string;
  label: string;
  description: string;
};

export const appNavigation: AppNavItem[] = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    description: 'Workspace overview and operating priorities.',
  },
  {
    href: '/library',
    label: 'Library',
    description: 'Assets, folders, uploads, and imports.',
  },
  {
    href: '/benchmarks',
    label: 'Benchmarks',
    description: 'High-performing references and collections.',
  },
  {
    href: '/trends',
    label: 'Trends',
    description: 'Emerging formats and patterns.',
  },
  {
    href: '/competitors',
    label: 'Competitors',
    description: 'Account intelligence and watchlists.',
  },
  {
    href: '/prompts',
    label: 'Prompts',
    description: 'Generation formulas and analytics.',
  },
  {
    href: '/playbooks',
    label: 'Playbooks',
    description: 'Reusable creative workflows.',
  },
  {
    href: '/jobs',
    label: 'Jobs',
    description: 'Analysis and remix queues.',
  },
  {
    href: '/campaigns',
    label: 'Campaigns',
    description: 'Multi-platform publishing campaigns.',
  },
  {
    href: '/automation',
    label: 'Automation',
    description: 'Watchlists and autopilot research.',
  },
  {
    href: '/publishing',
    label: 'Publishing',
    description: 'Queue, schedule, and track posts.',
  },
  {
    href: '/cms',
    label: 'CMS',
    description: 'Blog and owned-media publishing.',
  },
  {
    href: '/compare',
    label: 'Compare',
    description: 'Side-by-side variant comparison.',
  },
  {
    href: '/originality',
    label: 'Originality',
    description: 'Brand-fit and originality checks.',
  },
  {
    href: '/analytics',
    label: 'Analytics',
    description: 'Creative outcomes and performance.',
  },
  {
    href: '/settings',
    label: 'Settings',
    description: 'Accounts, approvals, and config.',
  },
];
