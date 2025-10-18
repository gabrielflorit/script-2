import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { Router } from "@lit-labs/router";
import "~/pages/home";

@customElement("script-2")
export class Script2 extends LitElement {
  private router = new Router(this, [
    { path: "/", render: () => html`<page-home></page-home>` },
  ]);

  static styles = css`
    :host {
      color: red;
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
