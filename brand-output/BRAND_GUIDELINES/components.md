# Parq AI Brand Guidelines — UI Components

---

## Design Principles

- **Restrained confidence** — every element should feel intentional
- **Clean and minimal** — generous whitespace, purposeful negative space
- **Data-informed** — interface-inspired elements hint at the analytics behind the brand
- **Accessible** — WCAG AA minimum across all interactive components

---

## Buttons

### Primary Button
- Background: Parq Teal `#00C2B7`
- Text: Parq Navy `#0A1628`
- Font: Inter Medium, 1rem
- Padding: 12px 24px
- Border radius: 8px
- Hover: `#00A89E` (Teal 500)
- Active: `#008C83` (Teal 600)
- Focus: 3px teal ring at 20% opacity

### Secondary Button
- Background: transparent
- Text: Parq Navy `#0A1628`
- Border: 1.5px solid Navy
- Hover: 5% navy fill

### Ghost Button
- Background: transparent
- Text: Teal Accessible `#008C83`
- Hover: 8% teal fill

### Sizes
| Size | Padding | Font Size |
|---|---|---|
| Small | 8px 16px | 0.875rem |
| Medium (default) | 12px 24px | 1rem |
| Large | 16px 32px | 1.125rem |

### Dark Mode Buttons
- Primary: `#00D4C8` background, dark text
- Secondary: `#F0F1F4` text, `#2A3A5C` border

---

## Cards

### Default Card
- Background: Mist `#E8EAF0`
- Border radius: 12px
- Padding: 24px (16px on mobile)
- No shadow, no border

### Elevated Card
- Background: Cloud `#F5F6F8`
- Border: 1px solid Mist
- Shadow: `--shadow-2`

### Interactive Card
- Same as elevated, plus:
- Cursor: pointer
- Hover: translateY(-2px), shadow-3
- Transition: 200ms ease

### Dark Mode Cards
- Background: `#1A2540`
- Border: 1px solid `#1E2A45`

---

## Form Inputs

- Background: Cloud `#F5F6F8`
- Border: 1.5px solid Stone `#8B92A7`
- Border radius: 8px
- Padding: 12px 16px
- Font: Inter Regular, 1rem
- Text color: Ink `#1A1F2E`
- Placeholder: Stone `#8B92A7`
- Focus: Teal border + 3px teal ring (20% opacity)
- Error: Red border `#EF4444`
- Transition: 150ms for border and shadow

---

## Badges

Small status indicators and labels.

| Variant | Background | Text Color |
|---|---|---|
| Default | Mist `#E8EAF0` | Slate `#4A5167` |
| Accent | 12% Teal | Teal Accessible `#008C83` |
| Success | 12% Green | `#12B76A` |
| Warning | 12% Amber | `#F59E0B` |
| Error | 12% Red | `#EF4444` |

- Font: Inter Medium, 0.75rem
- Padding: 4px 10px
- Border radius: full (pill shape)

---

## Metric Callout

The signature data display pattern used for hero statistics.

```
  99.2%           <-- JetBrains Mono Medium, data_display size, Teal
  Detection Rate  <-- Inter Regular, body_small, secondary text
```

- Stack vertically with 8px gap
- Number in `--font-data` at `--text-data-display`
- Label in `--font-body` at `--text-body-sm`
- On dark backgrounds: Teal number, Stone label
- On light backgrounds: Teal Accessible number, Slate label

---

## Navigation Bar

- Background: Parq Navy `#0A1628`
- Height: 64px
- Position: sticky top
- Backdrop filter: blur(8px)
- Border bottom: 1px solid `rgba(42, 58, 92, 0.5)`
- Links: Inter Medium, 0.875rem, Cloud
- Active/hover: Parq Teal
- Logo: horizontal lockup, light version

---

## Footer

- Background: Parq Navy `#0A1628`
- Padding: 64px top, 32px bottom
- Border top: 1px solid `#1E2A45`
- Text: Inter Regular, 0.875rem, Stone
- Links: Cloud, hover to Teal
- Legal text: Inter Regular, 0.75rem, Stone

---

## Shadows and Elevation

| Level | Value | Use |
|---|---|---|
| 1 | `0 1px 2px rgba(10,22,40,0.04)` | Resting cards, inputs |
| 2 | `0 1px 3px rgba(10,22,40,0.06), 0 1px 2px rgba(10,22,40,0.04)` | Default cards, dropdowns |
| 3 | `0 4px 12px rgba(10,22,40,0.08), 0 2px 4px rgba(10,22,40,0.04)` | Hover states, tooltips |
| 4 | `0 8px 24px rgba(10,22,40,0.12), 0 4px 8px rgba(10,22,40,0.06)` | Modals, dialogs |
| Focus | `0 0 0 3px rgba(0,194,183,0.2)` | Focus indicators |

---

## Border Radius

| Token | Value | Use |
|---|---|---|
| `sm` | 4px | Small elements |
| `md` | 8px | Buttons, inputs, tooltips |
| `lg` | 12px | Cards |
| `xl` | 16px | Modals |
| `full` | 9999px | Badges, avatars |

---

## Animation

- **Default duration:** 200ms for interactive feedback
- **Content entering:** 300ms
- **Data updates:** 500ms
- **Easing:** `cubic-bezier(0.4, 0, 0.2, 1)` (default)
- **Prefer:** opacity and transform (GPU-accelerated)
- **Avoid:** animating width, height, margin, padding
- **Respect:** `prefers-reduced-motion` — disable transforms, use opacity only

---

## Layout Grid

- **12-column** grid, max-width 1200px
- **Gutter:** 24px (32px on wide screens)
- **Containers:** narrow (680px), default (1200px), wide (1400px)
- **Spacing base unit:** 4px

### Responsive Breakpoints
| Name | Width | Columns |
|---|---|---|
| Mobile | < 640px | 4 columns, 16px gutter |
| Tablet | 640-1023px | 8 columns, 24px gutter |
| Desktop | 1024px+ | 12 columns, 24px gutter |
| Wide | 1440px+ | 12 columns, 32px gutter |
