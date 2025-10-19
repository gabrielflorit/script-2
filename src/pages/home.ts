import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("page-home")
export class HomePage extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 2rem;
    }

    ul {
      list-style: none;
      padding: 0;
    }

    li {
      margin: 1rem 0;
    }
  `;

  render() {
    return html`
      <h1>SCRIPT-2</h1>
      <ul>
        <li>Play</li>
        <li>Edit</li>
        <li>Learn</li>
        <li>About</li>
      </ul>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "page-home": HomePage;
  }
}
