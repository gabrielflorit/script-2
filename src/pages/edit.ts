import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("page-edit")
export class EditPage extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 2rem;
    }
  `;

  render() {
    return html`
      <h1>EDIT</h1>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "page-edit": EditPage;
  }
}
