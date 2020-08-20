import { LitElement, html, css, property } from 'lit-element';
import Router from '../router.js';

export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

const todos: Todo[] = [
  { id: 0, userId: 10, title: 'Todo 0', completed: true },
  { id: 1, userId: 11, title: 'Todo 1', completed: false },
  { id: 2, userId: 12, title: 'Todo 2', completed: true },
  { id: 3, userId: 13, title: 'Todo 3', completed: false },
  { id: 4, userId: 14, title: 'Todo 4', completed: false },
  { id: 5, userId: 15, title: 'Todo 5', completed: false },
];

//https://lit-html.polymer-project.org/guide/writing-templates#repeating-templates.
//repeat(items, keyFunction, itemTemplate).
export default class TodosElement extends LitElement {
  @property({ type: Router })
  router!: Router;

  public constructor() {
    super();
  }

  static get styles() {
    return css`
      a {
        text-decoration: none;
      }

      a[completed] {
        text-decoration: line-through;
      }
    `;
  }

  connectedCallback(): void {
    super.connectedCallback();
    //this.router.urlChanges.subscribe(newUrl => this.page = newUrl);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    //this.router.urlChanges.unsubscribe();
  }

  render() {
    return html`<ul>
      ${todos.map(
        todo =>
          html`<li>
            <a
              ?completed=${todo.completed}
              href="./todos/${todo.id}"
              @click="${this.router.onNavigate}}"
              >${todo.title}</a
            >
          </li>`
      )}
    </ul>`;
  }
}
