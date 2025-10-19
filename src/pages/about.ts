import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("page-about")
export class AboutPage extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 2rem;
    }
  `;

  render() {
    return html`
      <h1>ABOUT</h1>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "page-about": AboutPage;
  }
}
