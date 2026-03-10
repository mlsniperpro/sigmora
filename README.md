# Sigmora

Sigmora is a quantitative UGC intelligence and remix platform for short-form video teams. It ingests benchmark videos, extracts multimodal performance signals, turns those signals into structured edit guidance, and helps teams generate, track, and iterate on better variants.

## Product Scope

- Viral UGC benchmark database
- Personal and team content libraries with transcripts and scene analysis
- Competitor account intelligence and watchlist monitoring
- Trend intelligence across platforms
- Prompt management with versioning and outcome analytics
- Creative analytics and outcome tracking
- Remix and script generation workflows (scripts, scene plans, creative briefs)
- Brand-fit and originality guardrails via playbooks
- Team playbooks and collaboration
- Connected accounts and workspace settings

## Technical Stack

- Next.js App Router (v16)
- React 19
- TypeScript
- Firebase client SDK (auth) and Admin SDK (Firestore)
- Content Engine API for media storage and upload orchestration
- Paystack (primary) and Polar (fallback) for billing

## Service Split

- Firebase Auth: user identity and session management
- Firestore: users, workspaces, assets, prompts, jobs, billing metadata, trends, competitors, playbooks
- Billing: Paystack primary checkout, Polar fallback for global coverage
- Content Engine: upload orchestration, media storage, large file handling

## Route Structure

- `/` — Landing page
- `/workspaces` — Workspace selector
- `/workspaces/[slug]/dashboard` — Workspace overview with metrics and trend signals
- `/workspaces/[slug]/library` — Asset library with filtering, upload, and transcript display
- `/workspaces/[slug]/library/[id]` — Asset detail with timeline, transcript, analysis, and recommendations
- `/workspaces/[slug]/benchmarks` — Benchmark collections
- `/workspaces/[slug]/benchmarks/[id]` — Benchmark detail with comparative analysis and pattern extraction
- `/workspaces/[slug]/trends` — Trend intelligence with velocity and saturation tracking
- `/workspaces/[slug]/competitors` — Competitor watchlist and account intelligence
- `/workspaces/[slug]/competitors/[id]` — Competitor detail with content pattern analysis
- `/workspaces/[slug]/prompts` — Prompt template management
- `/workspaces/[slug]/prompts/[id]` — Prompt detail with body, run history, and outcome analytics
- `/workspaces/[slug]/playbooks` — Creative workflow playbooks
- `/workspaces/[slug]/playbooks/[id]` — Playbook detail with linked benchmarks, prompts, and guardrails
- `/workspaces/[slug]/jobs` — Analysis and remix job queues
- `/workspaces/[slug]/jobs/[id]` — Remix job detail with generated output (scenes, scripts, briefs)
- `/workspaces/[slug]/analytics` — Creative analytics dashboard
- `/workspaces/[slug]/settings` — Workspace config, team members, connected accounts
- `/workspaces/[slug]/billing` — Plans, checkout, and subscription management

## Reference Material

- Detailed product specification: `backup/README.md`
- Monetization and marketing strategy: `backup/monetization_marketing.md`
