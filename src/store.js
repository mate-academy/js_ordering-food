import { createStore } from '../node_modules/redux/es/redux.mjs';
import { reducer } from './reducer.js';

export const store = createStore(reducer);
