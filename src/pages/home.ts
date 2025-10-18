import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("page-home")
export class HomePage extends LitElement {
  static styles = css`
    :host {
      color: blue;
    }
  `;

  render() {
    return html`
      <h1>Home Page</h1>
      <p>Welcome to the home page.</p>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "page-home": HomePage;
  }
}
