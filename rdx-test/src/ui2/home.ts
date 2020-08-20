import { LitElement, html, property, TemplateResult } from 'lit-element';
import Engine from '../engine.js';
import Router from '../router.js';
import { BehaviorSubject } from 'rxjs';

import './rdx-home.js';
import './rdx-counter.js';
import './rdx-todoItem.js';
import './rdx-todos.js';

export default class HomeElement extends LitElement {
  private readonly router = new Router();
  private engine = new Engine();

  @property({ type: String })
  page = '/';

  constructor() {
    super();
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.router.urlChanges.subscribe(newUrl => (this.page = newUrl));
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.router.urlChanges.unsubscribe();
  }

  render(): TemplateResult {
    return html`
      <header>
        <a href="/" @click=${this.router.onNavigate}>Home</a>
        <a href="todos" @click=${this.router.onNavigate}>Todos</a>
        <a href="counter" @click=${this.router.onNavigate}>Counter</a>
        <a href="unknown" @click=${this.router.onNavigate}>Unknown</a>
      </header>
      <main>
        ${this.renderPage()}
      </main>
    `;
  }

  private renderPage() {
    switch (this.page) {
      case '/':
        return html`<p>Home.</p>`;
      case '/todos':
        return html`<rdx-todos .router=${this.router}></rdx-todos>`;
      case '/counter':
        return html`<rdx-counter></rdx-counter>`;
      default:
        return html`<p>Not found.</p>`;
    }
  }
}
