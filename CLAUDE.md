# CLAUDE.md

This file provides guidance to Claude Code when working with this codebase.

## Project Overview

SCRIPT-2 is a fantasy game console built around the constraint of "two" - inspired by PICO-8 and the ZX Spectrum. It's a web-based creative coding environment where users create games within severe constraints. Target audience is creative beginners (14-year-old learning to make games).

**The "Two" Theme:**
- One-bit graphics (2 states: on/off)
- Single button input (spacebar/Z or touch joystick)
- 256x256 game canvas (2^8)
- Four-color UI palette (2^2)
- 2048 character code limit (2^11)
- Two sound types (square/sine) with binary parameters (0 or 1)

The application presents a CRT monitor (1024x768) on a desk with a one-button joystick controller. The interface uses a four-color palette for UI, while the game canvas uses strictly one-bit graphics (pixels on or off).

## Development Commands

- `pnpm dev` - Start development server
- `pnpm build` - Build for production (TypeScript compilation + Vite build)
- `pnpm preview` - Preview production build locally

## Tech Stack

- **Build**: Vite 7
- **Language**: TypeScript 5.8 (strict mode, ES2022)
- **Components**: Lit 3.3 web components with decorators
- **Routing**: @lit-labs/router
- **Deployment**: Vercel (SPA config)
- **No backend** - everything runs client-side

## Project Structure

```
script-2/
├── index.html              # Entry point, viewport config
├── src/
│   ├── index.css          # Global styles, mobile optimizations
│   ├── index.ts           # Main <script-2> component with router
│   ├── pages/
│   │   ├── home.ts        # Navigation menu
│   │   ├── play.ts        # Game playback (canvas + joystick)
│   │   ├── edit.ts        # Code editor with live preview
│   │   ├── learn.ts       # Tutorials (placeholder)
│   │   └── about.ts       # About page (placeholder)
│   └── components/
│       ├── game-canvas.ts # 256x256 canvas, event handling
│       └── joystick.ts    # One-button controller
├── docs/
│   └── brainstorming.md   # Full design document
├── vite.config.js         # Build config, path aliases
├── tsconfig.json          # TypeScript config
├── eslint.config.js       # Linting rules
└── vercel.json            # SPA routing config
```

## Routing

Defined in `src/index.ts`. Routes go directly to pages - **no redirects or boot sequences**:

- `/` → home page
- `/home` → home page
- `/play` → game playback
- `/edit` → code editor
- `/learn` → tutorials
- `/about` → about page

`vercel.json` ensures all routes serve `index.html` for SPA behavior.

## Components

### game-canvas (`<game-canvas>`)

256x256 HTML5 canvas with crisp pixel rendering (`image-rendering: pixelated`).

- Listens for global `joystick-down` and `joystick-up` custom events
- Tracks button press state and duration
- Currently displays demo animations (timer during press, "RELEASED" message after)
- Uses `requestAnimationFrame` for smooth animation
- Canvas context configured for 256x256 resolution

Event handling:
```typescript
window.addEventListener("joystick-down", handler);
window.addEventListener("joystick-up", handler);
```

### game-joystick (`<game-joystick>`)

One-button circular controller optimized for desktop and mobile.

- Dispatches `joystick-down` and `joystick-up` custom events (bubbles, composed)
- Uses pointer events for unified mouse/touch handling
- Prevents double-tap zoom, touch callouts, gesture interference
- Visual feedback on press (`:active` state styling)

Mobile optimizations:
- `touch-action: manipulation` prevents browser gestures
- Prevents double-tap with timestamp tracking
- Handles `pointercancel` events
- Explicit touch/gesture event prevention

## Pages

- **home.ts**: Navigation menu with links to Play, Edit, Learn, About
- **play.ts**: Full-screen layout, centers `<game-canvas>` and `<game-joystick>` vertically with gap
- **edit.ts**: Code editor interface
  - Desktop: Side-by-side (editor left, preview right)
  - Mobile: Editor only (preview panel hidden via media query)
  - Textarea-based code editor (monospace, dark theme)
  - Preview panel shows `<game-canvas>` and `<game-joystick>`
  - Menu bar at top: "EDIT MODE"
