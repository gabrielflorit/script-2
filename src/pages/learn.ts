import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("page-learn")
export class LearnPage extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 2rem;
    }
  `;

  render() {
    return html`
      <h1>LEARN</h1>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "page-learn": LearnPage;
  }
}
