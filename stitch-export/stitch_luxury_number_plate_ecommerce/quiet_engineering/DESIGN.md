---
name: Quiet Engineering
colors:
  surface: '#131314'
  surface-dim: '#131314'
  surface-bright: '#39393a'
  surface-container-lowest: '#0e0e0f'
  surface-container-low: '#1c1b1c'
  surface-container: '#201f20'
  surface-container-high: '#2a2a2b'
  surface-container-highest: '#353436'
  on-surface: '#e5e2e3'
  on-surface-variant: '#c5c7c1'
  inverse-surface: '#e5e2e3'
  inverse-on-surface: '#313031'
  outline: '#8f918c'
  outline-variant: '#454843'
  surface-tint: '#c7c6c3'
  primary: '#ffffff'
  on-primary: '#30312e'
  primary-container: '#e3e2df'
  on-primary-container: '#646562'
  inverse-primary: '#5e5f5c'
  secondary: '#c9c6be'
  on-secondary: '#31302b'
  secondary-container: '#4a4943'
  on-secondary-container: '#bbb8b0'
  tertiary: '#ffffff'
  on-tertiary: '#32302b'
  tertiary-container: '#e6e2da'
  on-tertiary-container: '#66645e'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e3e2df'
  primary-fixed-dim: '#c7c6c3'
  on-primary-fixed: '#1b1c1a'
  on-primary-fixed-variant: '#464744'
  secondary-fixed: '#e6e2da'
  secondary-fixed-dim: '#c9c6be'
  on-secondary-fixed: '#1c1c17'
  on-secondary-fixed-variant: '#484741'
  tertiary-fixed: '#e6e2da'
  tertiary-fixed-dim: '#cac6be'
  on-tertiary-fixed: '#1d1c17'
  on-tertiary-fixed-variant: '#484741'
  background: '#131314'
  on-background: '#e5e2e3'
  surface-variant: '#353436'
typography:
  display:
    fontFamily: Newsreader
    fontSize: 56px
    fontWeight: '400'
    lineHeight: 64px
    letterSpacing: -0.02em
  display-mobile:
    fontFamily: Newsreader
    fontSize: 36px
    fontWeight: '400'
    lineHeight: 44px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Newsreader
    fontSize: 40px
    fontWeight: '400'
    lineHeight: 48px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Newsreader
    fontSize: 28px
    fontWeight: '400'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '400'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 26px
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: '0'
  body-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: 0.005em
  label-md:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.06em
  label-sm:
    fontFamily: Geist
    fontSize: 10px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.1em
spacing:
  gutter: 1.5rem
  margin: 2.5rem
  space-xs: 0.375rem
  space-sm: 0.75rem
  space-md: 1.25rem
  space-lg: 2.25rem
  space-xl: 4rem
---

## Brand & Style
The design system embodies quiet luxury, high-end bespoke automotive engineering, and industrial purism. It strips away digital ornamentation, neon halos, pseudo-futuristic HUD graphics, and technical clutter. In their place, it establishes an aura of composure, architectural restraint, and precision mechanical craft.

The aesthetic evokes the tactile precision of milled aluminum knurling, an unblemished Leica chassis, and the silent authority of bespoke British automotive coachbuilding. Every element exists with absolute intention; negative space functions as a structural material rather than empty canvas. Interactions feel weighted, deliberate, and effortless.

## Colors
The palette is built on deep graphite and anodized charcoal foundations, calibrated to eliminate harsh pure black while maintaining profound contrast. Tonal depth relies on warm stone undertones rather than cold synthetic blues.

- **Primary (`#F4F3EF`)**: Unbleached bone / milled porcelain. Used for primary typography, vital states, and hero statements.
- **Secondary (`#B8B5AD`)**: Warm stone silver. Used for secondary labels, quiet iconography, and refined structural markers.
- **Tertiary (`#5A5852`)**: Anodized titanium gray. Reserved for inactive controls, subtle indicators, and architectural hairline divisions.
- **Neutral (`#111112`)**: Deep charcoal obsidian. Provides an authentic matte surface ground that absorbs light without coldness.

Surface layering uses micro-shifts in luminance (e.g., `#161618` for elevated panels and `#1C1C1F` for active modules), strictly avoiding saturated fills or high-glow indicators.

## Typography
Typography is an intentional juxtaposition of classical British editorial heritage and razor-sharp Swiss industrial functionalism. 

