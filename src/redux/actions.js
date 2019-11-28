export const MOVE_UP = 'MOVE_UP';
export const MOVE_DOWN = 'MOVE_DOWN';
export const SELECT_ITEM = 'SELECT_ITEM';


export function moveUp() {
  return {
    type: MOVE_UP
  };
}

export function moveDown() {
  return {
    type: MOVE_DOWN
  };
}

export function selectItem(index) {
  return {
    type: SELECT_ITEM,
    payload: index
  };
}
