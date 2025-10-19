import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { Router } from "@lit-labs/router";
import "~/pages/boot";
import "~/pages/home";
import "~/pages/play";
import "~/pages/edit";
import "~/pages/learn";
import "~/pages/about";

@customElement("script-2")
export class Script2 extends LitElement {
  private router = new Router(this, [
    { path: "/", render: () => html`<page-home></page-home>` },
    { path: "/boot", render: () => html`<page-boot></page-boot>` },
    { path: "/home", render: () => html`<page-home></page-home>` },
    { path: "/play", render: () => html`<page-play></page-play>` },
    { path: "/edit", render: () => html`<page-edit></page-edit>` },
    { path: "/learn", render: () => html`<page-learn></page-learn>` },
    { path: "/about", render: () => html`<page-about></page-about>` },
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
