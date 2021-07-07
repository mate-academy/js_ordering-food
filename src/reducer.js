'use strict';

let initialState = {
    foodItems: [
      {item:'Apple'},
      {item:'Bread'},
      {item:'Carrot'},
      {item:'Dumplings'},
      {item:'Eggs'},
      {item:'Fish'},
      {item:'Garlic'},
      {item:'Honey'},
      {item:'Ice cream'},
      {item:'Jam'}
    ],

    selectedIndex: -1,
};

function swap(list, newIndex, oldIndex) {
  const newList = list.slice();
  const [removedItem] = newList.splice(oldIndex, 1);
  newList.splice(newIndex, 0, removedItem);
  return newList;
}

function getNextState(state = initialState, action) {
  switch (action.type) {
    case MOVE_UP:
      return {
        ...state,
        foodItems: swap(state.foodItems, state.selectedIndex - 1, state.selectedIndex),
        selectedIndex: state.selectedIndex - 1

      };
    case MOVE_DOWN:
      return {
        ...state,
        foodItems: swap(state.foodItems, state.selectedIndex + 1, state.selectedIndex),
        selectedIndex: state.selectedIndex + 1

      };
    case SELECT_FOOD:
      return {
        ...state,
        selectedIndex: action.index
      };
    case CANCEL_SELECT_FOOD:
      return {
        ...state,
        selectedIndex: -1
      };
    default:
      return state;
  }
}
