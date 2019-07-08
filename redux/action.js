export const SELECT_ITEM = 'selectItem';
export const UNSELECT_ITEM = 'unselectItem';
export const MOVE_ITEM_UP = 'moveItemUp';
export const MOVE_ITEM_DOWN = 'moveItemDown';

export const selectItem = (index) => {
  return {
    type: SELECT_ITEM,
    payload: index
  };
}

export function unselectItem() {
  return {
    type: UNSELECT_ITEM
  };
}

export function moveItemUp() {
  return {
    type: MOVE_ITEM_UP
  };
}

export function moveItemDown() {
  return {
    type: MOVE_ITEM_DOWN
  };
}