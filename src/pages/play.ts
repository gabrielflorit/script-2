import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("page-play")
export class PlayPage extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 2rem;
    }
  `;

  render() {
    return html`
      <h1>PLAY</h1>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "page-play": PlayPage;
  }
}