- **Display & Large Headlines (Newsreader)**: Delivers warmth, architectural stature, and coachbuilding tradition. Used sparingly for key titles, configuration summaries, and poetic luxury touchpoints. Set primarily at normal weight with generous breathing space.
- **Body, Specs, and Interface Elements (Geist)**: Provides clinical clarity, legibility, and technical precision. Neutral and non-intrusive.
- **Micro Labels & Metadata**: Always set uppercase with tracked letterspacing (`0.06em` to `0.1em`) to mimic stamped chassis plates and vintage mechanical dials.

## Layout & Spacing
The layout follows a disciplined 12-column architectural grid on desktop, scaling to 6 columns on tablet and 4 columns on mobile. 

Whitespace is applied with deliberate extravagance. Generous margins isolate individual controls, giving components the prestige of museum artifacts. Panels and components do not touch or compress against screen edges.

### Breakpoint Disciplines
- **Desktop (1280px+)**: Outer margin of `4rem` (`space-xl`), gutters of `1.5rem`. Asymmetrical, expansive layouts with off-center focal imagery and long structural lines.
- **Tablet (768px – 1279px)**: Outer margin of `2.5rem` (`margin`), gutters of `1.25rem` (`space-md`). Multi-column controls consolidate into structured 2-column modules.
- **Mobile (< 768px)**: Outer margin of `1.5rem`, gutters of `1rem`. Vertical stacking preserves generous vertical breathing room (`space-lg` minimum between functional groups).

## Elevation & Depth
Elevation is achieved exclusively through tonal separation and hairline division. Artificial drop shadows, diffused colored glows, and skeuomorphic bevels are banned.

- **Surface Tiers**: Base surfaces sit at `#111112`. Secondary modular bays lift subtly to `#171719`. Floating dialogs or modal panels reside at `#1E1E22`.
- **Whisper Hairlines**: Structural boundaries and containment lines use 1px solid borders at 12% to 18% opacity of the warm stone spectrum (`rgba(244, 243, 239, 0.12)`). Borders define edges cleanly without shouting.
- **Glass Transparency**: Backdrops on persistent floating navigators employ subdued frosted glass: `rgba(17, 17, 18, 0.72)` paired with a `24px` backdrop blur and an ultra-fine top hairline edge to emulate a crystal instrument glass.

## Shapes
Geometry is strictly sharp and monolithic (`roundedness: 0`). Elements honor the physical reality of machined metal blocks, precision-cut slate, and Vitsoe-like architectural joinery.

- **Corners**: Radii are set to `0px` across all containers, inputs, buttons, cards, and modal windows.
- **Dividers & Separators**: Absolute 1px lines without gradients, feathering, or drop shadows.
- **Form Cohesion**: The zero-radius design system brings immediate discipline, removing the casual playfulness of consumer apps and instilling an authoritative mechanical cadence.

## Components

### Buttons
- **Primary**: Solid bone background (`#F4F3EF`) with deep charcoal text (`#111112`). Sharp 0px corners, generous horizontal padding (`2rem`), compact height (`44px` to `48px`). On hover, soft shift to warm stone (`#E2DFD6`).
- **Secondary (Hairline)**: Transparent background with a 1px border of `#5A5852` and primary text (`#F4F3EF`). On hover, the border shifts to `#B8B5AD` with zero scale bounce.
- **Tertiary (Ghost)**: Text-only with uppercase tracked styling and an ultra-fine 1px underline resting 6px below the baseline.

### Input Fields
- Understated rectangular containers or minimalist bottom-ruled lines.
- Base background: `#161618` with a 1px border of `rgba(244, 243, 239, 0.12)`.
- Focused state: Border transitions to `#B8B5AD` with no outer glow.
- Labels: Small uppercase tracked labels (`label-sm`) fixed permanently above the input field for calm legibility.

### Cards & Modules
- Sharp, monolithic structural blocks with background fill `#161618` and a 1px border `rgba(244, 243, 239, 0.08)`.
- Ample inner padding (`space-lg`). Content inside cards must never feel packed; technical values are paired cleanly with editorial titles.

### Lists & Tables
- Border-bottom separated data rows using 1px hairline dividers.
- Hover state: Row background subtly tints to `#1A1A1D`.
- Data typography: Monospaced numerical values set against clean Geist labels to provide a mechanical caliper feel.

### Checkboxes, Radios, and Toggles
- **Checkboxes**: Crisp 16x16px sharp squares with a 1px hairline border. Active state features a solid `#F4F3EF` center square fill inset by 3px.
- **Radios**: Geometric nested squares rather than circles to maintain architectural coherence.
- **Switches**: Linear precision sliders with flat rectangular pips, evoking tactile milled aircraft switches.

### Technical Telemetry & Badges
- Replaced by understated status points: a 6px solid un-blurred square dot paired with an uppercase muted stone label.
- No saturated reds or greens; alerts utilize amber bone and subdued graphite indicators.