'use strict';

window.addEventListener('load', sortingFood);

function sortingFood() {
  const store = Redux.createStore(reducer);

  const listBody = document.querySelector('.food-list__body');
  const buttonUp = document.querySelector('.food-button__up');
  const buttonDown = document.querySelector('.food-button__down');

  buttonUp.addEventListener('click', () => {
    const state = store.getState();

    const movedItem = state.listOfFood.splice(state.activeItem, 1);
    state.listOfFood.splice(state.activeItem - 1, 0, movedItem)
    store.dispatch(moveItemUp());
  });

  buttonDown.addEventListener('click', () => {
    const state = store.getState();

    const movedItem = state.listOfFood.splice(state.activeItem, 1);
    state.listOfFood.splice(state.activeItem + 1, 0, movedItem)
    store.dispatch(moveItemDown());
  });

  listBody.addEventListener('click', event => {
    const chosedItemIndex = [...listBody.childNodes].findIndex(
      item => item.textContent === event.target.textContent
    );
    store.dispatch(selectItem(chosedItemIndex));
  });

  document.addEventListener('click', (event) => {
    if (event.target.parentNode === document) {
      store.dispatch(selectItem(null));
    }
        
  })

  function render() {
    const state = store.getState();
    const { activeItem, listOfFood } = state;

    listBody.innerHTML = '';

    const listOfItems = listOfFood.map((foodItem, index) => {
      const li = document.createElement('li');
      if (index === activeItem) {
        li.classList.add('active');
      }
      li.textContent = foodItem;
      return li;
    });
    listBody.append(...listOfItems);

    if (activeItem === 0 || activeItem === null) {
      buttonUp.disabled = true;
    } else {
      buttonUp.disabled = false;
    }
    if (activeItem === listOfItems.length - 1 || activeItem === null) {
      buttonDown.disabled = true;
    } else {
      buttonDown.disabled = false;
    }
  }

  render();

  store.subscribe(() => {
    render();
  });
}
