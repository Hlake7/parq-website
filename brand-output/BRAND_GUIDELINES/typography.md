# Parq AI Brand Guidelines — Typography

---

## Typeface System

### General Sans — Headlines
- **Classification:** Geometric sans-serif
- **Source:** [Fontshare](https://www.fontshare.com/fonts/general-sans) (free for commercial use)
- **Weights used:** Semibold (600) for display/h1/h2, Medium (500) for h3/h4/h5
- **Fallback:** `'General Sans', system-ui, -apple-system, 'Segoe UI', sans-serif`

**Use for:** All headings (display through h5), navigation items, button labels, the "Parq" portion of the logo wordmark, pitch deck slide titles.

**Never for:** Running body text, data tables, legal text.

---

### Inter — Body Text
- **Classification:** Neo-grotesque sans-serif
- **Source:** [Google Fonts](https://fonts.google.com/specimen/Inter) (SIL Open Font License)
- **Weights used:** Regular (400) for body, Medium (500) for labels/buttons, Semibold (600) sparingly for emphasis
- **Fallback:** `'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif`

**Use for:** All body text, form inputs, table content, tooltips, overlines, footer, navigation items.

**Never for:** Primary headlines, statistical callouts, code snippets.

---

### JetBrains Mono — Data & Metrics
- **Classification:** Monospaced
- **Source:** [Google Fonts](https://fonts.google.com/specimen/JetBrains+Mono) (SIL Open Font License)
- **Weights used:** Regular (400) for data labels, Medium (500) for hero statistics
- **Fallback:** `'JetBrains Mono', 'SF Mono', 'Consolas', monospace`

**Use for:** Hero statistics (99.2%, 24/7, 35%), dashboard values, data tables, inline code, the "AI" portion of the logo wordmark.

**Never for:** Headings, body text, navigation, UI labels.

---

## Type Scale — Major Third (1.250)

Base size: **16px / 1rem**

| Level | Size | Line Height | Weight | Font | Usage |
|---|---|---|---|---|---|
| **Display** | 3.815rem (61px) | 1.1 | 600 | General Sans | Hero headlines. One per page. |
| **H1** | 3.052rem (49px) | 1.15 | 600 | General Sans | Page titles. |
| **H2** | 2.441rem (39px) | 1.2 | 600 | General Sans | Section headings. |
| **H3** | 1.953rem (31px) | 1.25 | 500 | General Sans | Subsection headings, card titles. |
| **H4** | 1.563rem (25px) | 1.3 | 500 | General Sans | Tertiary headings. |
| **H5** | 1.25rem (20px) | 1.4 | 500 | General Sans | Minor headings, eyebrow text. |
| **Body Large** | 1.125rem (18px) | 1.6 | 400 | Inter | Lead paragraphs. |
| **Body** | 1rem (16px) | 1.6 | 400 | Inter | Default running text. |
| **Body Small** | 0.875rem (14px) | 1.5 | 400 | Inter | Secondary text, table content. |
| **Caption** | 0.75rem (12px) | 1.5 | 400 | Inter | Footnotes, timestamps. |
| **Overline** | 0.75rem (12px) | 1.5 | 500 | Inter | Section labels (UPPERCASE, 0.1em spacing). |
| **Data Display** | 3rem (48px) | 1.1 | 500 | JetBrains Mono | Hero statistics. |
| **Data Label** | 0.875rem (14px) | 1.4 | 400 | JetBrains Mono | Metric labels, annotations. |

---

## Fluid Typography (CSS)

Headlines use `clamp()` for smooth scaling between mobile and desktop:

```
Display:  clamp(2rem, 1.2rem + 3.5vw, 3.815rem)
H1:       clamp(1.75rem, 1rem + 3vw, 3.052rem)
H2:       clamp(1.5rem, 0.9rem + 2.4vw, 2.441rem)
H3:       clamp(1.375rem, 1rem + 1.5vw, 1.953rem)
H4:       clamp(1.25rem, 1.05rem + 0.8vw, 1.563rem)
H5:       clamp(1.125rem, 1.05rem + 0.3vw, 1.25rem)
Data:     clamp(2rem, 1.2rem + 3vw, 3rem)
```

Body text remains fixed at 16px across all breakpoints.

---

## Hierarchy Rules

1. Every page must have exactly **one h1**. Use display size only for hero sections on primary landing pages.
2. Maintain **strict heading order** — never skip from h2 to h4.
3. Use **weight variation** (medium vs semibold) rather than many sizes for sub-hierarchy.
4. **Overline labels** (small, uppercase, tracked-out) precede h2/h3 headings for category context.
5. **Data callouts** use JetBrains Mono at data_display size with a body-weight Inter label beneath.
6. Never use **italic** for emphasis in headlines. Use weight or accent color.
7. Limit **underlines** to hyperlinks only.

---

## Readability

- **Line length:** 60-75 characters per line optimal (`max-width: 65ch`)
- **Paragraph spacing:** 1.5em between paragraphs
- **After heading:** 0.75em (tight coupling to content)
- **Before heading:** 2em (clear section break)
- **Minimum body text:** 16px — never go smaller for running text
- **Minimum any text:** 11px — absolute floor for visible text

---

## Responsive Sizes

| Level | Mobile | Tablet | Desktop |
|---|---|---|---|
| Display | 32px | 44px | 61px |
| H1 | 28px | 36px | 49px |
| H2 | 24px | 31px | 39px |
| H3 | 22px | 26px | 31px |
| Body | 16px | 16px | 16px |
| Data Display | 32px | 40px | 48px |

---

## Font Loading Strategy

- Use **variable fonts** (single file per family, all weights)
- **Preload** Inter and General Sans (critical path)
- JetBrains Mono can load **asynchronously** (typically below fold)
- Use `font-display: swap` for all families
- Subset to **Latin character set** to reduce file size
