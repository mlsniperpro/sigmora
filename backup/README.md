# Sigmora: The Quantitative UGC Video Engine

## Overview

This project is a development plan for a product that goes beyond transcript remixing and treats short-form video performance as a measurable systems problem.

The core premise is simple:

- Most existing tools stop at scraped transcripts and LLM rewrites.
- Strong short-form performance is driven by more than text.
- The real signal lives in timing, pacing, scene transitions, audio energy, visual density, hook structure, and retention behavior over time.

The goal is to build a system that can:

- ingest short-form videos and their metadata
- extract multimodal features from video, audio, and transcript streams
- segment videos into interpretable performance states
- map those states to likely retention outcomes
- generate concrete edit plans instead of vague creative suggestions
- optionally render a mock video or storyboard automatically

This document defines the product, architecture, milestones, and engineering plan.

## Supporting Documents

- [Monetization And Marketing Strategy](/Users/mac/Desktop/products/design_docs/ugc_videos/monetization_marketing.md)
- [Storefronts And Distribution Research](/Users/mac/Desktop/products/design_docs/ugc_videos/storefronts_distribution_research.md)

---

## Product Thesis

Sigmora is not a "script spinner" for viral ads.

It is a **quantitative creative engine** for short-form UGC that helps users answer:

- Why does this video hold attention?
- Where does retention likely break?
- What exact pacing and structural changes should be made?
- How can we generate improved variants systematically?

Instead of outputting only rewritten copy, the system should output:

- hook timing recommendations
- cut-frequency recommendations
- scene-by-scene structure
- pacing diagnostics
- suggested proof/demo moments
- variant frameworks
- optional rendered mockups

---

## What We Are Building

### Core Product Features

#### 1. AI Content Remixer / Scriptwriter

Users should not have to spend time writing viral scripts from scratch.

Sigmora should allow a user to:

- upload any video
- choose any viral video from the internal database
- analyze why that video performed well
- extract its hook, pacing, proof structure, and CTA logic
- generate a customized content script tailored to a target audience, product, or offer
- generate a structured scene plan instead of only rewritten text

This feature should operate as both:

- a scriptwriting assistant
- a viral-content remix engine

#### 2. Viral Organic UGC Database

Sigmora should include a searchable database of high-performing organic UGC and short-form videos.

The database should let users:

- discover what is working right now on social platforms
- browse high-performing posts from software brands and adjacent niches
- filter examples by platform, format, niche, hook type, and pacing pattern
- identify trends before they peak
- select benchmark videos to analyze or remix

The database should be updated on a recurring cadence, ideally weekly once ingestion and review workflows are stable.

#### 3. Personal Content Libraries

Sigmora should allow every user or team to maintain a personal content library alongside the shared viral database.

Users should be able to:

- save videos from the viral database into their private library
- import content into their library directly from supported links
- upload their own source videos into their library
- organize saved assets by folder, campaign, niche, product, or client
- mark assets as private, team-shared, or promoted into a broader benchmark set where appropriate
- reuse saved assets later for analysis, benchmarking, and remixing

This matters because users do not only want a global inspiration feed.

They also need a working library of the exact references they want to keep, compare, and transform over time.

#### 4. Competitor Account Spy Tool

Sigmora should include a competitor intelligence feature for Instagram and TikTok accounts where data access is legally and technically supportable.

The purpose of this tool is to let users:

- inspect competitor or creator accounts
- identify which videos are outperforming baseline account performance
- review visible performance metrics and engagement patterns
- detect recurring hook styles, formats, and content themes
- pull strong examples into the benchmark and remix workflow

This feature should feed directly into:

- the viral content database
- the benchmark comparison engine
- the remix workflow
- trend detection

#### 5. Prompt Management And Prompt Analytics

Sigmora should include a prompt management layer for AI-assisted script, remix, and video generation workflows.

This matters because LLM-based generation is not fully deterministic.

Users need to be able to:

- save prompt formulas that produce strong outputs
- version prompts over time
- reuse the same prompt template to regenerate multiple variants
- compare outputs generated from different prompts
- track which prompts consistently lead to better scripts, scene plans, and renders

The system should treat prompts as reusable production assets, not disposable text boxes.

#### 6. Trend Intelligence And Refresh Cadence

Sigmora should include a trend intelligence layer that helps users see what is rising now, not just what performed well in the past.

Users should be able to:

