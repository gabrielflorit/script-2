import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";

@customElement("page-boot")
export class BootPage extends LitElement {
  @state()
  private progress = 0;

  private startTime = 0;
  private animationFrame = 0;

  static styles = css`
    :host {
      display: block;
      padding: 2rem;
    }

    .progress-bar {
      width: 100%;
      height: 20px;
      background: #333;
      margin-top: 1rem;
    }

    .progress-fill {
      height: 100%;
      background: #0f0;
      transition: width 0.1s linear;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.startTime = Date.now();
    this.updateProgress();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }

  private updateProgress() {
    const elapsed = Date.now() - this.startTime;
    const duration = 1000; // 1 second

    this.progress = Math.min((elapsed / duration) * 100, 100);

    if (this.progress < 100) {
      this.animationFrame = requestAnimationFrame(() => this.updateProgress());
    } else {
      this.onComplete();
    }
  }

  private onComplete() {
    sessionStorage.setItem("hasBooted", "true");
    const target = sessionStorage.getItem("bootTarget") || "/home";
    sessionStorage.removeItem("bootTarget");
    window.location.href = target;
  }

  render() {
    return html`
      <h1>BOOTING...</h1>
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${this.progress}%"></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "page-boot": BootPage;
  }
}
