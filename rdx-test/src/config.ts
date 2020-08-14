import createMatcher from '@captaincodeman/router';
import { routingPluginFactory } from '@captaincodeman/rdx-model';
import * as models from './models/index.js';

const routes = {
  '/': 'home-view',
  '/counter': 'counter-view',
  '/todos': 'todos-view',
  '/todos/:id': 'todo-view',
  '/*': 'not-found',
};

const matcher = createMatcher(routes);
const routing = routingPluginFactory(matcher);

export const config = { models, plugins: { routing } };
