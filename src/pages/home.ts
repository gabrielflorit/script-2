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

    a {
      color: inherit;
      text-decoration: none;
      font-size: 1.5rem;
    }

    a:hover {
      text-decoration: underline;
    }
  `;

  render() {
    return html`
      <h1>SCRIPT-2</h1>
      <ul>
        <li><a href="/play">Play</a></li>
        <li><a href="/edit">Edit</a></li>
        <li><a href="/learn">Learn</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "page-home": HomePage;
  }
}
