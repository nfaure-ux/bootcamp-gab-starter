# Design System Inspired by Lovable

## 1. Visual Theme & Atmosphere

Lovable's website radiates warmth through restraint. The entire page sits on a creamy, parchment-toned background (`#f7f4ed`) that immediately separates it from the cold-white conventions of most developer tool sites. This isn't minimalism for minimalism's sake — it's a deliberate choice to feel approachable, almost analog, like a well-crafted notebook. The near-black text (`#1c1c1c`) against this warm cream creates a contrast ratio that's easy on the eyes while maintaining sharp readability.

The custom Camera Plain Variable typeface is the system's secret weapon. Unlike geometric sans-serifs that signal "tech company," Camera Plain has a humanist warmth — slightly rounded terminals, organic curves, and a comfortable reading rhythm. At display sizes (48px–60px), weight 600 with aggressive negative letter-spacing (-0.9px to -1.5px) compresses headlines into confident, editorial statements. The font uses `ui-sans-serif, system-ui` fallbacks, acknowledging that the custom typeface carries the brand personality.

What makes Lovable's visual system distinctive is its opacity-driven depth model. Rather than using a traditional gray scale, the system modulates `#1c1c1c` at varying opacities (0.03, 0.04, 0.4, 0.82–0.83) to create a unified tonal range. Every shade of gray on the page is technically the same hue — just more or less transparent. This creates a visual coherence that's nearly impossible to achieve with arbitrary hex values. The border system follows suit: `1px solid #eceae4` for light divisions and `1px solid rgba(28, 28, 28, 0.4)` for stronger interactive boundaries.

**Key Characteristics:**
- Warm parchment background (`#f7f4ed`) — not white, not beige, a deliberate cream that feels hand-selected
- Camera Plain Variable typeface with humanist warmth and editorial letter-spacing at display sizes
- Opacity-driven color system: all grays derived from `#1c1c1c` at varying transparency levels
- Inset shadow technique on buttons: `rgba(255,255,255,0.2) 0px 0.5px 0px 0px inset, rgba(0,0,0,0.2) 0px 0px 0px 0.5px inset`
- Warm neutral border palette: `#eceae4` for subtle, `rgba(28,28,28,0.4)` for interactive elements
- Full-pill radius (`9999px`) used extensively for action buttons and icon containers
- Focus state uses `rgba(0,0,0,0.1) 0px 4px 12px` shadow for soft, warm emphasis
- shadcn/ui + Radix UI component primitives with Tailwind CSS utility styling

## 2. Color Palette & Roles

### Primary
- **Cream** (`#f7f4ed`): Page background, card surfaces, button surfaces. The foundation — warm, paper-like, human.
- **Charcoal** (`#1c1c1c`): Primary text, headings, dark button backgrounds. Not pure black — organic warmth.
- **Off-White** (`#fcfbf8`): Button text on dark backgrounds, subtle highlight. Barely distinguishable from pure white.

### Neutral Scale (Opacity-Based)
- **Charcoal 100%** (`#1c1c1c`): Primary text, headings, dark surfaces.
- **Charcoal 83%** (`rgba(28,28,28,0.83)`): Strong secondary text.
- **Charcoal 82%** (`rgba(28,28,28,0.82)`): Body copy.
- **Muted Gray** (`#5f5f5d`): Secondary text, descriptions, captions.
- **Charcoal 40%** (`rgba(28,28,28,0.4)`): Interactive borders, button outlines.
- **Charcoal 4%** (`rgba(28,28,28,0.04)`): Subtle hover backgrounds, micro-tints.
- **Charcoal 3%** (`rgba(28,28,28,0.03)`): Barely-visible overlays, background depth.

### Surface & Border
- **Light Cream** (`#eceae4`): Card borders, dividers, image outlines. The warm divider line.
- **Cream Surface** (`#f7f4ed`): Card backgrounds, section fills — same as page background for seamless integration.

