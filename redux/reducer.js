import { SELECT_ITEM, UNSELECT_ITEM, MOVE_ITEM_UP, MOVE_ITEM_DOWN } from './action.js';

const initialState = {
  selectedItem: null,
  itemList: ['Apple', 'Bread', 'Carrot', 'Dumplings', 'Eggs', 'Fish', 'Garlic', 'Honey', 'Ice cream', 'Jam']
}

export function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case SELECT_ITEM:
      return {
        ...state,
        selectedItem: payload
      };
    case UNSELECT_ITEM:
      return {
        ...state,
        selectedItem: null
      }
    case MOVE_ITEM_UP:
      const newItemList = [...state.itemList];
      const removedItem = newItemList.splice(state.selectedItem, 1);
      newItemList.splice(state.selectedItem - 1, 0, removedItem)
      return {
        ...state,
        itemList: newItemList,
        selectedItem: state.selectedItem + 1
      };
    case MOVE_ITEM_DOWN:
      newItemList = [...state.itemList];
      removedItem = newItemList.splice(state.selectedItem, 1);
      newItemList.splice(state.selectedItem + 1, 0, removedItem)
      return {
        ...state,
        itemList: newItemList,
        selectedItem: state.selectedItem - 1
      };
    default:
      return state;
  }
}