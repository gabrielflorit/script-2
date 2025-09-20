import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("page-about")
export class AboutPage extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 20px;
    }
  `;

  render() {
    return html`
      <h1>About Page</h1>
      <p>This is the about page.</p>
      <nav>
        <a href="/">Home</a> |
        <a href="/contact">Contact</a>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "page-about": AboutPage;
  }
}