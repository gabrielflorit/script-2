import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("game-joystick")
export class Joystick extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .joystick {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background: #444;
      border: 3px solid #888;
      cursor: pointer;
      touch-action: manipulation;
      user-select: none;
      -webkit-user-select: none;
      -webkit-touch-callout: none;
      -webkit-tap-highlight-color: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8rem;
      color: #aaa;
    }

    .joystick:active {
      background: #666;
      border-color: #aaa;
    }
  `;

  private lastTapTime = 0;

  private handlePointerDown = (e: PointerEvent) => {
    e.preventDefault();

    // Prevent double-tap zoom
    const now = Date.now();
    if (now - this.lastTapTime < 300) {
      e.stopPropagation();
    }
    this.lastTapTime = now;

    this.dispatchEvent(new CustomEvent("joystick-down", { bubbles: true, composed: true }));
  };

  private handlePointerUp = (e: PointerEvent) => {
    e.preventDefault();
    this.dispatchEvent(new CustomEvent("joystick-up", { bubbles: true, composed: true }));
  };

  private handlePointerCancel = (e: PointerEvent) => {
    e.preventDefault();
    // Treat cancel like a release
    this.dispatchEvent(new CustomEvent("joystick-up", { bubbles: true, composed: true }));
  };

  private handleTouchStart = (e: TouchEvent) => {
    e.preventDefault();
  };

  private handleGestureStart = (e: Event) => {
    e.preventDefault();
  };

  render() {
    return html`
      <div
        class="joystick"
        @pointerdown=${this.handlePointerDown}
        @pointerup=${this.handlePointerUp}
        @pointercancel=${this.handlePointerCancel}
        @touchstart=${this.handleTouchStart}
        @gesturestart=${this.handleGestureStart}
      >
        PRESS
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "game-joystick": Joystick;
  }
}
