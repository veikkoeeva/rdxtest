import { Todo } from './models/todos.js';
//import { BehaviorSubject } from "rxjs";

const endpoint = 'https://jsonplaceholder.typicode.com/';
export default class Engine {
  private static instance?: Engine;
  private todos: Array<Todo> = new Array<Todo>();

  public getTodos(): Array<Todo> {
    return this.todos;
  }

  public constructor() {
    console.log('temporary constructor call, will be removed');
  }

  /*private constructor() {
    console.log('temporary constructor call, will be removed');
  }*/

  static getInstance(): Engine {
    return Engine.instance || (Engine.instance = new Engine());
  }

  public async initialize(): Promise<void> {
    const resp = await fetch(`${endpoint}todos`);
    this.todos = await resp.json();
  }
}

/*const engine = Engine.getInstance();
engine.initialize();
export default engine;*/
