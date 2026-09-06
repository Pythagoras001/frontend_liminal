---
name: Liminal Archive
colors:
  surface: "#121317"
  surface-dim: "#121317"
  surface-bright: "#38393e"
  surface-container-lowest: "#0d0e12"
  surface-container-low: "#1a1b20"
  surface-container: "#1f1f24"
  surface-container-high: "#292a2e"
  surface-container-highest: "#343439"
  on-surface: "#e3e2e8"
  on-surface-variant: "#d5c4ab"
  inverse-surface: "#e3e2e8"
  inverse-on-surface: "#2f3035"
  outline: "#9e8f78"
  outline-variant: "#514532"
  surface-tint: "#ffba20"
  primary: "#ffdca1"
  on-primary: "#412d00"
  primary-container: "#ffb800"
  on-primary-container: "#6b4c00"
  inverse-primary: "#7c5800"
  secondary: "#b9c8de"
  on-secondary: "#233143"
  secondary-container: "#39485a"
  on-secondary-container: "#a7b6cc"
  tertiary: "#dde0ec"
  on-tertiary: "#2c3039"
  tertiary-container: "#c1c4d0"
  on-tertiary-container: "#4d515b"
  error: "#ffb4ab"
  on-error: "#690005"
  error-container: "#93000a"
  on-error-container: "#ffdad6"
  primary-fixed: "#ffdea8"
  primary-fixed-dim: "#ffba20"
  on-primary-fixed: "#271900"
  on-primary-fixed-variant: "#5e4200"
  secondary-fixed: "#d4e4fa"
  secondary-fixed-dim: "#b9c8de"
  on-secondary-fixed: "#0d1c2d"
  on-secondary-fixed-variant: "#39485a"
  tertiary-fixed: "#dfe2ee"
  tertiary-fixed-dim: "#c3c6d2"
  on-tertiary-fixed: "#181c24"
  on-tertiary-fixed-variant: "#434750"
  background: "#121317"
  on-background: "#e3e2e8"
  surface-variant: "#343439"
typography:
  display-hero-num:
    fontFamily: Space Grotesk
    fontSize: 72px
    fontWeight: "200"
    lineHeight: 72px
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 40px
    fontWeight: "700"
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: "700"
    lineHeight: 32px
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: "600"
    lineHeight: 28px
  headline-card:
    fontFamily: Space Grotesk
    fontSize: 16px
    fontWeight: "500"
    lineHeight: 20px
  body-lg:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: "400"
    lineHeight: 24px
  body-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: "400"
    lineHeight: 20px
  label-code:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: "500"
    lineHeight: 16px
    letterSpacing: 0.12em
  label-badge:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: "600"
    lineHeight: 14px
    letterSpacing: 0.08em
  label-meta:
    fontFamily: Geist
    fontSize: 13px
    fontWeight: "400"
    lineHeight: 16px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter-xs: 0.25rem
  gutter-sm: 0.5rem
  gutter-md: 1rem
  gutter-lg: 1.5rem
  gutter-xl: 2.5rem
  margin-mobile: 1.25rem
  margin-desktop: 3rem
---

## Brand & Style

This design system embodies an atmospheric, classified exploration archive aesthetic inspired by liminal spaces, tactical sci-fi terminals, and industrial mystery. The visual tone is cinematic, austere, and utilitarian.

Targeted at researchers, narrative enthusiasts, and tactical UI audiences, the interface evokes calculated tension and discovery. The visual style merges high-contrast minimalism with dark tactile glassmorphism: deep charcoal surfaces, glowing industrial amber accents, monospaced metadata, and ultra-crisp hairline borders.

## Colors

The palette relies on absolute dark tones layered over mist and raw textures, punctuated by high-visibility hazard amber:

- **Primary (`#FFB800` / `#F59E0B`):** High-alert industrial amber reserved for focal CTAs, cursor states, and key navigational points.
- **Secondary (`#94A3B8` / `#CBD5E1`):** Technical silver/slate for secondary data, telemetry labels, and icons.
- \*\*Tertiary (`#2A2E37` / `rgba(255,255,255,0.08)`): Hairline dividers, subtle framing borders, and card hulls.
- **Neutral (`#0B0C10` / `#121418`):** Deep charcoal canvas acting as the spatial void.
- **Functional States:** Transparent pill badges utilizing muted slate outlines for status indicators ('SEGURO', 'ESTABLE', 'ACTIVO').

## Typography

Typography establishes an institutional archive hierarchy. Large, thin-stroke numerals pair alongside heavyweight geometric sans-serif headlines. Technical telemetry, coordinates, and classification markers use uppercase monospaced text with generous tracking (`0.08em` to `0.12em`) to emulate classified terminal readouts.

## Layout & Spacing

The layout is built upon an asymmetric fluid canvas engineered for cinematic widescreen viewports:

- **Desktop Layout:** Horizontal split layout. The left viewport anchors fixed archival telemetry and primary level metadata; the right hosts a horizontal peek card carousel (`min-width: 200px` per card).
- **Grid & Gutters:** Base 8px grid system. Desktop horizontal padding is fixed at `3rem`, dropping to `1.25rem` on mobile breakpoints (<768px).
- **Responsive Stacking:** On mobile devices, the telemetry shifts to vertical stacking above a full-width card swipe area.

## Elevation & Depth

Visual hierarchy uses physical atmosphere rather than traditional drop shadows:

- **Surface Layering:** Deep black canvas overlaid with soft vignette and cinematic backdrop photography.
- **Glassmorphic Tiers:** Panels and cards utilize 8% to 15% opacity white/charcoal fills with `backdrop-filter: blur(16px)`.
- **Structural Outlines:** Depth is articulated via 1px crisp borders (`rgba(255, 255, 255, 0.08)` to `rgba(255, 255, 255, 0.18)`), eliminating heavy drop shadows in favor of radar-like precision.

## Shapes

The design balances curved ergonomics with tactical rigor:

- **Interactive Controls & Tags:** Fully rounded pill borders (`border-radius: 9999px`) for secondary buttons and classification chips.
- **Cards & Media Panels:** Moderate 12px to 16px (`rounded-lg` to `rounded-xl`) corner radii to softly contain atmospheric photography within the dark UI.
- **Primary Buttons:** Subtle rounded-sm (4px to 6px) structure for functional authority.

## Components

- **Primary Action Button:** High-contrast amber fill (`#FFB800`), dark glyphs (`#0B0C10`), uppercase technical labeling, paired with a directional icon.
- **Secondary Ghost Button:** Pill-shaped outline container, 1px hairline border (`rgba(255,255,255,0.2)`), translucent hover fill with white typography.
- **Status Chips / Badges:** Micro-pill wrappers, monospaced uppercase tracking, subtle borders (`rgba(255,255,255,0.15)`), transparent base.
- **Level Cards:** Vertical 3:4 aspect ratio cards featuring full-bleed imagery, dark bottom gradient scrims, centered bottom title labels, and external top-floating numeric indicators (`01`, `02`).
- **Carousel Controls:** Circular outline navigation buttons (`44px` diameter) with fine chevron icons.
- **Header Terminal Bar:** Top utility bar housing clean sans-serif wordmark, terminal sector status display (`Sector Alpha · Terminal 09`), circular explorer profile chip, and minimal stroke actions.
