import { reducer } from './reducer.js';
import { render } from './main.js';

export const store = Redux.createStore(reducer);

store.subscribe(() => {
    render();
});
