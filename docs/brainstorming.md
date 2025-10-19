# SCRIPT-2 Design Document

This document captures the design decisions and philosophy behind SCRIPT-2, a fantasy game console built around the constraint of "two."

---

## Overall Concept & User Experience

SCRIPT-2 is a fantasy game console inspired by PICO-8 and the ZX Spectrum, designed as a creative constraint-based environment built around the concept of "two." The entire application presents a scene of a CRT monitor (displaying 1024x768 content) sitting on a desk, with a one-button joystick controller beside it. This creates the illusion of viewing an actual physical console setup. The interface uses a four-color palette for syntax highlighting and UI elements, while the game canvas itself uses only one color - pixels are either on (bright) or off (dark).

When users visit SCRIPT-2, they see a quick ZX Spectrum-style boot sequence that establishes the console metaphor. After boot, they see the home screen offering four paths: new game (or "play" if a game URL is loaded), edit, learn, and about. The 1024x768 console dimensions remain fixed, creating a consistent CRT viewing experience.

The target audience is creative beginners - exemplified by a 14-year-old who wants to make games and learn coding concepts through hands-on building. The design prioritizes fun, immediate feedback, and learning through doing, while the severe constraints (one-bit graphics, one button, two sounds, small code size) force creative problem-solving rather than feature complexity.

---

## Editor Interface & Coding Environment

On desktop (within the 1024x768 console viewport), the main workspace is a side-by-side split view: code editor on the left, game preview (256x256 pixel canvas) on the right. On mobile or narrow viewports, the edit mode shows only the code editor without the preview pane. The code editor is a simple textarea-style JavaScript editor with a visible character counter showing remaining space out of the 2,048 character limit. This tight constraint encourages concise, thoughtful code.

When starting a new game, users see a template with three function stubs - `init()`, `update(state, input)`, and `draw(state)` - each with brief comments explaining their purpose. This establishes a functional game loop pattern: `init()` returns the initial state object, which flows through `update()` (along with input) to produce new state, and then to `draw()` for rendering. This immutable/functional approach is cleaner and easier to reason about than managing global mutable state.

The editor validates syntax continuously and shows standard JavaScript errors inline. The preview pane auto-executes code when it's syntactically valid, with a short debounce to wait for typing pauses. Users can also pause the preview to stop execution. Runtime errors appear in an error section below the game canvas, while syntax errors stay in the editor. Code and preview stay in sync, providing immediate visual feedback as users code.

The desk scene displays a physical-looking one-button joystick controller that works on both desktop and mobile. Desktop users can also use a fixed keyboard mapping (spacebar or Z key) for the single button input.

---

## Drawing & Sound APIs

The drawing API provides basic geometric primitives: pixel, line, rectangle (filled and outlined), circle (filled and outlined), and text rendering. All drawing happens on a 256x256 pixel canvas with a bottom-left origin (0,0), making it math-friendly and intuitive for teaching. Text uses a single pixel-perfect bitmap font with no size options - embracing the constraint aesthetic. There are no sprites or image support; users build everything from primitives.

Graphics are strictly one-bit: pixels are either on (bright) or off (dark). There is no color choice or grayscale - this is pure binary graphics reminiscent of the earliest computer displays. The API is intentionally minimal with no helper functions - no collision detection, no math utilities, no shortcuts. Users learn by building these systems themselves from first principles.

Sound follows the "two" theme rigorously. The API is `playSound(waveform, frequency, duration, volume)` where each parameter accepts only two values (0 or 1): waveform is square or sine, frequency is low or high, duration is short or long, volume is quiet or loud. This gives users 16 possible sound combinations across two sound "slots," forcing creative sound design within extreme constraints.

The game loop runs at 30 FPS, balancing smooth performance with computational efficiency.

---

## Tutorial & Learning System

Tutorials are project-based: each tutorial guides users through building a complete game while teaching core concepts along the way. This learning-by-doing approach is more engaging than abstract lessons, especially for younger users.

The tutorial interface displays step-by-step instructions that show what code to add, with highlights or annotations indicating where changes should go. Users must type the code themselves (with hints available) rather than having it auto-inserted. This hands-on approach ensures they learn through muscle memory and understanding, not just reading.

Each tutorial teaches concepts in context - movement, collision detection, scoring, game state management - all while building toward a playable result. Tutorials are always freely accessible with no progression tracking, completion requirements, or locked content. Users can jump into any tutorial, replay them, or abandon them at will without pressure.