- monitor emerging hooks, formats, creators, and content themes
- identify breakout posts before trends become saturated
- see weekly refreshes to the shared viral database
- distinguish between durable patterns and short-lived trends
- convert trend signals into remixable creative briefs

This feature matters because marketers increasingly need real-time or near-real-time signals rather than stale benchmark snapshots.

#### 7. Creative Analytics And Outcome Tracking

Sigmora should help users prove what is working, not just generate more content.

Users should be able to:

- track which remixes, prompts, structures, and benchmarks led to stronger outcomes
- compare variants across hooks, pacing, proof timing, and CTA timing
- review performance at the asset, prompt, campaign, and niche levels
- connect creative decisions back to ROI-oriented metrics where available

The goal is to make creative iteration measurable.

#### 8. Team Collaboration And Saved Playbooks

Sigmora should support team workflows, not only solo experimentation.

Teams should be able to:

- share saved prompts, benchmark collections, and remix recipes
- maintain approved playbooks for niches, offers, or brands
- comment on assets and generated plans
- keep private, team-shared, and organization-wide workspaces

This turns the system into a repeatable operating environment rather than a one-user generation tool.

The collaboration layer should also support:

- agency workspaces
- client-specific collections
- approval states
- reusable playbooks by brand, niche, or offer

#### 9. Originality, Brand Fit, And Safety Guardrails

Sigmora should help users adapt winning structures without producing low-trust copycat content.

The system should support:

- originality guardrails so outputs are adapted rather than blindly copied
- brand-fit controls for tone, offer style, and content boundaries
- safety and suitability checks before users promote a remix into production
- explainable reasons for why an asset is considered on-brand or risky

This matters because users want authenticity, trust, and repeatable brand alignment, not just volume.

The guardrail layer should also support:

- client- or brand-specific constraints
- creator-style preservation where appropriate
- compliance checks before outputs are approved
- warnings when an output becomes too derivative

#### 10. Mobile Review And Cross-Channel Repurposing

Sigmora should support quick review workflows and content reuse across channels.

Users should be able to:

- review saved assets and generated variants on mobile-friendly surfaces
- repurpose one creative framework into multiple channel-specific variants
- adapt scripts and render plans for different placements or formats

This reflects the reality that creators and marketers increasingly create, review, and publish across multiple tools and devices.

This should support repurposing across destinations such as:

- TikTok
- Instagram Reels
- YouTube Shorts
- paid social ad variants

#### 11. Autonomous Content Research And Publishing

The product should support a fire-and-forget workflow for users who want to launch and run content accounts with minimal manual intervention.

Users should be able to:

- select inspirational TikTok, Instagram, or YouTube accounts
- monitor those accounts for new posts, recurring patterns, and breakout content
- automatically extract themes, hooks, formats, and pacing patterns
- generate new original content plans based on those signals
- turn those plans into scripts, render plans, and ready-to-publish assets
- queue content for scheduled publishing to connected accounts
- choose between review-first mode and fully automated publishing mode where supported

The product should treat this as an account-operating system, not just a one-time generation workflow.

The automation layer should support:

- inspiration account watchlists
- recurring research jobs
- automated content calendars
- autopilot generation queues
- scheduled posting
- retry and failure handling
- account-level performance optimization loops

Where platforms technically support fire-and-forget publishing, the product should allow it.

Where platform rules, permissions, or APIs limit that behavior, the product should:

- expose the limitation clearly
- allow review-first or approval-required modes
- warn the user about account or platform risk before enabling aggressive automation

#### 12. Connected Accounts And Automated Social Campaigns

The product should support automated social campaigns across connected user accounts, not only one-off posting flows.

Users should be able to:

- connect their own accounts through supported authentication flows
- create campaigns that publish across multiple connected platforms
- map one creative plan into multiple platform-specific post variants
- schedule, queue, and monitor campaign delivery
- choose the accounts, cadence, and approval mode for each campaign

This should include support for connected accounts on platforms such as:

- Reddit
- YouTube
- TikTok
- Instagram
- Threads
- LinkedIn
- X
- Bluesky
- Pinterest

The product should not assume equal automation depth across all platforms.

Instead, each platform integration should expose capability flags such as:

- connected-account support
- creation support
- scheduling support
- fire-and-forget support
- review-first requirement
- rate-limit sensitivity
- platform-risk level

#### 13. Connected CMS And Blog Publishing

The product should support owned-media publishing in addition to social distribution.

Users should be able to:

