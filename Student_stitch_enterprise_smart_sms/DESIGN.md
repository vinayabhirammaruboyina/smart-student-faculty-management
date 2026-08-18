---
name: Lumina Academic
colors:
  surface: '#051424'
  surface-dim: '#051424'
  surface-bright: '#2c3a4c'
  surface-container-lowest: '#010f1f'
  surface-container-low: '#0d1c2d'
  surface-container: '#122131'
  surface-container-high: '#1c2b3c'
  surface-container-highest: '#273647'
  on-surface: '#d4e4fa'
  on-surface-variant: '#c8c4d5'
  inverse-surface: '#d4e4fa'
  inverse-on-surface: '#233143'
  outline: '#918f9e'
  outline-variant: '#464553'
  surface-tint: '#c3c0ff'
  primary: '#c3c0ff'
  on-primary: '#231691'
  primary-container: '#3730a3'
  on-primary-container: '#a9a7ff'
  inverse-primary: '#544fc0'
  secondary: '#c0c6db'
  on-secondary: '#293040'
  secondary-container: '#404758'
  on-secondary-container: '#aeb5c9'
  tertiary: '#ffb694'
  on-tertiary: '#571f00'
  tertiary-container: '#752c00'
  on-tertiary-container: '#fe9562'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3b35a7'
  secondary-fixed: '#dce2f7'
  secondary-fixed-dim: '#c0c6db'
  on-secondary-fixed: '#141b2b'
  on-secondary-fixed-variant: '#404758'
  tertiary-fixed: '#ffdbcc'
  tertiary-fixed-dim: '#ffb694'
  on-tertiary-fixed: '#351000'
  on-tertiary-fixed-variant: '#7a3003'
  background: '#051424'
  on-background: '#d4e4fa'
  surface-variant: '#273647'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  container-max: 1440px
  gutter: 16px
---

## Brand & Style

The design system is engineered for high-stakes education management, where precision and information density are paramount. The brand personality is authoritative yet unobtrusive, functioning as a sophisticated tool for administrators and educators.

The aesthetic follows a **Corporate Modern** approach with a heavy emphasis on **Minimalism** and **High-Density** layouts. By utilizing an OLED-optimized dark mode, the interface reduces eye strain during long working hours and provides a deep, immersive canvas for data visualization. Expect razor-sharp alignment, subtle micro-interactions, and a rigorous adherence to a systematic grid that prioritizes utility over decoration.

## Colors

This design system uses an OLED-first color strategy. The primary palette is rooted in **Deep Indigo**, providing a professional and stable anchor for the brand. 

- **Backgrounds:** Use `#090D16` for the base layer to maximize contrast and battery efficiency on OLED displays.
- **Surfaces:** Use `#111827` for containers, cards, and navigation bars to create a subtle sense of elevation against the pure dark background.
- **Accents:** Semantic colors (Emerald, Amber, Rose) are high-chroma to ensure critical alerts and status changes are immediately identifiable against the dark canvas.
- **Text:** Use high-contrast whites for primary content and slate-toned grays for secondary metadata to maintain a clear visual hierarchy.

## Typography

The typography system relies on **Inter** for its exceptional legibility in high-density interfaces. It is tuned for data clarity, utilizing tight letter spacing on larger headings and generous line heights for body text to aid scanning.

For technical data points, IDs, and tabular figures, the design system utilizes **JetBrains Mono** as a secondary font. This monospaced addition ensures that numerical data remains perfectly aligned, which is critical for the "Smart SMS" financial and grade-tracking modules. 

**Hierarchy Rules:**
- Use `headline-sm` for card titles.
- Use `body-md` as the default for all form inputs and general content.
- Use `label-sm` in all-caps for table headers and section overviews.

## Layout & Spacing

The design system employs a strict **4px baseline grid** to achieve high information density without feeling cluttered. 

**Grid Strategy:**
- **Desktop:** 12-column fluid grid with a 1440px max-width.
- **Tablet:** 8-column fluid grid with 16px margins.
- **Mobile:** 4-column fluid grid with 12px margins.

Vertical rhythm is maintained by using `16px (md)` padding for standard cards and `8px (sm)` for compact data rows. In "Precision Mode" (data-heavy views), margins between elements should be reduced to `4px (xs)` to maximize the visible data set without requiring excessive scrolling.

## Elevation & Depth

To maintain the professional and sophisticated tone, this design system avoids heavy shadows. Instead, it utilizes **Tonal Layering** and **Low-Contrast Outlines**.

1.  **Level 0 (Base):** `#090D16` (The canvas).
2.  **Level 1 (Cards/Surfaces):** `#111827` with a 1px solid border of `#1F2937`.
3.  **Level 2 (Modals/Popovers):** `#1F2937` with a subtle, 10% opacity white inner-glow on the top edge to simulate a light source.

Shadows, when used (e.g., for floating action buttons or detached modals), should be tight and dark: `0 4px 12px rgba(0, 0, 0, 0.5)`.

## Shapes

The shape language is "Soft" yet disciplined. A universal border radius of **4px (0.25rem)** is applied to all standard components (buttons, inputs, cards) to maintain a precise, engineered look. 

Large containers like main dashboard panels may use `rounded-lg` (8px), but never exceed this to avoid a "consumer-app" or overly playful feel. Interactive elements should never be pill-shaped; they must remain rectangular with soft corners to align with the professional grid.

## Components

### Data Tables
Tables are the core of this system. They should feature:
- Sticky headers with a secondary background color.
- Row hover states using a subtle white overlay (5% opacity).
- Condensed vertical padding (8px) for high-density viewing.
- Monospaced fonts for all numerical columns.

### Buttons
- **Primary:** Deep Indigo background, white text, 4px radius.
- **Secondary:** Transparent background, 1px border of `#374151`, white text.
- **Ghost:** No border or background, tinted with Primary color for subtle actions.

### Input Fields
Inputs should use the `#090D16` background when placed on a `#111827` surface to create a "punched-out" effect. The active state must feature a 1px Indigo border and a subtle Indigo outer glow (2px blur).

### Refined Cards
Cards must have a 1px border (`#1F2937`). Header sections within cards should be separated by a thin horizontal divider. For critical metrics, cards can include a 2px colored "accent bar" on the left edge (e.g., Emerald for positive growth).

### Navigation
A vertical sidebar is preferred for desktop, utilizing a collapsed state that only shows high-precision icons. Active navigation items should be indicated by a solid Primary-colored vertical bar on the left edge of the menu item.