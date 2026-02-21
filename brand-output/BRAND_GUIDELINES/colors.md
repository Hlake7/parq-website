# Parq AI Brand Guidelines — Colors

---

## Design Rationale

The color system is built from the Sentinel archetype: calm authority, restrained confidence, and precision. Deep navy anchors the brand in trust and technology. A single electric teal accent provides energy and modernity without consumer playfulness. Warm neutrals prevent clinical coldness.

---

## Primary Palette

### Parq Navy — `#0A1628`
**Role:** Primary brand color. Dominant in headers, hero sections, navigation, and primary UI surfaces.
This is the brand's foundation — 70% of visual surface area should be navy or neutrals.

### Parq Teal — `#00C2B7`
**Role:** Primary accent. CTAs, links (on dark backgrounds), data highlights, interactive elements, and the "AI" in the logo.
Use sparingly as a 5% accent to maintain impact.

### Parq Blue — `#2E7CF6`
**Role:** Secondary accent. Charts, secondary buttons, supporting data visualizations, hover states.

---

## Neutral Palette

| Name | Hex | Role |
|---|---|---|
| **Ink** | `#1A1F2E` | Primary text on light backgrounds |
| **Slate** | `#4A5167` | Secondary text, captions, muted labels |
| **Stone** | `#8B92A7` | Borders, dividers, disabled states |
| **Mist** | `#E8EAF0` | Card backgrounds, secondary surfaces |
| **Cloud** | `#F5F6F8` | Page backgrounds (not pure white) |

---

## Semantic Colors

| Name | Hex | Usage |
|---|---|---|
| **Success** | `#12B76A` | Confirmations, compliance indicators, online status |
| **Warning** | `#F59E0B` | Caution states, expiring sessions, review needed |
| **Error** | `#EF4444` | Failures, violations, critical alerts (system only) |
| **Info** | `#3B82F6` | Tooltips, notices, neutral notifications |

Semantic colors are **functional only** — never use them decoratively.

---

## Color Proportions: 70 / 25 / 5

- **70% Dominant:** Parq Navy and neutral palette (backgrounds, text containers, large surfaces)
- **25% Secondary:** Cloud and Mist (content areas, cards, breathing space)
- **5% Accent:** Parq Teal and Parq Blue (CTAs, highlights, data points)

---

## Accessibility

### Teal on Light Backgrounds — Use `#008C83` Instead

The standard Parq Teal (`#00C2B7`) **fails contrast** on light backgrounds (1.9:1 ratio). For any teal text on light surfaces, use the accessible variant:

| Pairing | Ratio | WCAG AA |
|---|---|---|
| Ink on Cloud | 15.2:1 | AAA Pass |
| Cloud on Navy | 16.4:1 | AAA Pass |
| Teal on Navy | 8.6:1 | AAA Pass |
| Slate on Cloud | 6.5:1 | AA Pass |
| **Teal on Cloud** | **1.9:1** | **FAIL** |
| **Teal Accessible on Cloud** | **4.6:1** | **AA Pass** |

### Rules
- Body text: minimum 4.5:1 contrast ratio (WCAG AA)
- Large text/headings: minimum 3:1 ratio
- UI components and focus indicators: minimum 3:1 against adjacent colors

---

## Dark Mode

Dark mode uses the navy foundation with adjusted contrast levels.

### Surfaces
| Name | Hex |
|---|---|
| Background | `#070D1A` |
| Surface (elevated) | `#0F1829` |
| Surface (card) | `#1A2540` |
| Surface (overlay) | `#243155` |

### Text
| Name | Hex |
|---|---|
| Primary | `#F0F1F4` |
| Secondary | `#9BA3B8` |
| Muted | `#5C6580` |

### Accent Adjustments for Dark
| Color | Light Mode | Dark Mode |
|---|---|---|
| Teal | `#00C2B7` | `#00D4C8` (brighter for contrast) |
| Blue | `#2E7CF6` | `#4D8DF7` (lightened) |

---

## Usage by Purpose

| Context | Color |
|---|---|
| Page backgrounds | Cloud `#F5F6F8` (light) / `#070D1A` (dark) |
| Hero sections | Navy `#0A1628` background, Cloud text |
| Primary CTA buttons | Teal `#00C2B7` bg, Navy text |
| Secondary CTA buttons | Navy border on light, Blue on dark |
| Links | Teal Accessible `#008C83` on light, Teal on dark |
| Navigation | Navy background, Cloud text, Teal active state |
| Form elements | Stone `#8B92A7` borders, Teal focus ring |
| Status indicators | Semantic colors only |

---

## Colors to Avoid

- **Red as brand color** — Connotes punishment. Reserve for error states only.
- **Bright orange** — Consumer/playful. Conflicts with enterprise positioning.
- **Purple** — Signals creativity/luxury, not operational pragmatism.
- **Pure black `#000`** — Too harsh. Use Navy or Ink instead.
- **Pure white `#FFF`** — Too clinical. Use Cloud `#F5F6F8` instead.
- **Multi-color palettes (4+)** — Dilutes authority. Stay restrained.

---

## Teal Extended Scale

For data visualizations and UI gradation:

| Step | Hex | Use |
|---|---|---|
| 50 | `#E6FAF9` | Tint background |
| 100 | `#B3F0EC` | Light fill |
| 200 | `#66E3DB` | Highlight |
| 300 | `#33D6CD` | Active |
| **400** | **`#00C2B7`** | **Primary teal (brand)** |
| 500 | `#00A89E` | Pressed state |
| **600** | **`#008C83`** | **Accessible text** |
| 700 | `#006B64` | Dark |
| 800 | `#004A46` | Deep |
| 900 | `#002A28` | Near-black |