### Interactive
- **Ring Blue** (`#3b82f6` at 50% opacity): `--tw-ring-color`, Tailwind focus ring.
- **Focus Shadow** (`rgba(0,0,0,0.1) 0px 4px 12px`): Focus and active state shadow — soft, warm, diffused.

### Inset Shadows
- **Button Inset** (`rgba(255,255,255,0.2) 0px 0.5px 0px 0px inset, rgba(0,0,0,0.2) 0px 0px 0px 0.5px inset, rgba(0,0,0,0.05) 0px 1px 2px 0px`): The signature multi-layer inset shadow on dark buttons.

## 3. Typography Rules

### Font Family
- **Primary**: `Camera Plain Variable`, with fallbacks: `ui-sans-serif, system-ui`
- **Weight range**: 400 (body/reading), 480 (special display), 600 (headings/emphasis)
- **Feature**: Variable font with continuous weight axis — allows fine-tuned intermediary weights like 480.

### Hierarchy

| Role | Size | Weight | Line Height | Letter Spacing |
|------|------|--------|-------------|----------------|
| Display Hero | 60px | 600 | 1.00–1.10 | -1.5px |
| Display Alt | 60px | 480 | 1.00 | normal |
| Section Heading | 48px | 600 | 1.00 | -1.2px |
| Sub-heading | 36px | 600 | 1.10 | -0.9px |
| Card Title | 20px | 400 | 1.25 | normal |
| Large | 18px | 400 | 1.38 | normal |
| Body | 16px | 400 | 1.50 | normal |
| Button | 16px | 400 | 1.50 | normal |
| Button Small | 14px | 400 | 1.50 | normal |
| Caption | 14px | 400 | 1.50 | normal |

## 4. Component Stylings

### Buttons

**Primary Dark (Inset Shadow)**
- Background: `#1c1c1c`
- Text: `#fcfbf8`
- Padding: 8px 16px
- Radius: 6px
- Shadow: multi-layer inset signature

**Ghost / Outline**
- Background: transparent
- Text: `#1c1c1c`
- Border: `1px solid rgba(28,28,28,0.4)`
- Radius: 6px

**Cream Surface**
- Background: `#f7f4ed`
- Text: `#1c1c1c`
- Radius: 6px

**Pill / Icon Button**
- Background: `#f7f4ed`
- Radius: 9999px

### Cards & Containers
- Background: `#f7f4ed`
- Border: `1px solid #eceae4`
- Radius: 12px (standard), 16px (featured), 8px (compact)

### Inputs & Forms
- Background: `#f7f4ed`
- Border: `1px solid #eceae4`
- Radius: 6px
- Focus: ring blue outline

## 5. Layout Principles

### Spacing System
- Base unit: 8px
- Scale: 8, 10, 12, 16, 24, 32, 40, 56, 80, 96, 128, 176, 192, 208px

### Border Radius Scale
- Micro: 4px
- Standard: 6px (buttons, inputs)
- Comfortable: 8px (compact cards)
- Card: 12px (standard cards)
- Container: 16px (large containers)
- Full Pill: 9999px (action pills)

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (0) | No shadow | Page surface |
| Bordered (1) | `1px solid #eceae4` | Cards, images |
| Inset (2) | Multi-layer inset shadow | Dark buttons |
| Focus (3) | `rgba(0,0,0,0.1) 0px 4px 12px` | Active/focus states |

## 7. Do's and Don'ts

### Do
- Use cream (`#f7f4ed`) as the page foundation
- Use Camera Plain Variable at display sizes with negative letter-spacing
- Derive all grays from `#1c1c1c` at varying opacity levels
- Use `#eceae4` borders instead of shadows for card containment
- Keep weight narrow: 400 for body/UI, 600 for headings

### Don't
- Don't use pure white (`#ffffff`) as background
- Don't use heavy box-shadows for cards
- Don't introduce saturated accent colors
- Don't use weight 700 — 600 is the maximum
- Don't apply 9999px radius on rectangular buttons