- connect CMS, blog, and website publishing destinations
- generate blog posts and articles from source videos, scripts, prompts, or campaign plans
- repurpose one creative idea into social posts, articles, landing-page copy, and knowledge content
- create drafts, schedule publication, or publish directly where supported
- include blog and CMS destinations in the same campaign plan as social channels

This should include support for publishing targets such as:

- WordPress
- Webflow CMS
- Ghost
- Shopify blog
- Notion-backed publishing workflows
- Sanity
- Contentful
- custom CMS endpoints

The product should expose content-generation endpoints for owned media such as:

- generate blog post
- generate article variants
- generate landing page draft
- push draft to CMS
- schedule or publish article

### Core Jobs To Be Done

1. Analyze a source video at the timeline level.
2. Turn the analysis into an interpretable structure.
3. Compare that structure against benchmark videos.
4. Generate a better-performing edit plan for a target audience or offer.
5. Optionally assemble a rough output video automatically.

### Primary User Types

- performance marketers
- creative strategists
- UGC agencies
- founders running paid social
- in-house growth teams

### Initial Product Surface

- video ingestion
- AI content remixer / scriptwriter
- benchmark library
- viral content database
- personal content libraries
- competitor account spy tool
- prompt management and prompt analytics
- trend intelligence
- creative analytics and outcome tracking
- team collaboration and saved playbooks
- originality, brand fit, and safety guardrails
- mobile review and cross-channel repurposing
- autonomous content research and publishing
- connected accounts and automated social campaigns
- connected CMS and blog publishing
- agency and client workspaces
- approval and compliance workflows
- multimodal analysis pipeline
- retention-risk timeline
- viral content remixing
- script and scene-plan generation
- variant generation
- exportable edit brief
- optional auto-rendered preview

---

## Product Principles

- Build around first-party and user-supplied assets first.
- Treat competitor/public content as benchmark inspiration, not as the only source of truth.
- Keep internal schemas stable even if external APIs change.
- Prefer API-first automation wherever possible.
- Prefer interpretable outputs over black-box scoring.
- Ship deterministic feature extraction before complex modeling.
- Keep the rendering layer optional and replaceable.
- Prefer authenticity-preserving adaptation over blind imitation.
- Design for measurable outcomes, not generation volume alone.

### API-First Automation Principle

The product should be designed with an API-first mindset.

That means:

- use official APIs first whenever they exist
- use connected-account workflows before manual workflows
- expose capability flags instead of pretending all platforms support equal automation
- fall back to supported integration layers, manual import/export, or human-in-the-loop workflows only when direct API automation is unavailable
- keep every external integration behind adapters so platform changes do not break the core system

---

## Personas And Requirements

The product should be designed around three primary user groups with distinct workflow needs.

### 1. UGC Agencies

UGC agencies need to scale creative production across multiple clients without losing process control, brand fit, or quality.

The product should provide:

- agency and client workspaces
- client-specific content libraries
- shared benchmark collections and saved playbooks
- prompt libraries that can be reused across accounts
- approval and review workflows
- brand-fit, originality, and compliance guardrails
- reporting that ties creative decisions back to outcomes

### 2. Paid Social Teams

Paid social teams need fast iteration, reliable benchmarking, and proof that creative changes are improving performance.

The product should provide:

- fresh trend and competitor visibility
- benchmark comparison by niche, platform, and format
- outcome tracking by asset, hook, prompt, playbook, and campaign
- batch variant generation for testing
- audience-specific remixing
- cross-channel repurposing
- workflow automation that reduces repetitive manual work

### 3. Solo Creators

Solo creators need speed, consistency, and the ability to reuse what works without rebuilding the workflow each time.

The product should provide:

- personal content libraries
- saved prompts and saved prompt versions
- one-click regeneration from the same prompt
- mobile-friendly review flows
- style-preserving generation
- lightweight analytics
- fast remixing from saved references or imported links

### Shared Requirements Across All Personas

Across agencies, paid social teams, and solo creators, the common requirements are:

- reusable workflows rather than one-off generation
- measurable outcomes rather than output volume alone
- fresh trend visibility rather than stale benchmark data
- authenticity and brand fit rather than copycat content
- searchable libraries and benchmark discovery
- collaboration and reusable playbooks
- cross-channel reuse and repurposing

---

## Non-Goals For V1

- Full autonomous "one click viral ad" generation
- Deep proprietary model training from day one
- Dependence on a single scraping provider
- Complex infrastructure optimization before product signal exists
- Hard commitment to one render stack too early

