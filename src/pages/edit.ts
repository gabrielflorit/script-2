import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import "~/components/game-canvas";
import "~/components/joystick";

@customElement("page-edit")
export class EditPage extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }

    .menu {
      padding: 0.5rem 1rem;
      background: #333;
      border-bottom: 1px solid #888;
    }

    .content {
      display: flex;
      flex: 1;
      overflow: hidden;
    }

    .editor-panel {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 1rem;
      border-right: 1px solid #888;
    }

    .preview-panel {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      gap: 1rem;
    }

    textarea {
      flex: 1;
      width: 100%;
      font-family: monospace;
      font-size: 14px;
      padding: 0.5rem;
      background: #1e1e1e;
      color: #d4d4d4;
      border: 1px solid #888;
      resize: none;
    }

    @media (max-width: 768px) {
      .content {
        flex-direction: column;
      }

      .editor-panel {
        border-right: none;
        border-bottom: 1px solid #888;
      }

      .preview-panel {
        display: none;
      }
    }
  `;

  render() {
    return html`
      <div class="menu">
        <span>EDIT MODE</span>
      </div>
      <div class="content">
        <div class="editor-panel">
          <textarea placeholder="// Write your code here..."></textarea>
        </div>
        <div class="preview-panel">
          <game-canvas></game-canvas>
          <game-joystick></game-joystick>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "page-edit": EditPage;
  }
}
