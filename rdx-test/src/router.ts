import createMatcher from '@captaincodeman/router';
import homeView from './ui2/home.js';
import todoListView from './ui2/todos.js';
import todoItem from './ui2/todoItem.js';
import counterView from './ui2/counter.js';

export default createMatcher({
  '/': homeView,
  '/todos': todoListView,
  '/todos/:id': todoListView,
  '/counter': counterView,
});
