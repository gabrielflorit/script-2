import { LitElement, html, css } from "lit";
import { customElement, query } from "lit/decorators.js";

@customElement("game-canvas")
export class GameCanvas extends LitElement {
  @query("canvas")
  private canvas!: HTMLCanvasElement;

  private ctx!: CanvasRenderingContext2D;
  private isPressed = false;
  private pressStartTime = 0;
  private animationFrame = 0;

  static styles = css`
    :host {
      display: block;
    }

    canvas {
      width: 256px;
      height: 256px;
      background: #000;
      border: 2px solid #888;
      image-rendering: pixelated;
      image-rendering: crisp-edges;
    }
  `;

  firstUpdated() {
    const context = this.canvas.getContext("2d");
    if (!context) {
      throw new Error("Could not get 2D context");
    }
    this.ctx = context;
    this.canvas.width = 256;
    this.canvas.height = 256;
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("joystick-down", this.handleJoystickDown);
    window.addEventListener("joystick-up", this.handleJoystickUp);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("joystick-down", this.handleJoystickDown);
    window.removeEventListener("joystick-up", this.handleJoystickUp);
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }

  private handleJoystickDown = () => {
    this.isPressed = true;
    this.pressStartTime = Date.now();
    this.startAnimation();
  };

  private handleJoystickUp = () => {
    this.isPressed = false;
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = 0;
    }
    this.drawReleased();
  };

  private startAnimation() {
    const draw = () => {
      if (!this.isPressed) {
        return;
      }

      const elapsed = Date.now() - this.pressStartTime;
      this.drawTimer(elapsed);

      this.animationFrame = requestAnimationFrame(draw);
    };

    draw();
  }

  private drawTimer(ms: number) {
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(0, 0, 256, 256);

    this.ctx.fillStyle = "#0f0";
    this.ctx.font = "20px monospace";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText(`${ms}ms`, 128, 128);
  }

  private drawReleased() {
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(0, 0, 256, 256);

    this.ctx.fillStyle = "#0f0";
    this.ctx.font = "20px monospace";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText("RELEASED", 128, 128);
  }

  render() {
    return html`<canvas></canvas>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "game-canvas": GameCanvas;
  }
}
