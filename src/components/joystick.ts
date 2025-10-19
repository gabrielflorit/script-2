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
      touch-action: none;
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

  private handlePointerDown = (e: PointerEvent) => {
    e.preventDefault();
    this.dispatchEvent(new CustomEvent("joystick-down", { bubbles: true, composed: true }));
  };

  private handlePointerUp = (e: PointerEvent) => {
    e.preventDefault();
    this.dispatchEvent(new CustomEvent("joystick-up", { bubbles: true, composed: true }));
  };

  render() {
    return html`
      <div
        class="joystick"
        @pointerdown=${this.handlePointerDown}
        @pointerup=${this.handlePointerUp}
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