- **learn.ts**: Placeholder with basic heading
- **about.ts**: Placeholder with basic heading

## Mobile-First Design

Global styles in `src/index.css` prevent common mobile issues:

```css
/* Prevents zooming on double-tap */
touch-action: manipulation;
maximum-scale: 1.0;
user-scalable: no;

/* Prevents text selection */
user-select: none;
-webkit-user-select: none;

/* Prevents touch callouts and tap highlights */
-webkit-touch-callout: none;
-webkit-tap-highlight-color: transparent;

/* Prevents scroll bouncing */
overscroll-behavior: none;
```

## Configuration

### TypeScript (`tsconfig.json`)

- Strict mode enabled with all strict checks
- Target: ES2022
- Module: ESNext with bundler resolution
- **Decorators**: `experimentalDecorators: true`
- **useDefineForClassFields**: `false` (REQUIRED for Lit decorators)
- Path mapping: `~/*` → `./src/*`

### Lit Component Pattern

All Lit components must:
1. Use `@customElement` decorator to register custom element
2. Declare tag name in global `HTMLElementTagNameMap` for TypeScript typing
3. Extend `LitElement` base class

### Path Alias

`~` maps to `./src` - configured in both `vite.config.js` and `tsconfig.json`:

```typescript
import "~/components/game-canvas";
import "~/pages/home";
```

### ESLint

Configured with strict and stylistic TypeScript rules (`eslint.config.js`).

## Game Engine (Planned - Not Yet Implemented)

See `docs/brainstorming.md` for full design details.

### Execution Model
- User code runs in sandboxed context via Function constructor
- No access to global scope or dangerous APIs
- Drawing and sound APIs provided as context globals

### Functional Game Loop (30 FPS)

```javascript
// User provides these three functions:
function init() {
  return { /* initial game state */ };
}

function update(state, input) {
  // input.button is true/false
  return { /* new state */ };
}

function draw(state) {
  // Drawing API calls
  pixel(x, y);
  line(x1, y1, x2, y2);
  rect(x, y, w, h);
  circle(x, y, r);
  text(str, x, y);
}
```

State flows immutably: `init() → update() → draw() → update() → draw() ...`

### Drawing API

Wraps HTML5 Canvas 2D with **bottom-left (0,0) origin** (math-friendly):
- `pixel(x, y)` - Plot single pixel
- `line(x1, y1, x2, y2)` - Draw line
- `rect(x, y, w, h)` / `rectFill(x, y, w, h)` - Rectangle
- `circle(x, y, r)` / `circleFill(x, y, r)` - Circle
- `text(str, x, y)` - Bitmap font text

All graphics are **one-bit** (on/off). No color, no grayscale, no sprites.

### Sound API

```javascript
playSound(waveform, frequency, duration, volume)
// Each parameter accepts only 0 or 1:
// waveform: 0=square, 1=sine
// frequency: 0=low, 1=high
// duration: 0=short, 1=long
// volume: 0=quiet, 1=loud
```

Two sound "slots" available. 16 possible combinations (2^4).

Uses Web Audio API (OscillatorNode, GainNode).

### Storage & Sharing

- **Local**: Auto-save to localStorage with metadata (title, timestamp, thumbnail)
- **Sharing**: Export as URL with base64-encoded code in hash/query params
- **2048 char limit**: Ensures URLs stay within platform limits

## Implementation Status

**Completed:**
- ✅ Application structure with routing
- ✅ Mobile-optimized layout and controls
- ✅ Joystick input component with event system
- ✅ Game canvas display component
- ✅ Edit page layout (editor + preview)

**To Do:**
- [ ] Game engine (init/update/draw loop)
- [ ] Drawing API primitives
- [ ] Sound API with Web Audio
- [ ] Code editor with character counter
- [ ] localStorage persistence
- [ ] URL-based game sharing
- [ ] Tutorial system (learn page)
- [ ] UI color palette implementation
