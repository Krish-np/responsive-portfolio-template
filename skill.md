# Technical Analysis: Taste Skill Repository

> Complete architectural documentation of [leonxlnx/taste-skill](https://github.com/leonxlnx/taste-skill) — a collection of portable Agent Skills that upgrade AI-generated frontend interfaces. This document analyzes the project's architecture, design philosophy, and implementation patterns so you can build similar systems for your own projects.

---

## 1. Project Overview

### Purpose

Taste Skill is an open-source collection of **portable AI Agent Skills** — structured markdown instruction files (`SKILL.md`) designed to be loaded by AI coding agents (Claude Code, Codex, Cursor, ChatGPT, Google Stitch, etc.) to enforce premium frontend design standards. The project exists to combat the statistically biased, generic "slop" that AI models produce when generating user interfaces.

The core problem it solves: LLMs have strong training-data biases toward producing identical, recognizable patterns — Inter font, purple gradients, three equal cards, centered heroes, em-dashes everywhere. Taste Skill provides machine-readable design constraints that override these defaults at generation time.

### Design Philosophy

The project operates on several foundational principles:

1. **Anti-Slop by Default** — Every skill contains an explicit list of banned patterns ("AI Tells") that the model must avoid. These are not suggestions; they are hard constraints.

2. **Dial-Driven Configurability** — Instead of one rigid design system, the flagship skill uses three numeric dials (`DESIGN_VARIANCE`, `MOTION_INTENSITY`, `VISUAL_DENSITY`) that the AI adjusts based on the project brief. This allows the same skill to produce anything from minimal editorial UI to chaotic Awwwards-experimental layouts.

3. **Brief Inference Before Execution** — The AI must "read the room" before generating any code. It infers page kind, audience, vibe, brand assets, and quiet constraints, then declares a one-line "Design Read" — similar to how a human designer would approach a brief.

4. **Framework Agnosticism** — Skills target design intent, not framework-specific APIs. The rules work with React, Vue, Svelte, vanilla HTML/CSS, or any stack.

5. **Modular Specialization** — Each skill does one job well. You don't need all of them. Implementation skills output code; image-generation skills output reference images.

### User Experience Goals

- **Installability** — Single CLI command (`npx skills add`) discovers and installs skills via the Vercel Agent Skills standard
- **Portability** — Skills can be copied into any project, pasted into any AI conversation, or loaded as VS Code/Claude plugins
- **Progressive Enhancement** — Start with the default skill; add specialized variants only when needed
- **Version Pinning** — v1 is preserved alongside v2 (experimental) for backward compatibility

### Overall Architecture

The repository is organized as a **skill registry** with supporting research, build tooling, and distribution infrastructure:

```
Architecture Layers:
┌─────────────────────────────────────────────────────────┐
│  Distribution Layer                                      │
│  npx skills add CLI / VS Code Plugin / Claude Plugin     │
├─────────────────────────────────────────────────────────┤
│  Skill Layer (skills/)                                   │
│  13 independent SKILL.md files with YAML frontmatter     │
│  + 1 DESIGN.md (Stitch export format)                   │
├─────────────────────────────────────────────────────────┤
│  Research Layer (research/)                              │
│  Academic-backed documentation of LLM behavior           │
│  Root causes, remediation, empirical findings            │
├─────────────────────────────────────────────────────────┤
│  Build/Asset Layer (scripts/, assets/, examples/)        │
│  Image processing, WebP conversion, sponsor badges       │
├─────────────────────────────────────────────────────────┤
│  Configuration Layer (.github/, .claude-plugin/)         │
│  Copilot instructions, plugin manifests, funding         │
└─────────────────────────────────────────────────────────┘
```

---

## 2. Folder Structure

### Root Directory

| Path | Purpose |
|---|---|
| `README.md` | Project documentation: installation, skill descriptions, examples, sponsors, FAQ, license |
| `CHANGELOG.md` | Detailed v1 → v2 diff with rationale, new sections, hardened bans, and stability notes |
| `LICENSE` | MIT License |
| `skill.sh` | Bash-based local skill registry — maps skill names to file paths for sourcing |

### `skills/` — The Core Skill Registry

Each subdirectory contains a self-contained skill with a `SKILL.md` file using YAML frontmatter for metadata discovery:

| Directory | Install Name | Function |
|---|---|---|
| `skills/taste-skill/` | `design-taste-frontend` | **Flagship skill (v2 experimental)**. 1,206 lines. Full brief inference, three dials, design-system map, GSAP code skeletons, anti-slop rules, pre-flight checklist. |
| `skills/taste-skill-v1/` | `design-taste-frontend-v1` | Original v1 preserved for backward compatibility. 226 lines. Core dial system and anti-slop rules without v2's hardened enforcement. |
| `skills/gpt-tasteskill/` | `gpt-taste` | Stricter variant for GPT/Codex. Enforces Python-driven true randomization, AIDA page structure, 2-line hero rule, gapless bento grids, and GSAP ScrollTrigger patterns. |
| `skills/image-to-code-skill/` | `image-to-code` | Image-first pipeline: generate design references → deep analysis → implementation. 1,228 lines with 38 sections of rules. |
| `skills/redesign-skill/` | `redesign-existing-projects` | Audit-first approach for upgrading existing codebases. Covers typography, color, layout, interactivity, content, components, iconography, and code quality. |
| `skills/soft-skill/` | `high-end-visual-design` | Premium Awwwards-tier UI with "Double-Bezel" nested architecture, fluid island nav, magnetic hover physics, spring choreography. |
| `skills/output-skill/` | `full-output-enforcement` | Prevents LLM truncation. Bans placeholder patterns and enforces complete code generation with clean breakpoint handling. |
| `skills/minimalist-skill/` | `minimalist-ui` | Editorial product UI (Notion/Linear vibes). Warm monochrome palette, bento grids, muted pastels, zero gradients. |
| `skills/brutalist-skill/` | `industrial-brutalist-ui` | Swiss typographic print meets military terminal aesthetics. Rigid grids, extreme type contrast, analog degradation effects. |
| `skills/stitch-skill/` | `stitch-design-taste` | Google Stitch-compatible semantic design rules. Includes `DESIGN.md` export format for Stitch screen generation. |
| `skills/imagegen-frontend-web/` | `imagegen-frontend-web` | Image-generation-only skill for website design comps. One separate image per section, never compressed multi-section boards. |
| `skills/imagegen-frontend-mobile/` | `imagegen-frontend-mobile` | Image-generation-only skill for mobile app screens and flows. Platform-aware, premium phone mockup framing. |
| `skills/brandkit/` | `brandkit` | Image-generation-only skill for brand identity boards — logo concepts, palettes, typography, mockups. |
| `skills/llms.txt` | — | Plain-text index of all skills with descriptions. Machine-readable discovery file for LLM tooling. |

### `research/` — Academic Backing

| Path | Content |
|---|---|
| `research/README.md` | Navigation index for research topics |
| `research/laziness/README.md` | Structured analysis of LLM output truncation |
| `research/laziness/root-causes/` | Four files: RLHF economics, training data bias, cognitive shortcuts, output limits |
| `research/laziness/remediation/` | Four files: parameter tuning, prompt engineering, architectural patterns, reference prompts |
| `research/laziness/findings/` | Empirical results from 2025 controlled experiments, cited references |

### `scripts/` — Build Tooling

| File | Purpose |
|---|---|
| `build-emil-sponsor-row.mjs` | Composites sponsor logo + badge into a single WebP image using Sharp |
| `convert-readme-assets-webp.mjs` | Converts PNG assets to WebP with background removal, bounds detection, and quality optimization |
| `process-readme-buttons.mjs` | Processes README button images for the project's GitHub page |
| `process-sponsor-badge.mjs` | Processes sponsor badge images |

### `assets/` — Visual Resources

| Path | Content |
|---|---|
| `assets/readme-banner.webp` | Hero banner for the GitHub README |
| `assets/readme-buttons/` | Badge-style buttons (Site, MIT, Agent Skills, Tools, Changelog) |
| `assets/readme-cta-tasteskill.svg` | Call-to-action SVG graphic |
| `assets/sponsors/` | Sponsor logos (IMG.LY, animations.dev, Sent.dm, Vercel) |
| `assets/taste-skill-logo.png/webp` | Project logo |
| `assets/vercel-oss-program-badge.svg` | Vercel Open Source Program badge |

### `examples/` — Output Demonstrations

| File | Content |
|---|---|
| `examples/floria-full.webp` | Full-page screenshot of a site built with taste-skill |
| `examples/floria-top.webp` | Top half (for side-by-side display) |
| `examples/floria-bottom.webp` | Bottom half |

### `.github/` — Platform Configuration

| File | Purpose |
|---|---|
| `copilot-instructions.md` | Anti-slop manifesto for GitHub Copilot — 5 rules that Copilot reads automatically |
| `FUNDING.yml` | GitHub Sponsors configuration |

### `.claude-plugin/` — VS Code Marketplace Integration

| File | Purpose |
|---|---|
| `plugin.json` | Claude Code plugin manifest (name, description, version, author) |
| `marketplace.json` | Marketplace configuration for VS Code Claude extension discovery |

---

## 3. Technology Stack

### Core Technologies

This project is **not** a traditional web application — it's a collection of structured markdown instruction files. The "technology" is prompt engineering, but the ecosystem around it uses:

**Distribution & CLI:**
- `npx skills add` — Vercel Agent Skills CLI for installation
- npm ecosystem for package distribution
- Bash scripting (`skill.sh`) for local registry

**Build Tooling:**
- **Node.js (ESM modules)** — All scripts use `.mjs` extension with `import` syntax
- **Sharp** — High-performance image processing for WebP conversion, compositing, background removal, and bounds detection
- **Flood-fill algorithm** — Custom BFS-based background removal in `convert-readme-assets-webp.mjs`

**Plugin Standards:**
- **Vercel Agent Skills** — `npx skills add` compatible SKILL.md format with YAML frontmatter
- **GitHub Copilot Instructions** — `.github/copilot-instructions.md` for automatic Copilot behavior
- **Claude Code Plugin** — `.claude-plugin/plugin.json` and `marketplace.json` for VS Code integration
- **Model Context Protocol (MCP)** — Referenced in research for real-time data integration

**Documentation:**
- **Markdown with YAML frontmatter** — Portable, human-readable, machine-parseable
- **llms.txt** — Machine-readable skill index for LLM tooling
- **SemVer-ish versioning** — Experimental pre-releases with stable API convergence plan

### Libraries Referenced in Skills (for generated output)

The skills themselves are documentation, but they reference and instruct AI agents to use:

| Category | Technologies |
|---|---|
| Framework | React, Next.js (Server Components), Vue, Svelte |
| Styling | Tailwind CSS v4 (default), v3 (legacy), vanilla CSS |
| Animation | Motion (`motion/react`, formerly Framer Motion), GSAP (ScrollTrigger, pinning, scrubbing) |
| 3D/WebGL | Three.js (for isolated canvas backgrounds) |
| Icons | Phosphor, HugeIcons, Radix UI Icons, Tabler |
| Fonts | Geist, Outfit, Cabinet Grotesk, Satoshi, Plus Jakarta Sans |
| Design Systems | Material Web, Fluent UI, Carbon, Radix Themes, shadcn/ui, Primer, GOV.UK, USWDS, Bootstrap, Polaris, Atlaskit |
| State | Zustand, Jotai, React Context (only for deep prop-drilling avoidance) |
| Utilities | `next/font`, `@font-face` with `font-display: swap` |

---

## 4. Component Architecture (Skill System Design)

### The SKILL.md Pattern

Every skill follows a consistent architecture:

```yaml
---
name: install-name-here          # Discovery hook (~100 tokens)
description: One precise line    # Determines ~90% discovery success rate
---

# Skill Title

## Structured Sections
- Configuration dials (numeric variables)
- Design rules (hard constraints)
- Anti-patterns (banned patterns)
- Implementation patterns (canonical code)
- Pre-flight checklist (verification)
```

**Key Design Decisions:**

1. **YAML Frontmatter** — The `name` and `description` fields act as lightweight discovery hooks. The AI agent reads only these ~100 tokens during initialization and loads the full body only when relevant. This achieves a documented **35% reduction in average context usage**.

2. **Description Specificity** — Research shows vague descriptions achieve ~68% discovery success, while specific descriptions achieve ~90%. Every skill description is engineered for maximum specificity.

3. **Self-Contained** — Each skill references nothing outside itself. No cross-imports between skills.

### Skill Composition Model

Each skill is composed of these architectural layers:

| Layer | Purpose | Example |
|---|---|---|
| **Configuration** | Numeric dials that parametrize output | `DESIGN_VARIANCE: 8` |
| **Inference** | Pre-execution analysis of the brief | "Reading this as: B2B SaaS landing for technical buyers..." |
| **Design System Map** | Decision tree for choosing the right foundation | Brief → Material / Fluent / Carbon / shadcn / vanilla |
| **Hard Rules** | Non-negotiable constraints | "No em-dashes. No Inter. No pure black." |
| **Implementation Patterns** | Canonical code skeletons | GSAP sticky-stack pattern, bento grid pattern |
| **Anti-Patterns** | Explicitly banned behaviors | "The generic 3-card row is BANNED" |
| **Pre-Flight Checklist** | Verification gate before output | 25+ checkbox items the agent must honestly pass |

---

## 5. Detailed Skill Analysis

### 5.1 Taste Skill (v2) — The Flagship

**Lines:** 1,206 | **Install Name:** `design-taste-frontend`

#### Configuration System — The Three Dials

| Dial | Range | Default | Effect |
|---|---|---|---|
| `DESIGN_VARIANCE` | 1–10 | 8 | 1 = Perfect symmetry → 10 = Artsy chaos |
| `MOTION_INTENSITY` | 1–10 | 6 | 1 = Static → 10 = Cinematic/Physics |
| `VISUAL_DENSITY` | 1–10 | 4 | 1 = Art gallery → 10 = Cockpit/packed |

**Dial Inference Logic:**
The skill maps user signals to dial values. For example:
- "minimalist / clean / calm" → Variance 5–6, Motion 3–4, Density 2–3
- "Awwwards / experimental" → Variance 9–10, Motion 8–10, Density 3–4
- "trust-first / public-sector" → Variance 3–4, Motion 2–3, Density 4–5

#### Brief Inference Protocol (Section 0)

Before any code, the agent must:
1. Read signals: page kind, vibe words, reference signals, audience, brand assets, quiet constraints
2. Output a one-line "Design Read" declaration
3. Ask at most ONE clarifying question (only when genuinely ambiguous)
4. Apply Anti-Default Discipline — deliberately avoid the LLM defaults (purple gradients, centered hero, three cards, Inter + slate-900)

#### Design System Map (Section 2)

The skill contains a decision matrix mapping brief types to official design systems:

| Brief Reads As... | Reach For |
|---|---|
| Microsoft / Enterprise | `@fluentui/react-components` |
| Google / Material | `@material/web` + Material 3 |
| IBM B2B | `@carbon/react` |
| Shopify | Polaris |
| GitHub-style | `@primer/css` |
| Public-sector UK | `govuk-frontend` |
| Modern SaaS (indie) | shadcn/ui |
| Tailwind-based | Tailwind v4 |

**Critical rule:** When the brief matches an official system, use the official package. Never recreate CSS by hand. One system per project — no mixing.

#### Animation Architecture (Section 5)

The skill defines canonical code patterns:

**GSAP Sticky-Stack:**
- `start: "top top"`, `pin: true`, `scrub: true`
- Transform driven by NEXT card's trigger
- Never `window.addEventListener('scroll')`

**GSAP Horizontal-Pan:**
- `start: "top top"`, `pin: true`, `end: "+=" + distance`, `scrub: 1`

**Motion (Framer Motion) Scroll-Reveal:**
- `whileInView` for simple reveals
- Save GSAP for actual pinning/scrubbing

**Forbidden Patterns:**
- `window.addEventListener('scroll')`
- Custom scroll calculations in React state
- `requestAnimationFrame` loops touching React state

#### State Management Rules

- **Local:** `useState` / `useReducer` for isolated UI
- **Global:** ONLY for deep prop-drilling avoidance (Zustand, Jotai, Context)
- **CRITICAL:** Never use `useState` for continuous values (mouse position, scroll progress, magnetic hover). Use `useMotionValue` / `useTransform` / `useScroll` instead — `useState` re-renders the entire React tree and collapses on mobile

#### The Complete AI Tells Ban List (Section 9)

The most detailed anti-pattern catalog in the project. Categories include:

- **Typography Tells:** Inter as default font, all-caps subheaders everywhere, orphaned words
- **Color Tells:** AI-purple gradients, pure `#000000` background, oversaturated accents
- **Layout Tells:** Three equal card columns, everything centered, no overlap/depth
- **Content Tells:** "John Doe", "Acme Corp", "Elevate", "Seamless", em-dashes everywhere
- **Component Tells:** Always one filled + one ghost button, accordion FAQs, 3-card testimonial carousels
- **Structural Tells:** Section-number eyebrows (`00 / INDEX`), version labels in hero, scroll cues, decorative dots
- **Em-Dash Ban (Complete):** Zero em-dashes anywhere — the single most-violated Tell in testing

#### Pre-Flight Checklist (Section 14)

25+ verification checkboxes the agent must honestly pass before delivering:
- Mobile collapse guaranteed
- `min-h-[100dvh]` instead of `h-screen`
- `useEffect` cleanup functions
- Empty/loading/error states provided
- Cards omitted in favor of spacing where possible
- Motion isolated in client-leaf components
- No AI Tells from Section 9
- Core Web Vitals plausibly hit
- One design system per project

### 5.2 GPT Taste Skill — The Strict Variant

**Lines:** 74 | **Install Name:** `gpt-taste`

Differentiators from the flagship:

1. **Python-Driven True Randomization** — Simulates a Python `random.choice()` execution before coding to prevent the LLM from always picking the first layout option. Uses deterministic seed based on prompt character count.

2. **AIDA Structure** — Every page follows: Attention (Hero), Interest (Features/Bento), Desire (GSAP Scroll), Action (Footer/CTA).

3. **2-Line Hero Iron Rule** — H1 must NEVER exceed 2–3 lines. Container must be `max-w-5xl` or wider. 4+ lines is a "catastrophic failure."

4. **Gapless Bento Grid** — `grid-flow-dense` mandatory. Mathematical verification that columns and rows interlock perfectly.

5. **Meta-Label Ban** — "SECTION 01", "QUESTION 05" banned forever.

6. **Mandatory Pre-Flight `<design_plan>`** — Before any code, the agent must output a structured verification block.

### 5.3 Soft Skill — Premium Awwwards-Tier

**Lines:** 98 | **Install Name:** `high-end-visual-design`

Defines the "Vanguard_UI_Architect" persona with:

**"Absolute Zero" Directive** — Hard-banned elements:
- Fonts: Inter, Roboto, Arial, Open Sans, Helvetica
- Icons: Standard thick-stroked Lucide, FontAwesome
- Borders: Generic 1px solid gray
- Shadows: Harsh `shadow-md`, `rgba(0,0,0,0.3)`
- Motion: Standard `linear` or `ease-in-out`

**Creative Variance Engine** — Silently "rolls dice" to select:
- 1 Vibe Archetype (Ethereal Glass / Editorial Luxury / Soft Structuralism)
- 1 Layout Archetype (Asymmetrical Bento / Z-Axis Cascade / Editorial Split)

**Double-Bezel (Doppelrand) Architecture:**
- Outer Shell: subtle background, hairline border, large radius (`rounded-[2rem]`)
- Inner Core: distinct background, inner highlight, calculated smaller radius (`rounded-[calc(2rem-0.375rem)]`)

**Motion Choreography:**
- Custom cubic-bezier: `cubic-bezier(0.32, 0.72, 0, 1)`
- Magnetic button hover physics with nested icon translation
- Staggered mask reveals with cascaded delays

### 5.4 Brutalist Skill — Industrial/Tactical

**Lines:** 92 | **Install Name:** `industrial-brutalist-ui`

Two visual archetypes (pick one per project, never mix):

**Swiss Industrial Print (Light):**
- Background: `#F4F4F0` (unbleached paper)
- Foreground: `#050505` (carbon ink)
- Accent: `#E61919` (aviation red) — the ONLY accent
- Heavy sans-serif, visible grid lines, aggressive negative space

**Tactical Telemetry (Dark):**
- Background: `#0A0A0A` (deactivated CRT)
- Foreground: `#EAEAEA` (white phosphor)
- Terminal Green `#4AF626` optional for ONE element only
- Monospace dominance, simulated hardware limitations

**Typography Architecture:**
- Macro: `clamp(4rem, 10vw, 15rem)`, tracking `-0.03em` to `-0.06em`, line-height `0.85`
- Micro: `10px` to `14px`, tracking `0.05em` to `0.1em`
- Absolute rejection of `border-radius` — all corners 90 degrees

**Textural Effects:**
- Halftone and 1-bit dithering via CSS `mix-blend-mode: multiply`
- CRT scanlines via `repeating-linear-gradient`
- Mechanical noise via global SVG static filter

### 5.5 Minimalist Skill — Editorial/Notion-Style

**Lines:** 85 | **Install Name:** `minimalist-ui`

**Color Palette:**
- Canvas: `#FFFFFF` or `#F7F6F3` (warm bone)
- Surface: `#FFFFFF` or `#F9F9F8`
- Borders: `#EAEAEA` or `rgba(0,0,0,0.06)`
- Accent pastels (highly desaturated): Pale Red `#FDEBEC`, Pale Blue `#E1F3FE`, Pale Green `#EDF3EC`, Pale Yellow `#FBF3DB`

**Typography:**
- Primary Sans: `SF Pro Display`, `Geist Sans`, `Helvetica Neue`, `Switzer`
- Editorial Serif: `Lyon Text`, `Newsreader`, `Instrument Serif`
- Mono: `Geist Mono`, `SF Mono`, `JetBrains Mono`
- Body never absolute black — `#111111` or `#2F3437`

**Component Rules:**
- Cards: exactly `border: 1px solid #EAEAEA`, radius `8px`–`12px` max
- Buttons: solid `#111111`, radius `4px`–`6px`, no box-shadow
- Accordions: no container boxes, only `border-bottom: 1px solid #EAEAEA`

### 5.6 Output Skill — Anti-Truncation

**Lines:** 49 | **Install Name:** `full-output-enforcement`

The shortest but most operationally critical skill:

**Banned Output Patterns:**
- `// ...`, `// rest of code`, `// TODO`, `/* ... */`
- "Let me know if you want me to continue"
- "The rest follows the same pattern"
- Skeleton when full implementation was requested

**Token-Limit Handling:**
- Write at full quality to a clean breakpoint
- End with: `[PAUSED — X of Y complete. Send "continue" to resume from: next section name]`
- On "continue", pick up exactly where stopped — no recap, no repetition

### 5.7 Redesign Skill — Audit-First

**Lines:** 178 | **Install Name:** `redesign-existing-projects`

Three-phase approach:
1. **Scan** — Read codebase, identify framework, styling method, current patterns
2. **Diagnose** — Run through the audit (100+ checks across 8 categories)
3. **Fix** — Apply targeted upgrades working with existing stack

**Audit Categories:**
- Typography (8 checks)
- Color and Surfaces (11 checks)
- Layout (16 checks)
- Interactivity and States (12 checks)
- Content (11 checks)
- Component Patterns (10 checks)
- Iconography (5 checks)
- Code Quality (8 checks)
- Strategic Omissions (6 checks)

**Fix Priority Order:**
1. Font swap (biggest instant improvement, lowest risk)
2. Color palette cleanup
3. Hover and active states
4. Layout and spacing
5. Replace generic components
6. Add loading/empty/error states
7. Polish typography scale and spacing

### 5.8 Image-to-Code Skill — Visual Pipeline

**Lines:** 1,228 | **Install Name:** `image-to-code`

The most complex skill with 38 sections. Defines a mandatory three-phase workflow:

1. **Generate** design image(s) first
2. **Analyze** them deeply
3. **Implement** the frontend to match

**Configuration Dials (9 total):**

| Dial | Default | Purpose |
|---|---|---|
| DESIGN_VARIANCE | 8 | Layout experimentation level |
| VISUAL_DENSITY | 3 | Information density |
| ART_DIRECTION | 8 | Creative boldness |
| IMPLEMENTATION_CLARITY | 9 | How buildable the reference is |
| IMAGE_USAGE_PRIORITY | 9 | How image-led the design should be |
| SPACING_GENEROSITY | 9 | Breathing room |
| ANALYSIS_PRECISION | 10 | Depth of design extraction |
| IMAGE_GENERATION_EAGERNESS | 10 | Number of images to generate |
| UI_SIMPLICITY_DISCIPLINE | 9 | Aggressiveness of clutter reduction |

**Key Rules:**
- 1 section = 1 image (never compressed boards)
- Never crop old images — generate fresh standalone images
- Fresh re-generation rule: if unclear, regenerate preserving same visual language
- Anti-AI-Slop rules covering layout, visual, typography, content, and density slop
- Multi-image consistency: same brand world, type scale, spacing, CTA styling across all images

### 5.9 Stitch Skill — Google Stitch Integration

**Lines:** 184 (+ 121 DESIGN.md) | **Install Name:** `stitch-design-taste`

Generates `DESIGN.md` files as the single source of truth for Google Stitch's AI agent. The DESIGN.md format encodes:
1. Visual atmosphere
2. Color calibration with hex codes
3. Typographic architecture
4. Component behaviors with interaction states
5. Layout principles
6. Motion philosophy (spring physics specs)
7. Anti-patterns as explicit "NEVER DO" rules

**Configuration Table:**

| Dial | Default | Range |
|---|---|---|
| Creativity | 8 | 1 = Ultra-minimal → 10 = Bold editorial |
| Density | 4 | 1 = Gallery-airy → 10 = Cockpit-dense |
| Variance | 8 | 1 = Predictable → 10 = Artsy chaotic |
| Motion Intent | 6 | 1 = Static → 10 = Cinematic |

### 5.10 Image Generation Skills

**imagegen-frontend-web** (987 lines) and **imagegen-frontend-mobile** (1,465 lines) and **brandkit** (798 lines) share the same architectural pattern:
- Configuration dials for parametrization
- Hard output rules (one image per section)
- Anti-slop enforcement
- Composition variety requirements
- Consistency rules across multi-image sets

**brandkit** additionally defines:
- Reference style DNA (premium brand-guidelines deck aesthetics)
- Core principle: "A premium brand kit is not decoration — it is a visual argument for why the brand exists"
- Default output: 3×3 grid, 4:3 or 16:10 aspect ratio

---

## 6. Visual Design System (Documented Patterns)

The skills collectively document a comprehensive visual design vocabulary:

### Color Philosophy

**Universal Rules:**
- Never pure `#000000` — always off-black (`#0a0a0a`, `#121212`, `#18181B`)
- Maximum 1 accent color per project
- Saturation below 80%
- One gray family per project (warm OR cool, never mixed)
- "AI Purple/Blue Neon" is universally banned

**Palette Archetypes:**
| Aesthetic | Background | Surface | Text | Accent |
|---|---|---|---|---|
| Ethereal Glass | `#050505` | Vantablack cards | White | Emerald/Electric Blue |
| Editorial Luxury | `#FDFBF7` | Warm cream | Deep espresso | Sage/muted |
| Soft Structuralism | Silver-grey/White | `#FFFFFF` | `#111111` | Single pastel |
| Swiss Print | `#F4F4F0` | Off-white | `#050505` | Aviation Red `#E61919` |
| Tactical Terminal | `#0A0A0A` | Dark | `#EAEAEA` | Red `#E61919` + optional Green `#4AF626` |

### Shadow System

- **Diffusion Shadow:** `0 20px 40px -15px rgba(0,0,0,0.05)` — wide-spreading, barely visible
- **Tinted Shadows:** Match background hue (dark blue shadow on blue background)
- **Inner Refraction:** `shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]` for glassmorphism edge simulation
- **Banned:** Generic `shadow-md`, `rgba(0,0,0,0.3)`

### Glassmorphism Specification

The project documents a "Liquid Glass Web Approximation" (explicitly labeled as NOT official Apple Liquid Glass):
- `backdrop-filter: blur(24px) saturate(180%) contrast(1.05)`
- 1px inner border (`border-white/10`)
- Inner highlight shadow for edge refraction
- `prefers-reduced-transparency` fallback
- Dark mode variant with adjusted opacities

### Border & Radius System

- **Premium containers:** `rounded-[2rem]` to `rounded-[2.5rem]`
- **Minimalist:** `8px` to `12px` maximum
- **Brutalist:** Zero radius — all corners 90 degrees
- **Structural borders:** `1px solid #EAEAEA` or `rgba(0,0,0,0.06)`
- **Hairline borders:** `ring-1 ring-black/5` or `border border-white/10`

---

## 7. Animation System (Documented Patterns)

### Motion Philosophy

The skills define a comprehensive animation vocabulary:

**Physics Engine:**
- Spring-based exclusively: `stiffness: 100, damping: 20`
- No linear easing anywhere
- Custom cubic-bezier: `cubic-bezier(0.32, 0.72, 0, 1)` for CSS transitions

**Hardware Rules:**
- Animate ONLY `transform` and `opacity`
- Never `top`, `left`, `width`, `height`
- `will-change: transform` only on actively animating elements
- `backdrop-blur` only on fixed/sticky elements, never scrolling content

### Motion Intensity Levels

| Level | Behavior | Implementation |
|---|---|---|
| 1–3 (Static) | No automatic animations | CSS `:hover` and `:active` only |
| 4–7 (Fluid CSS) | Transitions with cascades | `transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1)` + `animation-delay` cascades |
| 8–10 (Cinematic) | Complex scroll choreography | GSAP ScrollTrigger, Framer Motion hooks |

### Scroll Animation Patterns

**Sticky Scroll Stack:** Cards stick to top and physically stack over each other during scroll
**Horizontal Scroll Hijack:** Vertical scroll translates to smooth horizontal gallery pan
**Zoom Parallax:** Central background image zooms in/out tied to scrollbar
**Scroll Progress Path:** SVG lines draw themselves as user scrolls
**Scrubbing Text Reveals:** Word opacity scrubs from 0.1 to 1.0 sequentially on scroll

### Component Animation Patterns

**Perpetual Micro-Interactions (5 archetypes):**
1. **Intelligent List** — Infinite auto-sorting loop with `layoutId` position swaps
2. **Command Input** — Multi-step typewriter effect with blinking cursor and shimmer loading
3. **Live Status** — "Breathing" indicators with overshoot spring notification badges
4. **Wide Data Stream** — Seamless horizontal infinite carousel
5. **Contextual UI** — Staggered text highlight + float-in floating toolbar

**Interaction Patterns:**
- Magnetic buttons pulling toward cursor (via `useMotionValue`, never `useState`)
- Parallax tilt cards tracking mouse coordinates
- Spotlight border cards illuminating under cursor
- Directional hover-aware buttons (fill enters from mouse entry side)
- Particle explosion buttons on success
- Skeleton shimmer (not circular spinners)

### Staggered Orchestration

- Parent/Children `staggerChildren` in Motion (same Client Component tree)
- CSS cascade: `animation-delay: calc(var(--index) * 100ms)`
- Lists/grids never mount instantly — waterfall reveals

### Reduced Motion

Mandatory for `MOTION_INTENSITY > 3`:
- `useReducedMotion()` hook in Motion
- `@media (prefers-reduced-motion: reduce)` CSS wrapper
- "Motion claimed = motion shown" rule: if intensity > 4, page must actually animate

---

## 8. Layout System

### Responsive Strategy

**Mobile-First Collapse (< 768px):**
- All multi-column layouts collapse to single column
- `width: 100%`, `padding: 1rem`, `gap: 1.5rem`
- Asymmetric layouts must "aggressively fall back"

**No Horizontal Scroll:**
- Wrap entire page in `<main className="overflow-x-hidden w-full max-w-full">`
- Horizontal overflow on mobile is a "critical failure"

**Touch Targets:**
- All interactive elements minimum `44px` tap target
- Buttons full-width on mobile

**Testing Viewports:**
- `375px` (iPhone SE)
- `390px` (iPhone 14)
- `768px` (iPad)
- `1024px` (small laptop)
- `1440px` (desktop)

### Container Structure

- `max-w-[1400px] mx-auto` or `max-w-7xl` for page containment
- Generous horizontal padding: `1rem` mobile, `2rem` tablet, `4rem` desktop
- Full-height: `min-h-[100dvh]` — NEVER `h-screen` (iOS Safari viewport bug)

### Grid System

- CSS Grid for all structural layouts
- `grid-flow-dense` mandatory on bento grids (no empty cells)
- Mathematical verification of `col-span` and `row-span` interlocking
- Never use flexbox percentage math (`calc(33% - 1rem)`)

### Spacing Philosophy

- Section padding: `py-24` to `py-48` (minimum `py-24`)
- "Double your standard padding" — let design breathe
- Vertical section gaps: `clamp(3rem, 8vw, 6rem)` on mobile
- Card internal padding: `p-8` to `p-10`
- "Art Gallery Mode" (Density 1–3): Massive whitespace, huge section gaps

### Typography Hierarchy

**Scale System:**
- Display: `clamp(2.25rem, 5vw, 3.75rem)` to `clamp(3rem, 5vw, 5.5rem)`
- Body: `1rem` / `1.125rem`
- Mono metadata: `0.8125rem`
- Eyebrow tags: `text-[10px]` uppercase with `tracking-[0.2em]`

**Font Pairing Rules:**
- Dashboard: Sans-Serif only (`Geist` + `Geist Mono`)
- Editorial: Sans + distinctive Serif (`Geist` + `Instrument Serif`)
- Creative: Sans + inline images in headlines

**Banned Fonts:** Inter, Roboto, Arial, Open Sans, Helvetica (for premium contexts)
**Banned Serifs:** Times New Roman, Georgia, Garamond, Palatino — use Fraunces, Gambarino, Editorial New, Instrument Serif only

---

## 9. Research Architecture

### LLM Laziness Research

The `research/` directory documents why AI models produce generic/incomplete outputs:

**Root Causes:**
1. **RLHF & Compute Economics** — Brevity bias from cost optimization. Models rewarded for short summaries over exhaustive analysis. Aggressive "stopping pressure" calibration.
2. **Training Data Bias** — Placeholder propagation from Stack Overflow/GitHub patterns. Models internalize `// TODO: implement here` as legitimate output.
3. **Cognitive Shortcuts** — Models reduce effort when tasks seem straightforward or context is too long. They retain information but choose not to process it fully.
4. **Output Limits** — Context window asymmetry (millions of input tokens vs. 8K output tokens). Consumer middleware caps history at ~32K tokens.

**Remediation Techniques:**
1. **Parameter Tuning** — Low temperature (0.0–0.5) for deterministic output. Top-p 0.0–0.6 to reduce entropy. Gemini `thinking_level: high` for complex tasks.
2. **Prompt Engineering** — Psychological stimulus framing (+45% quality from "$200 tip"). XML-structured prompts. Explicit syntax binding. Verification loops.
3. **Architectural Patterns** — Lazy-loaded skills (35% context reduction). MCP integration for real-time data. Chunked task execution.

**Empirical Findings:**
- No model fully satisfies both length requirements and sub-part instructions natively
- Truncation is deliberate behavioral choice, not decoding failure
- Models maintain context better than expected — context loss is NOT the primary cause
- Combined prompt stimuli can yield +115% overall performance improvement
- Seasonal variation confirmed: shorter outputs during December (holiday training data patterns)

---

## 10. Distribution & Configuration System

### Installation Architecture

```
Installation Methods:
├── npx skills add (Vercel Agent Skills standard)
│   └── Scans skills/ folder via YAML frontmatter
├── Copy SKILL.md into project
├── Paste into AI conversation
├── VS Code Claude Plugin (.claude-plugin/)
└── GitHub Copilot (.github/copilot-instructions.md)
```

### Plugin Manifest Structure

**plugin.json:**
```json
{
  "name": "taste-skill",
  "description": "...",
  "version": "1.0.0",
  "author": { "name": "leonxlnx" },
  "license": "MIT",
  "keywords": ["skills", "frontend", "design", "taste", "ui"]
}
```

**marketplace.json:**
```json
{
  "name": "taste-skill",
  "plugins": [{
    "name": "taste-skill",
    "version": "1.0.0",
    "source": "./"
  }]
}
```

### Local Skill Registry (skill.sh)

Bash associative array mapping skill names to file paths:
```bash
declare -A SKILLS=(
  [taste-skill]="skills/taste-skill/SKILL.md"
  [redesign-skill]="skills/redesign-skill/SKILL.md"
  # ... 13 total skills
)
```

### Copilot Integration

`.github/copilot-instructions.md` provides 5 anti-slop rules that GitHub Copilot reads automatically:
1. No Generic UI
2. Premium Whitespace
3. Cinematic Motion (spring physics)
4. Complete Implementation (no placeholders)
5. Contextual Awareness (read SKILL.md files)

---

## 11. Build Scripts & Asset Pipeline

### Image Processing Pipeline

All scripts use **Node.js ESM** with **Sharp** for high-performance image operations:

**WebP Conversion (`convert-readme-assets-webp.mjs`):**
1. Reads PNG files from `assets/` directory
2. Optionally resizes to `maxWidth`
3. For sponsor badges: BFS flood-fill background removal → bounds detection → extract → resize → WebP export
4. WebP quality: 92–94, effort: 6, alpha quality: 100

**Background Removal Algorithm:**
```
1. Initialize visited array (width × height)
2. Seed queue with all border pixels
3. BFS: for each pixel, check if it matches background color
   - Dark pixels (R/G/B ≤ 22) with low alpha (< 8) → mark transparent
   - Spread to 4-connected neighbors
4. After flood-fill, compute tight bounding box of remaining opaque pixels
5. Extract bounds with 2px padding
6. Resize and export
```

**Sponsor Row Compositing (`build-emil-sponsor-row.mjs`):**
1. Resize logo to 62×62
2. Resize badge to 126px height
3. Composite: logo left-aligned, vertically centered; badge right of logo with 20px gap
4. Export as WebP with transparency preservation

---

## 12. Performance Techniques (Documented in Skills)

### Rendering Optimization

- **GPU-Safe Animation:** Only `transform` and `opacity` — never layout-triggering properties
- **Will-change discipline:** Apply only to actively animating elements, remove after
- **Backdrop-filter constraints:** Only on fixed/sticky elements, never scrolling content
- **Grain/noise overlays:** `position: fixed; pointer-events: none` pseudo-elements only
- **Z-index discipline:** Reserved for navbar, modals, overlays, tooltips — no arbitrary values

### React Performance

- Isolate CPU-heavy animations in microscopic Client Components (`React.memo`)
- Never trigger parent re-renders from perpetual motion
- Use `useMotionValue` / `useTransform` instead of `useState` for continuous values
- Wrap dynamic lists in `<AnimatePresence>`
- Server Components render static layouts only
- Client Components contain interactivity exclusively

### Context Optimization

- Lazy-loaded skill architecture: YAML frontmatter (~100 tokens) loaded first, full body on-demand
- 35% average context usage reduction documented
- Specific descriptions achieve ~90% discovery success vs. ~68% for vague ones

---

## 13. SEO & Accessibility Strategy

### Accessibility Rules (Documented)

- **WCAG AA contrast** on all CTAs — no white-on-white
- **Focus rings** in accent color, `2px` offset — "accessibility requirement, not optional"
- **Skip-to-content link** — hidden but essential for keyboard users
- **Alt text** on all meaningful images
- **Semantic HTML:** `<nav>`, `<main>`, `<article>`, `<aside>`, `<section>`
- **Minimum touch targets:** 44px
- **Reduced motion:** `prefers-reduced-motion: reduce` support mandatory
- **Reduced transparency:** `prefers-reduced-transparency` fallback for glassmorphism
- **Keyboard navigation:** All interactive states accessible without mouse

### SEO Strategy (Documented)

- Proper `<title>`, `description`, `og:image`, social sharing meta tags
- Favicon required
- Semantic HTML for crawler parsing
- No dead links (buttons linking to `#`)
- Current page indication in navigation

---

## 14. Design Patterns & Reusable Architecture

### The Skill Pattern (Most Important Pattern)

The core innovation is the **SKILL.md pattern** — a portable, structured instruction file:

```
SKILL.md Architecture:
┌─ YAML Frontmatter (discovery layer)
│  ├─ name: install-id
│  └─ description: precise one-liner
├─ Configuration (numeric dials)
├─ Inference Protocol (brief reading)
├─ Design System Map (decision tree)
├─ Stack Conventions (framework rules)
├─ Design Engineering Directives (bias corrections)
├─ Creative Arsenal (pattern vocabulary)
├─ Anti-Patterns (hard bans)
├─ Performance Guardrails
├─ Pre-Flight Checklist (verification gate)
└─ Appendices (reference material, install commands, canonical links)
```

### The Dial System Pattern

Three numeric parameters that drive all downstream decisions:
- Dials are set by inference from the brief
- Use-case presets map signals to dial values
- All rules reference dial values as gate conditions
- Users can override conversationally

### The Anti-Pattern Catalog Pattern

Explicit enumeration of banned behaviors organized by category:
- Each ban is concrete and specific (not abstract principles)
- Banned patterns include the exact thing to do instead
- Cross-referenced across skills for consistency

### The Pre-Flight Checklist Pattern

Verification gate before any output:
- Every checkbox must be honestly ticked
- If any box fails, the page is not done
- Covers: layout, motion, accessibility, performance, content, consistency

### The Brief Inference Pattern

Structured analysis before execution:
1. Read signals (page kind, vibe, audience, constraints)
2. Declare design read in one line
3. Ask at most one clarifying question
4. Map to dial values
5. Select design system foundation
6. Proceed with execution

---

## 15. Best Practices Used

1. **Separation of Concerns** — Each skill does one job; skills are composable, not monolithic
2. **Progressive Disclosure** — YAML frontmatter for discovery, full body on-demand
3. **Evidence-Based Design** — Research backs every rule with documented studies
4. **Version Pinning** — v1 preserved alongside v2; no breaking changes to install names
5. **Framework Agnosticism** — Rules target design intent, not framework APIs
6. **Semantic Versioning** — Clear CHANGELOG with rationale for every change
7. **Multiple Distribution Channels** — CLI, copy-paste, plugin manifests, Copilot instructions
8. **Machine-Readable Discovery** — `llms.txt`, YAML frontmatter, structured descriptions
9. **Canonical Code Skeletons** — Reference implementations for complex patterns (GSAP, bento grids)
10. **Hard Rules Over Soft Guidelines** — "BANNED" is used deliberately; rules are enforceable, not aspirational
11. **Anti-Default Discipline** — Explicitly naming and blocking the LLM's statistical biases
12. **Context Economy** — Lazy loading, specific descriptions, modular skills to minimize context consumption
13. **Cross-Platform Consistency** — Same rules enforced whether the agent is Copilot, Cursor, Claude Code, or Codex

---

## 16. Recommended Improvements

1. **Automated Testing** — No test suite exists to validate that skills produce correct output. A test harness that feeds briefs to agents and checks pre-flight checklist compliance would strengthen quality claims.

2. **Skill Interaction Documentation** — When multiple skills are installed simultaneously, interaction effects are undefined. Document priority ordering or conflict resolution.

3. **Telemetry & Analytics** — No data on which rules are most/least violated in practice. Adding optional anonymized violation tracking would inform iteration.

4. **Expanded Research** — The research directory currently covers only "laziness." Expand to cover: color perception biases, typography readability studies, motion sickness research, cross-cultural design preferences.

5. **Versioned Skill API** — Formalize the SKILL.md schema with a JSON Schema or similar validation. Currently the format is implicit.

6. **Community Skill Registry** — Enable third-party skills to be discoverable via the same `npx skills add` pipeline. Currently the CLI scans only the taste-skill repo.

7. **Interactive Dial Playground** — A web UI where users can adjust the three dials and see real-time preview of how output changes, lowering the barrier to understanding.

8. **Migration Guide** — For users upgrading from v1 to v2, a detailed diff document showing exactly what changed and how to adapt existing workflows.

9. **Localization** — All skills are English-only. Multi-language skill variants would expand reach.

10. **Performance Benchmarking** — Document Core Web Vitals for sites built with taste-skill skills. The pre-flight checklist claims LCP < 2.5s but provides no measurement data.

---

## 17. How to Build a Similar System

### Step-by-Step Implementation Guide

#### Phase 1: Research & Define Your Domain

1. **Identify the problem** — What generic patterns does your AI produce? Document them specifically.
2. **Study the root causes** — Why does the AI default to these patterns? (Training data bias, RLHF, compute economics)
3. **Define your design philosophy** — What principles should override the defaults?

#### Phase 2: Design the Skill Schema

1. **Define YAML frontmatter** — `name` and `description` fields for discovery
2. **Design your configuration system** — Numeric dials, categorical choices, or named presets
3. **Plan the inference layer** — How should the AI read the brief before executing?
4. **Structure the rule hierarchy:**
   - Configuration (parametric)
   - Inference (context-reading)
   - Hard rules (non-negotiable)
   - Implementation patterns (canonical code)
   - Anti-patterns (banned behaviors)
   - Verification (pre-flight checklist)

#### Phase 3: Write the First Skill

1. **Start with anti-patterns** — List every generic thing your AI does wrong. Be specific.
2. **Define the replacement patterns** — For each ban, specify what to do instead.
3. **Add configuration dials** — 2–4 numeric parameters that control output variance.
4. **Write canonical code examples** — Not full implementations, but skeleton patterns the AI can follow.
5. **Create the pre-flight checklist** — 15–25 verification items covering all rule categories.

#### Phase 4: Build Supporting Infrastructure

1. **Create a README** — Installation instructions, skill descriptions, examples
2. **Add a CHANGELOG** — Track every change with rationale
3. **Write build scripts** — Asset processing, image optimization, WebP conversion
4. **Set up distribution:**
   - `npx skills add` compatibility (YAML frontmatter in `skills/` folder)
   - Copilot instructions (`.github/copilot-instructions.md`)
   - Plugin manifests (`.claude-plugin/plugin.json` and `marketplace.json`)
5. **Add machine-readable index** — `llms.txt` listing all skills with descriptions

#### Phase 5: Create Specialized Variants

1. **Identify use-case clusters** — Where does the general skill need specialization?
2. **Create focused skills** — Each variant should be self-contained with no cross-references
3. **Define interaction rules** — Which skills can be combined? Which conflict?
4. **Version pinning** — Preserve old versions when iterating

#### Phase 6: Document the Research

1. **Root cause analysis** — Why does the AI produce generic output?
2. **Remediation techniques** — What works to override the defaults?
3. **Empirical evidence** — Controlled experiments, measurement data
4. **Reference prompts** — Ready-to-use templates

#### Phase 7: Iterate Based on Feedback

1. **Track violations** — Which rules are most commonly broken?
2. **Harden enforcement** — Convert soft guidelines to hard bans where needed
3. **Add canonical code skeletons** — For patterns the AI consistently implements wrong
4. **Expand the pre-flight checklist** — Add items for newly discovered failure modes

### Key Architectural Decisions to Make

| Decision | Options | Taste Skill's Choice |
|---|---|---|
| Skill format | JSON / YAML / Markdown | Markdown with YAML frontmatter |
| Configuration | Fixed rules / parametric dials | Parametric dials (1-10 scale) |
| Discovery | Full load / lazy load | Lazy load (frontmatter first, body on-demand) |
| Specialization | One mega-skill / modular variants | Modular variants (13 skills) |
| Distribution | Single channel / multi-channel | Multi-channel (CLI, copy, plugin, Copilot) |
| Versioning | Always latest / pin versions | Pin + preserve old versions |
| Enforcement | Guidelines / hard bans | Hard bans with explicit "BANNED" language |

### Essential Patterns to Implement

1. **Brief Inference** — Always read before executing
2. **Anti-Default Discipline** — Name and block specific biases
3. **Numeric Configuration** — Dials that parametrize all downstream decisions
4. **Pre-Flight Verification** — Checklist gate before output
5. **Canonical Code Skeletons** — Reference implementations for complex patterns
6. **Lazy-Loaded Discovery** — Lightweight metadata first, heavy body on-demand
7. **Research-Backed Rules** — Every constraint should have evidence behind it
8. **Multi-Channel Distribution** — Meet users where they already work

---

## 18. Summary

Taste Skill is not a frontend library, framework, or component collection. It is a **meta-design system** — a system for instructing AI systems about how to design. Its core innovations are:

1. **The SKILL.md format** — A portable, structured instruction file that AI agents can discover, load, and follow
2. **The dial system** — Parametric configuration that allows one skill to produce a wide range of outputs
3. **The brief inference protocol** — Forcing the AI to read context before executing
4. **The anti-pattern catalog** — Explicit enumeration of banned patterns with specific replacements
5. **The pre-flight checklist** — A verification gate that must pass before delivery
6. **The research foundation** — Academic evidence backing every rule

The project's success (66.3k GitHub stars, 4.6k forks) demonstrates that structured prompt engineering can systematically improve AI-generated design output. The architecture is replicable for any domain where AI produces generic, statistically-biased output — not just frontend design, but writing, data visualization, product design, or any creative domain with recognizable "AI tells."