---

## Functional Scope

### 1. Ingestion

The system should support these input routes:

- user-uploaded video files
- direct link imports into a personal content library where supported
- creator-connected first-party accounts where officially supported
- connected publishing accounts for campaign delivery where supported
- connected CMS and blog destinations where supported
- competitor account and public-post ingestion where legally and technically stable
- manually imported benchmark links and metadata
- public benchmark libraries where legally and technically stable

The ingestion layer should normalize every asset into one internal schema regardless of source.

### 2. Feature Extraction

Each video should be decomposed into:

- transcript tokens with timestamps
- scenes and shot boundaries
- cut density over time
- speech rate over time
- silence intervals
- loudness and intensity curves
- caption density
- motion intensity
- face presence and framing changes
- product/demo visibility when relevant

### 3. Timeline Segmentation

The system should convert raw features into segments such as:

- hook
- pattern interrupt
- context
- problem framing
- proof
- demo
- value delivery
- objection handling
- CTA

This can start as rule-based plus heuristic segmentation and later evolve into probabilistic state modeling.

### 4. Performance Modeling

The output should estimate:

- likely drop-off windows
- dead-air periods
- pacing mismatches
- underpowered hooks
- scene overload
- missing proof moments
- CTA timing problems

This layer should initially rank and score timeline segments before progressing into more advanced retention models.

### 5. Competitor Intelligence

The system should support competitor and creator analysis workflows that help users understand what content is currently winning in a given niche.

This feature should cover:

- account-level ingestion where supported
- post-level aggregation
- visible performance metric capture
- engagement-rate estimation where inputs are available
- trend and breakout-post detection
- identification of top-performing hooks, formats, and structures

The output should help users answer:

- which videos are popping off on this account
- what structural patterns recur across top performers
- what topics, hooks, and pacing styles are trending
- which examples should be saved into the database for remixing or benchmarking

### 6. Trend Intelligence

The system should continuously surface what is changing in the content landscape.

This should include:

- weekly database refreshes
- rising hook-pattern detection
- breakout content discovery
- niche-level trend summaries
- alerts for emerging formats and creator styles

The output should help users separate:

- timely opportunities worth acting on now
- evergreen structures worth saving as playbooks

The shared benchmark layer should target a weekly refresh cadence as the minimum operating standard.

### 7. Autonomous Research, Scheduling, And Publishing

The system should support an optional autopilot workflow for users who want continuous content operations rather than one-off creative generation.

This should include:

- inspiration account watchlists
- recurring account research jobs
- automatic trend and pattern extraction
- generation queues for new content variants
- publishing queues for connected accounts
- schedule management
- fallback to review-first mode when full automation is not available

The system should allow users to decide the operating mode per account:

- manual
- review-first automation
- fire-and-forget automation where supported

The campaign layer should also support:

- connected-account selection
- multi-platform campaign composition
- per-platform post adaptation
- scheduled campaign rollout
- queue-level monitoring
- retries and fallback routing

### 8. Connected Platform Capability Model

The system should maintain a platform capability model rather than treating every destination equally.

Each supported platform should be classified by:

- whether connected-account publishing is supported
- whether content creation is supported directly
- whether scheduling is supported directly or via queueing
- whether fire-and-forget automation is realistic
- whether review-first mode is strongly recommended

The initial capability matrix should cover:

- Reddit
- YouTube
- TikTok
- Instagram
- Threads
- LinkedIn
- X
- Bluesky
- Pinterest

The owned-media capability matrix should also cover:

- WordPress
- Webflow CMS
- Ghost
- Shopify blog
- Sanity
- Contentful
- custom CMS integrations

### 9. CMS, Blog, And Owned-Media Publishing

The system should support generation and publishing for owned content destinations, not only social platforms.

This should include:

- blog and article generation from source videos or campaign plans
- landing-page and long-form copy generation
- CMS draft creation
- scheduled publishing to connected CMS targets
- synchronization of publication state back into campaign analytics

The system should support a shared campaign layer across:

- social accounts
- blogs
- CMS destinations
- owned websites

### 10. Generation

The system should generate:

- remixed versions of any ingested viral content
- rewritten scripts
- scene plans
- timing maps
- visual instructions
- editor notes
- variant structures
- machine-readable render plans

The generation workflow should also allow users to:

- regenerate outputs from the same saved prompt
- run multiple generations against one prompt version
- compare prompt-driven variants side by side
- promote strong prompt versions into a reusable library

