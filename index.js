const { store, actions } = require('./store');

const initialState = store.getState();
store.dispatch({ type: actions.SELECT, index: 2 });
store.dispatch({ type: actions.MOVE_DOWN });
store.dispatch({ type: actions.MOVE_DOWN });

const updatedState = store.getState();

console.log('Should be true', initialState.items[2] === updatedState.items[4]);
