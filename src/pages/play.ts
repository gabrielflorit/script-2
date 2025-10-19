import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import "~/components/game-canvas";
import "~/components/joystick";

@customElement("page-play")
export class PlayPage extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      gap: 2rem;
    }
  `;

  render() {
    return html`
      <game-canvas></game-canvas>
      <game-joystick></game-joystick>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "page-play": PlayPage;
  }
}