### 11. Rendering

Rendering is intentionally left open as an implementation route, not a product dependency.

Two valid execution paths:

- **Remotion path**
  - good for React-based templating
  - strong for interactive previews and scene composition
  - fits well if the product frontend already lives in TypeScript

- **Python path with MoviePy and/or FFmpeg**
  - good for backend-driven automation
  - strong for media pipelines, transcoding, overlays, and deterministic batch processing
  - lower coupling to frontend rendering decisions

Decision:

- The product spec should not hard-code one stack yet.
- The output contract should be a render-neutral scene specification.
- Remotion or Python/FFmpeg can both implement the same render plan.

### 12. Viral Content Remixing

The product should explicitly support remixing any ingested viral content into a new executable creative plan.

This means a user should be able to:

- select a viral benchmark video from the database
- extract its transcript, pacing, hook pattern, proof structure, and CTA sequence
- adapt that structure to a new audience, offer, or product
- generate a remixed script rather than a shallow paraphrase
- generate a remixed scene plan and timing map
- optionally produce a preview render from the remix

The goal is not blind copying.

The goal is structured transformation:

- preserve the performance logic
- adapt the messaging
- adapt the visuals
- adapt the proof style
- adapt the CTA

In other words, the system should remix the underlying viral mechanics, not just rewrite words.

---

## Architecture

### High-Level System

1. Ingestion Service
2. Asset Normalization Layer
3. Feature Extraction Pipeline
4. Timeline Segmentation Engine
5. Benchmarking and Comparison Engine
6. Recommendation and Generation Engine
7. Render Plan Generator
8. Optional Renderer
9. Frontend Workspace for review and iteration

### Recommended Internal Modules

- `core/models`
- `core/ingestion`
- `core/competitor_intelligence`
- `core/prompt_management`
- `core/trend_intelligence`
- `core/creative_analytics`
- `core/collaboration`
- `core/guardrails`
- `core/workspaces`
- `core/approvals`
- `core/autopilot`
- `core/publishing`
- `core/campaigns`
- `core/platform_capabilities`
- `core/cms_publishing`
- `core/blog_generation`
- `core/transcription`
- `core/video_features`
- `core/audio_features`
- `core/segmentation`
- `core/benchmarking`
- `core/scoring`
- `core/generation`
- `core/render_plan`
- `renderers/remotion`
- `renderers/python_media`
- `api`
- `ui`

---

## Data Model Direction

The internal schema is the durable asset. External platforms, APIs, and scraping methods will change. The internal model should not.

### Core Entities

- `SourceAsset`
- `NormalizedVideo`
- `TranscriptToken`
- `TranscriptSegment`
- `SceneBoundary`
- `VideoFeatureSlice`
- `AudioFeatureSlice`
- `MultimodalSlice`
- `SegmentState`
- `BenchmarkVideo`
- `BenchmarkComparison`
- `RetentionObservation`
- `EditRecommendation`
- `VariantPlan`
- `PromptTemplate`
- `PromptVersion`
- `PromptRun`
- `PromptEvaluation`
- `TrendSnapshot`
- `CreativeOutcome`
- `Playbook`
- `BrandGuardrail`
- `Workspace`
- `ApprovalRecord`
- `WatchlistAccount`
- `ConnectedAccount`
- `Campaign`
- `PublishingQueue`
- `AutomationPolicy`
- `PlatformCapability`
- `CmsConnection`
- `BlogPostDraft`
- `RenderScene`
- `RenderPlan`

### Design Rule

Every major object should be timeline-native.

That means most records should include:

- `start_ms`
- `end_ms`
- `source_id`
- feature payload
- confidence score where relevant

Prompt-related objects should additionally support:

- version history
- author or owner
- input variables
- output linkage
- evaluation metadata

Automation-related objects should additionally support:

- platform
- publishing mode
- approval requirement
- schedule state
- failure and retry state
- risk flags

Campaign-related objects should additionally support:

- connected account ids
- destination platform list
- schedule rules
- rollout status
- per-platform delivery results

Owned-media objects should additionally support:

- cms provider
- content type
- draft status
- publication url
- publish state
- sync state

---

## Analytical Approach

### Phase 1: Deterministic Analysis

Start with measurable signals before introducing sophisticated ML:

- ASR transcription with timestamps
- scene detection
- loudness curves
- speech-rate estimation
- silence detection
- caption density
- visual activity scoring

