import { ACTIONS } from './actions';

const initialState = {
  fruits: [
    'Apple',
    'Bread',
    'Carrot',
    'Dumplings',
    'Eggs',
    'Fish',
    'Garlic',
    'Honey',
    'Ice cream',
    'Jam',
  ],
  selectedItem: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.SELECTED_ITEM:
      return {
        ...state,
        selectedItem: action.payload,
      };
    case ACTIONS.UNSELECTED_ITEM:
      return {
        ...state,
        selectedItem: null,
      };
    case ACTIONS.MOVE_DOWN: {
      const newList = [...state.fruits];
      const index = state.selectedItem;
      [newList[index], newList[index + 1]] = [newList[index + 1], newList[index]];

      if (index === state.fruits.length - 1 || index === null) {
        return state;
      }
      return {
        ...state,
        fruits: newList,
        selectedItem: state.selectedItem + 1,
      };
    }
    case ACTIONS.MOVE_UP: {
      const newList = [...state.fruits];
      const index = state.selectedItem;
      [newList[index], newList[index - 1]] = [newList[index - 1], newList[index]];

      if (index === 0 || index === null) {
        return state;
      }
      return {
        ...state,
        fruits: newList,
        selectedItem: state.selectedItem - 1,
      };
    }
    default:
      return state;
  }
}
