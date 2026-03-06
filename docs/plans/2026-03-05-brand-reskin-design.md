# Brand Reskin Design: "Dark Shell, Soft Core"

**Date:** 2026-03-05
**Scope:** Cosmetic-only facelift applying Parq AI brand system to all pages. Zero functional changes.

## Design Direction

Balance dark and light. Nighttime checkout users won't get blinded; daytime marketing pages still feel professional.

## Color Migration

| Element | Old | New |
|---------|-----|-----|
| Nav background | White translucent | Parq Navy `#0A1628` |
| Hero background | Purple gradient `#667eea-#764ba2` | Parq Navy `#0A1628` |
| Content sections | `#f8f9fa` | Cloud `#F5F6F8` |
| Cards | White + shadow | Mist `#E8EAF0`, minimal shadow |
| CTA sections | Purple gradient | Parq Navy `#0A1628` |
| Footer | `#1a1a1a` | Parq Navy `#0A1628` |
| Accent/links | `#667eea` purple | Parq Teal `#00C2B7` |
| Gradient text | Pink `#f093fb-#f5576c` | Parq Teal `#00C2B7` solid |
| Buttons primary | Purple gradient | Teal `#00C2B7` bg, Navy text |
| Buttons secondary | White border | Navy border on light, `#2A3A5C` border on dark |
| Checkout page | White background | Navy `#0A1628` with lighter card panels `#1A2540` |

## Typography Migration

| Role | Old | New |
|------|-----|-----|
| Headlines | System font, 700 | General Sans Semibold |
| Body | System font, 400 | Inter Regular |
| Data/prices | System font | JetBrains Mono Medium |

Font loading: Google Fonts `<link>` in `public/index.html`.

## Files to Modify

1. `public/index.html` - Add Google Fonts link
2. `frontend/src/components/BusinessPages.css` - Full color/typography/spacing overhaul
3. `frontend/src/components/Homepage.tsx` - Update class names if needed, text content untouched
4. `frontend/src/components/AboutPage.tsx` - Same
5. `frontend/src/components/ServicesPage.tsx` - Same
6. `frontend/src/components/ContactPage.tsx` - Same
7. `frontend/src/components/BookingPage.tsx` - Cosmetic CSS only, no logic changes
8. `frontend/src/components/PaymentSuccess.tsx` - Cosmetic alignment
9. `frontend/src/index.css` - Base font update
10. `frontend/src/App.css` - Minor alignment if needed

## Constraints

- BookingPage Stripe flow: ZERO changes to state, API calls, or form logic
- ParkingMap canvas: ZERO changes to rendering or coordinates
- All routes stay identical
- Promo code system untouched
- Mobile responsiveness preserved (update breakpoints cosmetically only)

## Parallel Work Streams

1. **CSS Foundation** - BusinessPages.css full overhaul + index.css + fonts
2. **Business Pages TSX** - Update any inline styles or class additions needed in Homepage, About, Services, Contact
3. **Checkout Pages** - BookingPage + PaymentSuccess cosmetic-only styling
4. **Verification** - Build test, visual check, checkout flow confirmation
