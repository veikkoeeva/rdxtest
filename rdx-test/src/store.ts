import {
  createStore,
  StoreState,
  StoreDispatch,
  EffectStore,
} from '@captaincodeman/rdx-model';
import { devtools, persist } from '@captaincodeman/rdx';
import { config } from './config.js';

let _store = createStore(config);

// These could be commented out if the extra functionality
// wasn't required, to create a production bundle without
// the redux devtools enabled for instance. This could be
// controlled using rollup with the replace plugin, e.g.
//
// if (process.env.NODE_ENV !== 'production') {
//   store = devtools(store)
// }
//
// the bundle size becomes 7.22 Kb minified, 2.8 Kb gzipped

_store = devtools(_store);
_store = persist(_store);

export const store = _store;

export type State = StoreState<typeof config>;
export type Dispatch = StoreDispatch<typeof config>;
export type Store = EffectStore<Dispatch, State>;
