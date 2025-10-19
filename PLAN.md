# Implementation Plan for SCRIPT-2 Routing and Joystick Demo

## Overview

Building out the core navigation structure with boot sequence, multiple pages, and a functional joystick demo that validates continuous press detection on mobile.

## Technical Decisions

**State Management**: Use Lit's reactive properties for component-level state. For the "has booted" flag, use `sessionStorage` to track whether the boot sequence has been shown in this browser session. This ensures external links show boot, but internal navigation doesn't.

**Routing Strategy**: @lit-labs/router for declarative routes. Use standard `<a>` tags with `href` attributes for navigation. The router intercepts all navigation and checks sessionStorage - if not booted, redirect to /boot with target stored; if booted, go directly to destination. This way both external and internal links work the same way without custom handlers.

**Joystick Input**: Custom web component with pointer events (`pointerdown`, `pointerup`). Use `touch-action: none` CSS to prevent browser default behaviors. Emit "pressed" and "released" state changes via custom events - no thresholds or duration logic. The game canvas will show a running timer (milliseconds since press) while button is held, and clear when released.

**Game Canvas Communication**: Custom events to bubble joystick state changes up to parent components. The preview/game component listens and visualizes input state.

---

## Commit Breakdown

### Commit 1: Add basic page components with placeholder content

- Create `src/pages/boot.ts` - placeholder with "BOOTING..." text
- Create `src/pages/play.ts` - placeholder with "PLAY" text
- Create `src/pages/edit.ts` - placeholder with "EDIT" text
- Create `src/pages/learn.ts` - placeholder with "LEARN" text
- Create `src/pages/about.ts` - placeholder with "ABOUT" text
- Update `src/pages/home.ts` - show four choices (play|new, edit, learn, about) as plain text/buttons

### Commit 2: Wire up routing for all pages

- Update `src/index.ts` router configuration to handle all six routes:
  - `/` → redirects to `/home`
  - `/boot` → boot component
  - `/home` → home component
  - `/play` → play component
  - `/edit` → edit component
  - `/learn` → learn component
  - `/about` → about component

### Commit 3: Implement boot sequence with progress bar and auto-navigation

- Update `boot.ts`:
  - Add simple progress bar animation (0-100% over 1 second)
  - After completion, read target route from a query param or state
  - Use router to navigate to target (default to `/home`)
- Technical note: Boot component receives target route as property or reads from sessionStorage

### Commit 4: Add "has booted" detection using sessionStorage

- Update main app component (`src/index.ts`):
  - On router navigation, check if target route is NOT `/boot`
  - Check `sessionStorage.getItem('hasBooted')`
  - If not booted yet, store target route, navigate to `/boot` with target as data
  - If booted, navigate directly to target
  - Boot component sets `sessionStorage.setItem('hasBooted', 'true')` on completion
- This ensures external links → boot → destination, internal links → direct navigation

### Commit 5: Update home page with navigation links

- Update `home.ts`:
  - Replace placeholder with actual navigation links/buttons
  - Links for: Play (or New if no game), Edit, Learn, About
  - Use standard `<a href="/path">` tags - router + sessionStorage handles boot logic

### Commit 6: Create joystick web component

- Create `src/components/joystick.ts`:
  - Visual representation (circular button)
  - Pointer event handlers (down, up)
  - Emit custom events: `joystick-down` and `joystick-up` (simple state changes)
  - CSS: `touch-action: none`, `user-select: none`, `-webkit-user-select: none` to prevent mobile browser interference
- Technical note: Use `pointerdown`/`pointerup` instead of touch events for cross-device compatibility
- No duration tracking - just binary pressed/released state

### Commit 7: Create game canvas component for input visualization

- Create `src/components/game-canvas.ts`:
  - 256x256 canvas element
  - Listen for joystick custom events (`joystick-down`, `joystick-up`)
  - When button pressed: start animation loop displaying running timer (ms elapsed)
  - When button released: clear canvas (or show "RELEASED")
  - Animation runs at 60fps using `requestAnimationFrame` while pressed
- This validates continuous press detection works correctly on mobile

### Commit 8: Implement /edit layout

- Update `edit.ts`:
  - Top menu bar (placeholder for now)
  - Two-column layout: left editor panel, right preview panel
  - Editor panel: `<textarea>` placeholder
  - Preview panel: embed `<game-canvas>` component
  - Include `<joystick>` component in preview area or as overlay
- CSS: flexbox or grid for side-by-side layout

### Commit 9: Implement /play layout

- Update `play.ts`:
  - Full-screen game view
  - Embed `<game-canvas>` component
  - Include `<joystick>` component
- Simpler than edit - just game + joystick

### Commit 10: Mobile testing and refinement

- Test joystick on actual mobile device
- Verify no text selection, no context menus, no copy/paste on long press
- Verify timer runs smoothly while button held
- Adjust CSS if needed: add `webkit-touch-callout: none`, `-webkit-tap-highlight-color: transparent`
- Verify pointer events work correctly on iOS and Android
- Test that releasing button immediately stops timer

---

## Technical Highlights

**Boot Flow Architecture**: The sessionStorage approach is clean - it persists per-tab session but resets when you close the tab. Fresh visits always boot, but navigating within the app doesn't. The router can intercept navigation in a centralized place.

**Joystick Component Design**: Making it a standalone web component means it's reusable across /play and /edit. Custom events keep it decoupled - it just emits binary pressed/released state, consumers decide what to do with it. No duration tracking in the component keeps it simple.

**Mobile Touch Prevention**: The combination of `touch-action: none` and `user-select: none` should prevent most browser interference. Pointer events are better than touch events because they handle mouse, touch, and stylus uniformly.

**Canvas Visualization**: Drawing visual feedback directly to canvas (not DOM elements) keeps it in the spirit of the project and validates the full input → rendering pipeline. The running timer shows continuous state tracking, not just discrete events.

**Layout Considerations**: For /edit, we'll need responsive behavior (per design doc: desktop shows side-by-side, mobile shows editor only). Can use CSS media queries or container queries.

---

## Open Questions / Considerations

1. **Edit layout on mobile**: Design doc says mobile edit mode shows only editor, no preview. Should joystick be hidden on mobile edit mode?
2. **Top menu in edit**: What should this contain? Save, run, character count?
3. **Joystick visual design**: Should it look like a physical button? Match the desk aesthetic from design doc?
4. **Boot sequence visual**: Design doc mentions "ZX Spectrum-style boot sequence" - for this demo, is a simple progress bar sufficient or should we make it more authentic?
5. **Router navigation interception**: Does @lit-labs/router provide a clean way to intercept all navigation for the sessionStorage check, or do we need a different approach?