This gives fast product value and avoids fake precision.

### Phase 2: Structured Segmentation

Use rules, thresholds, and benchmark comparisons to identify structural phases in a video.

Examples:

- whether the hook lasts too long before payoff
- whether the first proof signal appears too late
- whether the CTA arrives after momentum has collapsed

### Phase 3: Statistical Sequence Modeling

Once enough labeled data exists, add models such as:

- HMMs
- hidden semi-Markov models
- change-point detection
- sequence classifiers
- survival or hazard-style retention models

Important:

- HMMs should be treated as one modeling option, not the entire architecture.
- Interpretability matters more than model novelty in the early product.

---

## Benchmark Strategy

We need a benchmark corpus, but we should not build the company around fragile scraping assumptions.

### Safer Benchmark Sources

- user-owned videos
- user-provided benchmark uploads
- creator-submitted examples
- public ad libraries where terms permit usage
- manually curated benchmark sets

### Benchmark Value

Benchmarks should support:

- hook comparison
- pacing comparison
- structure comparison
- proof/CTA timing comparison
- niche-specific style patterns

## Viral Content Database Population Plan

The product should include an explicit plan for building and maintaining a viral content database.

### Purpose

The database is not just a media archive.

It is the reference layer that powers:

- benchmark search
- viral pattern discovery
- remix inputs
- comparative diagnostics
- niche-specific creative guidance

### What Gets Stored

Each database entry should include:

- source platform
- source URL or asset reference
- creator or brand when available
- raw media or normalized media reference
- transcript
- scene boundaries
- multimodal feature slices
- structural segment labels
- performance metadata available from the source
- manual and automated tags
- remix eligibility and provenance metadata

### Population Routes

The database can be populated through multiple routes:

- user-uploaded viral examples
- manually curated benchmark imports
- team-reviewed public examples from stable legal sources
- creator-submitted examples
- approved ingestion connectors where supported
- competitor account spy ingestion where supported

### Relationship Between Shared Database And Personal Libraries

The system should support two distinct but connected asset collections:

- a shared viral content database
- a personal content library for each user or team

Users should be able to:

- save any relevant benchmark from the shared database into their personal library
- import assets by URL directly into their personal library
- upload original content directly into their personal library
- choose whether a library asset remains private or becomes part of a wider benchmark workflow

This separation is important because not every saved reference should immediately enter the shared benchmark corpus.

### Population Modes

The population strategy should start with:

- manual curation for quality
- semi-automated enrichment for metadata and feature extraction
- later automation for tagging, deduplication, clustering, and retrieval

### Required Workflow

Every new benchmark asset should go through:

1. ingestion
2. normalization
3. transcript and feature extraction
4. tagging and taxonomy assignment
5. deduplication check
6. quality review
7. database publication

### Tagging Dimensions

The database should support tags such as:

- niche
- software category
- offer type
- hook type
- creator style
- pacing class
- proof style
- CTA style
- platform
- duration bucket
- visual intensity

### Why This Matters

Without a populated viral content database, the product has no durable benchmark layer and no strong remix source material.

The database is a core product asset, not a side feature.

---

## Render Strategy

The product should separate **analysis**, **planning**, and **rendering**.

### Render-Neutral Contract

The generation layer should emit a `RenderPlan` that includes:

- scenes
- scene durations
- text overlays
- voiceover segments
- media references
- transitions
- pacing instructions
- caption timing

### Route A: Remotion

Use when:

- interactive editing matters
- preview speed in a web app matters
- the product team prefers React and TypeScript

Strengths:

- reusable component system
- easier scene templating
- frontend and render logic can align closely

### Route B: Python With MoviePy / FFmpeg

Use when:

- backend automation matters more than visual UI composition
- batch generation and media operations dominate
- the team wants one main language for analysis and rendering orchestration

Strengths:

- strong scripting and pipeline control
- efficient encoding/transcoding workflows
- simple backend-native composition path

### Decision For Now

Document both as valid implementation routes.

Do not lock the project to one render engine in the early planning phase.

---

## Recommended Tech Direction

We should avoid overcommitting to infrastructure details before product proof exists.

### Practical V1 Stack

- **Backend API:** FastAPI
- **Primary language:** Python
- **Data store:** PostgreSQL
- **Blob/media storage:** S3-compatible storage
- **Async jobs:** worker queue
- **Feature extraction:** FFmpeg plus Python libraries
- **Transcription:** pluggable ASR provider
- **Frontend:** React or Next.js
- **Renderer:** Remotion or Python/FFmpeg path

