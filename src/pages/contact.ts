import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("page-contact")
export class ContactPage extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 20px;
    }
  `;

  render() {
    return html`
      <h1>Contact Page</h1>
      <p>Get in touch with us!</p>
      <nav>
        <a href="/">Home</a> |
        <a href="/about">About</a>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "page-contact": ContactPage;
  }
}