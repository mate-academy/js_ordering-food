import { reducer } from './reducer.js';
import {render} from './render.js';

export const store = Redux.createStore(reducer);

store.subscribe(() => {
    render();
});
