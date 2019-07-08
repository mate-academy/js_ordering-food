'use strict'

let initialState = {
  foods: ['Apple', 'Bread', 'Carrot', 'Dumplings', 'Eggs', 'Fish', 'Garlic', 'Honey', 'Ice cream', 'Jam'],
  selectedFoodIndex: null
};


function getNextState(state = initialState, action) {
  switch (action.type) {
    case MOVE_UP: 
      const newFoodItemsUp = [...state.foods];
      const indexFoodItemUp = state.selectedFoodIndex;
      const [selectedFoodItemUp] = newFoodItemsUp.splice(indexFoodItemUp, 1);
      newFoodItemsUp.splice(indexFoodItemUp - 1, 0, selectedFoodItemUp);
      return {
        foods: newFoodItemsUp,
        selectedFoodIndex: indexFoodItemUp - 1
      };
    case MOVE_DOWN:
      const newFoodItemsDown = [...state.foods];
      const indexFoodItemDown = state.selectedFoodIndex;
      const [selectedFoodItemDown] = newFoodItemsDown.splice(indexFoodItemDown, 1);
      newFoodItemsDown.splice(indexFoodItemDown + 1, 0, selectedFoodItemDown);
      return {
        foods: newFoodItemsDown,
        selectedFoodIndex: indexFoodItemDown + 1
      };
    case SELECT_INDEX:
      return {
        ...state,
        selectedFoodIndex: action.index
      };
    default:
      return state;
  };
};
