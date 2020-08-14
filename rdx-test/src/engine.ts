import { Todo } from './models/todos.js';

const endpoint = 'https://jsonplaceholder.typicode.com/';
class Engine {
  private static instance?: Engine;

  private todos: Array<Todo>;

  public getTodos(): Array<Todo> {
    return this.todos;
  }

  private constructor() {
    todos = new Array<Todo>();
  }

  static getInstance(): Engine {
    return Engine.instance || (Engine.instance = new Engine());
  }

  public async initialize(): Promise<void> {
    const resp = await fetch(`${endpoint}todos`);
    this.todos = await resp.json();
  }
}

const engine = Engine.getInstance();
engine.initialize();
export default engine;
