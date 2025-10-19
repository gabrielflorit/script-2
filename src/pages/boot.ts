import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("page-boot")
export class BootPage extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 2rem;
    }
  `;

  render() {
    return html`
      <h1>BOOTING...</h1>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "page-boot": BootPage;
  }
}
