const ACTIONS = {
  MOVE_UP: 'MOVE_UP',
  MOVE_DOWN: 'MOVE_DOWN',
  SELECTED_ITEM: 'SELECTED_ITEM',
  UNSELECTED_ITEM: 'UNSELECTED_ITEM',
};

export function MOVE_UP() {
  return {
    type: ACTIONS.MOVE_UP,
  };
}

export function MOVE_DOWN() {
  return {
    type: ACTIONS.MOVE_DOWN,
  };
}

export function SELECTED_ITEM(index) {
  return {
    type: ACTIONS.SELECTED_ITEM,
    payload: index,
  };
}

export function UNSELECTED_ITEM() {
  return {
    type: ACTIONS.UNSELECTED_ITEM,
  };
}

export default { ACTIONS };
