Here are 10 items of food:

Apple
Bread
Carrot
Dumplings
Eggs
Fish
Garlic
Honey
Ice cream
Jam
Create store.js. Export:

store
actions: { MOVE_UP, MOVE_DOWN, SELECT, }
(*) actionCreators: { moveUp, moveDown, select }
const { store, actions } = require('store');

const initialState = store.getState();
store.dispatch({ type: actions.SELECT, index: 0 });
store.dispatch({ type: actions.MOVE_DOWN });
store.dispatch({ type: actions.MOVE_DOWN });

const updatedState = store.getState();

cosole.log('Should be true', initialState.items[0] === updatedState.items[2]);