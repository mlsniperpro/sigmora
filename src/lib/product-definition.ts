export type ProductModule = {
  name: string;
  status: 'foundation' | 'next' | 'later';
  summary: string;
};

export const productModules: ProductModule[] = [
  {
    name: 'Benchmark Database',
    status: 'foundation',
    summary: 'A curated library of high-performing short-form videos with searchable metadata, tags, and reusable collections.',
  },
  {
    name: 'Asset Library',
    status: 'foundation',
    summary: 'Upload, import, and organize your own content with transcripts, scene analysis, and performance scoring.',
  },
  {
    name: 'Analysis Engine',
    status: 'foundation',
    summary: 'Structural analysis of hooks, pacing, proof moments, CTA timing, and predicted retention behavior.',
  },
  {
    name: 'Remix Workflows',
    status: 'foundation',
    summary: 'Turn benchmark patterns into scripts, scene plans, and creative briefs tailored to your offer.',
  },
  {
    name: 'Trend Intelligence',
    status: 'foundation',
    summary: 'Track emerging formats, hook styles, and content patterns before they saturate.',
  },
  {
    name: 'Competitor Intelligence',
    status: 'foundation',
    summary: 'Monitor competitor accounts, study their content patterns, and find strategic openings.',
  },
  {
    name: 'Prompt Analytics',
    status: 'foundation',
    summary: 'Version, test, and track which generation formulas produce the strongest creative outcomes.',
  },
  {
    name: 'Team Playbooks',
    status: 'foundation',
    summary: 'Bundle benchmarks, prompts, guardrails, and platform targeting into reusable creative strategies.',
  },
  {
    name: 'Creative Analytics',
    status: 'foundation',
    summary: 'Aggregate performance across assets, prompts, and remix outputs to learn what works.',
  },
];

export type FeatureHighlight = {
  title: string;
  description: string;
};

export const featureHighlights: FeatureHighlight[] = [
  {
    title: 'Analyze what actually works',
    description: 'Break down any short-form video into hooks, pacing, proof moments, and CTA structure with quantitative scoring.',
  },
  {
    title: 'Build from proven patterns',
    description: 'Curate benchmark collections of top performers and extract the structural patterns that drive retention.',
  },
  {
    title: 'Generate, don\'t guess',
    description: 'Turn analysis into scripts, scene plans, and creative briefs using versioned prompt templates with outcome tracking.',
  },
  {
    title: 'Stay ahead of trends',
    description: 'Track rising formats and hook styles across platforms. Adopt patterns before they saturate.',
  },
];