### Why This Is Enough

- Python is the natural home for analysis pipelines.
- FFmpeg is table stakes regardless of higher-level tooling.
- React remains useful for review, benchmark exploration, and optional Remotion rendering.
- The rendering engine can remain an adapter behind a stable contract.

---

## MVP Definition

The MVP should prove that the product can generate materially better creative guidance than transcript-only tools.

### MVP Inputs

- uploaded short-form video
- direct link import into the personal content library where supported
- selected viral benchmark video from the database
- optional competitor or creator account input
- optional saved prompt template
- optional saved playbook
- optional workspace or client context
- optional inspiration account watchlist
- optional connected publishing accounts
- optional connected CMS or blog destinations
- optional target audience
- optional product/offer
- optional benchmark selection

### MVP Outputs

- transcript with timing
- explanation of why the selected source video likely performed well
- scene breakdown
- pacing scorecard
- hook analysis
- drop-off risk windows
- visible performance and engagement summary where available
- structured edit recommendations
- rewritten script
- scene-by-scene shot plan
- prompt version used for generation
- repeatable regeneration workflow from the same prompt
- weekly-refreshed benchmark and trend context where available
- workspace-aware and client-aware generation context where applicable
- optional scheduled publishing plan
- optional fire-and-forget automation mode where supported
- optional multi-platform campaign plan
- optional blog or CMS publication plan
- optional preview render or storyboard

### MVP Success Criteria

- users can understand why a video is weak or strong
- users receive timeline-specific recommendations
- generated plans are usable by editors or creators
- output feels materially more actionable than a plain LLM rewrite
- teams can save and reuse winning prompts, playbooks, and benchmarks
- agencies and teams can review outputs inside a structured workspace flow
- users can run continuous research-to-publishing workflows from inspiration accounts
- users can run campaigns across connected social accounts with platform-aware automation modes
- users can extend campaigns into blogs and CMS destinations from the same system

---

## Development Plan

### Phase 0: Product Framing

Deliverables:

- define user persona and workflow
- define the internal data contracts
- define benchmark taxonomy
- define a render-neutral `RenderPlan`
- define prompt template and prompt-run contracts
- define playbook, trend, and guardrail contracts
- define workspace, client, and approval contracts
- define watchlist, scheduling, and publishing-policy contracts
- define connected-account, campaign, and platform-capability contracts
- define CMS connection and owned-media publishing contracts

Exit criteria:

- clear scope for MVP
- no hard dependency on one platform API
- no hard dependency on one rendering engine

### Phase 1: Core Ingestion and Normalization

Deliverables:

- upload endpoint
- personal content library ingestion endpoints
- direct link import workflow
- benchmark and competitor source adapters
- prompt template storage
- shared playbook storage
- workspace and client scoping
- inspiration account watchlist storage
- publishing queue foundations
- connected account storage
- campaign orchestration foundations
- CMS connection storage
- blog-generation endpoint contracts
- asset metadata extraction
- normalized video record
- storage path conventions
- job orchestration for processing

Exit criteria:

- a user can submit a video and receive a normalized asset record

### Phase 2: Multimodal Feature Extraction

Deliverables:

- transcript extraction with timestamps
- shot boundary detection
- audio energy and silence analysis
- speech-rate estimation
- caption timing extraction if available
- timeline feature slices

Exit criteria:

- one video can be transformed into a consistent multimodal timeline representation

### Phase 3: Rule-Based Structural Analysis

Deliverables:

- hook detector
- proof/demo detector heuristics
- CTA timing heuristics
- pacing diagnostics
- edit recommendation engine

Exit criteria:

- a user receives useful structured recommendations from one processed video

### Phase 4: Benchmarking Layer

Deliverables:

- benchmark corpus schema
- personal content library schema
- viral content database schema
- viral content ingestion workflow
- competitor account spy workflow
- trend refresh workflow
- workspace-aware benchmark access patterns
- inspiration account monitoring workflow
- platform capability registry
- CMS capability registry
- benchmark search/filter UI
- comparison engine for hook length, cut density, proof timing, and CTA timing
- comparative recommendation layer

Exit criteria:

- a user can compare one video against relevant benchmark patterns
- a user can select a viral benchmark and use it as a remix source
- a user can save shared benchmarks into a personal library and import references by link
- the system can surface fresh trend context on a recurring cadence

