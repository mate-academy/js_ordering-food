import { foodList } from './foodList.js';
import {
  SELECT_ITEM,
  CLEAR_SELECTION,
  MOVE_SELECTION_UP,
  MOVE_SELECTION_DOWN,
} from './actions.js';

const initialState = {
  foodList: [...foodList],
  selectedIndex: null,
};

const actionHandlers = {
  [SELECT_ITEM]: (state, action) => {
    return {
      ...state,
      selectedIndex: action.payload,
    };
  },
  [CLEAR_SELECTION]: (state) => {
    return {
      ...state,
      selectedIndex: null,
    };
  },
  [MOVE_SELECTION_UP]: (state) => {
    const { selectedIndex, foodList } = state;

    if (selectedIndex === 0) {
      return state;
    }

    const newFoodList = [...foodList];
    const [removedFood] = newFoodList.splice(selectedIndex, 1);
    newFoodList.splice(selectedIndex - 1, 0, removedFood);

    return {
      foodList: newFoodList,
      selectedIndex: selectedIndex - 1,
    };
  },
  [MOVE_SELECTION_DOWN]: (state) => {
    const { selectedIndex, foodList } = state;

    if (selectedIndex === foodList.length - 1) {
      return state;
    }

    const newFoodList = [...foodList];
    const [removedFood] = newFoodList.splice(selectedIndex, 1);
    newFoodList.splice(selectedIndex + 1, 0, removedFood);

    return {
      foodList: newFoodList,
      selectedIndex: selectedIndex + 1,
    };
  },
};

export const reducer = (state = initialState, action) => {
  const handler = actionHandlers[action.type];

  return handler
    ? handler(state, action)
    : state;
};
