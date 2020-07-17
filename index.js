const { store, actions } = require('./store');

console.log('---------S-t-a-r-t---------');
console.log('checking normal moving down:');

let initialState = store.getState();
store.dispatch({ type: actions.SELECT, index: 2 });
store.dispatch({ type: actions.MOVE_DOWN });
store.dispatch({ type: actions.MOVE_DOWN });
let updatedState = store.getState();

console.log('Should be true', initialState.items[2] === updatedState.items[4]);
console.log('moveDown is true:', updatedState.enabledDown);
console.log('  moveUp is true:', updatedState.enabledUp);

console.log('------D-o-w-n---E-d-g-e-----');
console.log('checking normal moving down:');

initialState = store.getState();
store.dispatch({ type: actions.SELECT, index: 8 });
store.dispatch({ type: actions.MOVE_DOWN });
store.dispatch({ type: actions.MOVE_DOWN });
updatedState = store.getState();

console.log('Should be true', initialState.items[8] === updatedState.items[9]);
console.log('moveDown is false:', updatedState.enabledDown);
console.log('  moveUp is true:', updatedState.enabledUp);

console.log('--------U-p---E-d-g-e------');
console.log('checking normal moving down:');

initialState = store.getState();
store.dispatch({ type: actions.SELECT, index: 1 });
store.dispatch({ type: actions.MOVE_UP });
store.dispatch({ type: actions.MOVE_UP });
updatedState = store.getState();

console.log('Should be true', initialState.items[1] === updatedState.items[0]);
console.log('moveDown is true:', updatedState.enabledDown);
console.log('  moveUp is false:', updatedState.enabledUp);