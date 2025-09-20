import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { Router } from "@lit-labs/router";

@customElement("script-2")
export class Script2 extends LitElement {
  private router = new Router(this, [
    { path: "/", render: () => html`<h1>Home</h1>` },
    { path: "/projects", render: () => html`<h1>Projects</h1>` },
    { path: "/about", render: () => html`<h1>About</h1>` },
  ]);

  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
    }

    #router-outlet {
      display: block;
    }
  `;

  render() {
    return this.router.outlet();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "script-2": Script2;
  }
}
