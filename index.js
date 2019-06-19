import { store } from './src/store.js';
import {
  clearSelection,
} from './src/actions.js';
import { renderButtons, renderList } from './src/render.js';

const createRender = container => (state, dispatch) => {
  const buttons = renderButtons(state, dispatch);
  const list = renderList(state, dispatch);

  while (container.firstChild) {
    container.firstChild.remove();
  }

  container.append(list, buttons);
};

window.addEventListener('load', () => {
  const render = createRender(document.getElementById('root'));

  store.subscribe(() => {
    render(store.getState(), store.dispatch);
  });

  document.addEventListener('click', () => store.dispatch(clearSelection()));

  store.dispatch({ type: 'INITIAL_RENDER' });
});
