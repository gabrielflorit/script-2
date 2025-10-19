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
    { path: "/", render: () => this.renderWithBootCheck("/home", () => html`<page-home></page-home>`) },
    { path: "/boot", render: () => html`<page-boot></page-boot>` },
    { path: "/home", render: () => this.renderWithBootCheck("/home", () => html`<page-home></page-home>`) },
    { path: "/play", render: () => this.renderWithBootCheck("/play", () => html`<page-play></page-play>`) },
    { path: "/edit", render: () => this.renderWithBootCheck("/edit", () => html`<page-edit></page-edit>`) },
    { path: "/learn", render: () => this.renderWithBootCheck("/learn", () => html`<page-learn></page-learn>`) },
    { path: "/about", render: () => this.renderWithBootCheck("/about", () => html`<page-about></page-about>`) },
  ]);

  private renderWithBootCheck(targetPath: string, renderFn: () => unknown) {
    const hasBooted = sessionStorage.getItem("hasBooted");

    if (!hasBooted) {
      sessionStorage.setItem("bootTarget", targetPath);
      window.location.href = "/boot";
      return html``;
    }

    return renderFn();
  }

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