The tutorial content itself can modify what's shown in the code pane (highlighting regions, showing hints), helping guide attention to the relevant parts of the code without taking control away from the user.

---

## Save & Share System

SCRIPT-2 uses a local-first approach with optional URL-based sharing. Games are automatically saved to browser local storage with metadata including: title, timestamp, and a thumbnail screenshot of the game. The "load game" interface displays saved projects as a visual grid with thumbnails and titles, making it easy to find and resume work.

For sharing, users can export their game as a URL with the code compressed into the hash or query parameters. Since the editor enforces a 2,048 character limit, URL size isn't a concern - the compressed code will reliably fit within browser and sharing platform limits. When someone visits a game URL, after the boot sequence they see the game with options to either play it or open it in the editor.

This hybrid approach provides the best of both worlds: projects persist locally without requiring accounts or authentication, while URL sharing enables frictionless distribution - no backend, no login, just copy and paste a link.

---

## Visual Design & Aesthetic

SCRIPT-2 presents itself as a physical scene: a CRT monitor sitting on a desk with a one-button joystick controller beside it. The monitor displays 1024x768 content, and the entire setup creates an immersive fantasy console experience as if you're sitting at an actual retro computer workstation. The interface uses a four-color palette that enables syntax highlighting and better visual hierarchy while maintaining a cohesive retro aesthetic. However, the game canvas itself is strictly one-bit - pixels are either on or off, creating pure binary graphics.

The boot sequence is a quick (1-2 second) homage to the ZX Spectrum, establishing the "fantasy console" metaphor immediately. After boot, users see the home screen within the CRT display, with the physical joystick controller visible on the desk. All UI elements are HTML-based but styled to look retro and console-like, maintaining the aesthetic without sacrificing accessibility or functionality.

The home screen presents four options in this retro-styled format: new game (or "play" when a game is loaded), edit, learn, and about. The editor interface maintains the theme with monospace fonts and the four-color palette for syntax highlighting. The physical-looking joystick controller is always visible on the desk as part of the scene.

The game canvas itself is exactly 256x256 pixels, rendered with crisp pixels (no smoothing/antialiasing) to preserve that authentic retro look. On desktop, the 1024x768 console viewport displays both editor and preview side-by-side. On mobile or narrow viewports, the edit mode shows only the code editor.

---

## Input System & Controls

SCRIPT-2's input is radically simplified: just one button, period. No directional controls, no keyboard arrows, no complex input schemes. This extreme constraint forces users to design games around timing, rhythm, and carefully timed single inputs rather than complex control schemes.

The `input` parameter passed to `update(state, input)` contains the state of this single button. The physical-looking joystick controller is always visible on the desk and works on both touch devices and desktop. On desktop, users can also press spacebar or Z key to activate the button. There is no button customization - keeping the interface simple and consistent.

This input model fundamentally shapes what kinds of games can be made: timing-based challenges, rhythm games, one-button platformers, reflex tests, and games built around precisely timed single inputs. It's a creative constraint that pushes users toward novel game mechanics that work within this limitation.

The one-button paradigm also makes games instantly playable on mobile devices without complex touch controls, supporting the goal of mobile-friendly game playing and sharing.

---

## Technical Architecture

SCRIPT-2 is built as a single-page application using Vite, TypeScript, and Lit web components - leveraging modern web standards while maintaining a lightweight footprint. The application has no backend dependencies; everything runs client-side in the browser, making it fast, private, and easy to deploy.

User code executes in an isolated context using JavaScript's Function constructor, which provides a sandboxed environment where the game engine provides the drawing and sound APIs as globals. The engine calls `init()` once to establish initial state, then runs a 30 FPS loop calling `update(state, input)` to compute new state and `draw(state)` to render it. State flows immutably through the loop, making game logic predictable and easier to debug.

The application presents a fixed visual scene of a desk with a CRT monitor (1024x768 display) and a physical-looking one-button joystick controller. The drawing API is implemented as a wrapper around HTML5 Canvas 2D context, translating the bottom-left coordinate system to canvas's top-left coordinates. The game canvas renders at 256x256 pixels in one-bit graphics (on or off). The sound API uses Web Audio API's OscillatorNode and GainNode to generate square and sine waves with precise control over frequency, duration, and volume.

Storage uses browser localStorage to persist game metadata and code, with base64 encoding for URL sharing. The existing @lit-labs/router handles client-side routing, distinguishing between bare URLs (show menu), editor URLs, and shared game URLs (show play/edit choice).
