'use strict'
let store = Redux.createStore(getNextState);

const moveDowm = document.querySelector('#moveDown');
const moveUp = document.querySelector('#moveUp');

moveDowm.addEventListener('click', () => {
  store.dispatch(moveDownAction());
})

moveUp.addEventListener('click', () => {
  store.dispatch(moveUpAction());
});

function render() {
  const listItem = document.querySelector('#listItem');
  listItem.innerHTML = '';

  let foodItems = store.getState().foods;
  let index = store.getState().selectedFoodIndex;

  moveDowm.disabled = index === foodItems.length - 1;
  moveUp.disabled = index === 0;
  
  for (let i = 0; i < foodItems.length; i++) {
    const li = document.createElement('li');
    li.innerHTML = foodItems[i];
    li.addEventListener('click', (e) => {
      store.dispatch(selectedIndexAction(i));
    });
    listItem.append(li);
  };
};

store.subscribe(() => {
  render();
});

render();
