import { MOVE_UP, MOVE_DOWN, SELECT_ITEM } from './actions';

export default function reducer(state, action) {
  switch (action.type) {
    case SELECT_ITEM:
      return {
        ...state,
        selectedItem: action.payload
      };
    case MOVE_UP: {
      const newList = [...state.fruits], index = state.selectedItem;
      [newList[index], newList[index - 1]] = [newList[index - 1], newList[index]]
      if (state.selectedItem === 0 || state.selectedItem === null) {
        return state;
      }
      return {
        ...state,
        fruits: newList,
        selectedItem: state.selectedItem - 1
      }
    };
    case MOVE_DOWN: {
      const newList = [...state.fruits], index = state.selectedItem;
      [newList[index], newList[index + 1]] = [newList[index + 1], newList[index]]
      if (state.selectedItem === state.fruits.length - 1 || state.selectedItem === null) {
        return state;
      }
      return {
        ...state,
        fruits: newList,
        selectedItem: state.selectedItem + 1
      }
    };
    default:
      return state;
  }
}