### Phase 5: Generative Planning

Deliverables:

- viral content remix engine
- rewritten script generator
- variant planner
- prompt versioning
- prompt-run logging
- prompt reuse workflow for regeneration
- originality and brand-fit checks
- workspace-aware generation
- approval workflow hooks
- generation-to-publishing queue integration
- multi-platform campaign assembly
- blog and article generation endpoints
- shot list generator
- machine-readable `RenderPlan`

Exit criteria:

- the system can transform analysis into an executable creative brief
- the system can remix a selected viral benchmark into a new script and scene plan
- the user can rerun generation from the same saved prompt and compare variants
- the system can preserve user-defined brand and originality constraints
- teams can apply saved playbooks and workspace context consistently

### Phase 6: Preview Rendering

Deliverables:

- adapter for Remotion and/or Python renderer
- template system for basic UGC preview
- exportable storyboard or rough cut
- scheduling and publishing adapters for supported platforms
- campaign-level delivery orchestration
- CMS publishing adapters

Exit criteria:

- the user can preview the generated structure as media, not only text
- the user can move approved assets into a posting queue

### Phase 7: Learning System

Deliverables:

- feedback capture
- outcome labeling
- retention-linked model training
- sequence modeling experiments
- prompt analytics and prompt evaluation
- creative outcome analytics
- playbook performance analysis
- workspace and client-level performance views
- account-level automation performance analytics
- campaign-level delivery analytics
- owned-media publication analytics

Exit criteria:

- recommendations improve based on real usage and labeled outcomes
- the system can identify which prompt patterns produce better outputs
- the system can identify which playbooks and structures outperform by niche or audience
- agencies can see which client-specific workflows are performing best
- the system can optimize ongoing automated publishing workflows over time

---

## Suggested Build Order

If the team wants the fastest route to a credible product, the order should be:

1. internal schemas
2. upload and normalization
3. transcript plus scene detection
4. pacing diagnostics
5. structured edit recommendations
6. benchmark comparison
7. script and scene-plan generation
8. preview rendering
9. advanced sequence modeling

This order matters because it gets useful output in front of users before expensive modeling work begins.

---

## Risks

### 1. Data Rights Risk

Do not design the company around unsupported scraping assumptions.

Mitigation:

- prioritize first-party and uploaded content
- keep benchmark ingestion modular
- treat public data sources as optional enrichments

### 2. False Precision Risk

Timeline scores can look scientific without being meaningful.

Mitigation:

- begin with interpretable deterministic signals
- expose confidence when needed
- validate recommendations against user feedback

### 3. Overbuilt Infra Risk

Premature low-level infra optimization can delay product learning.

Mitigation:

- keep the stack operationally simple at first
- optimize compute economics after pipeline usage is clear

### 4. Render Lock-In Risk

Choosing a render engine too early can distort the architecture.

Mitigation:

- preserve a render-neutral scene contract
- implement rendering as an adapter layer

---

## Open Decisions

These do not block planning, but they should be resolved during implementation:

- which ASR provider to use initially
- whether benchmark ingestion will start manual or semi-automated
- how far competitor account ingestion can go within platform and legal constraints
- whether the first renderer should be Remotion or Python/FFmpeg
- what minimum benchmark taxonomy is needed by niche
- which retention labels can be collected reliably in V1
- how prompt quality should be scored and surfaced to users
- how originality, brand-fit, and safety checks should be implemented in V1
- how approval workflows should operate for agencies and teams
- which platforms can support true fire-and-forget publishing versus review-first automation
- which connected-account platforms should be in the first campaign release
- which CMS providers should be in the first owned-media release

---

## Implementation Guidance

### Engineering Rule

Keep the product architecture stable even if the tooling changes.

That means:

- analysis contracts should not depend on render technology
- ingestion contracts should not depend on one platform
- recommendation logic should not depend on one model family

### Practical Conclusion

We do not need to decide today between:

- Remotion
- MoviePy
- FFmpeg-first assembly

We only need to document that:

- any of these routes can implement rendering
- the system should emit the same `RenderPlan` regardless
- renderers should remain replaceable adapters

That is the correct level of commitment for this stage.

---

## Immediate Next Steps

The next implementation artifact should be one of these:

1. Python `pydantic` models for the internal timeline-native schema
2. the `RenderPlan` contract
3. the MVP API specification

Best next step:

Start with the Python data models and define the render-neutral contracts first.
