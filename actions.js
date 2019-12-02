const ACTIONS = {
  MOVE_UP: 'MOVE_UP',
  MOVE_DOWN: 'MOVE_DOWN',
  SELECTED_ITEM: 'SELECTED_ITEM',
  UNSELECTED_ITEM: 'UNSELECTED_ITEM'
}

function MOVE_UP() {
  return {
    type: ACTIONS.MOVE_UP,
  }
}

function MOVE_DOWN() {
  return {
    type: ACTIONS.MOVE_DOWN,
  }
}

function SELECTED_ITEM(index) {
  return {
    type: ACTIONS.SELECTED_ITEM,
    payload: index,
  }
}

function UNSELECTED_ITEM() {
  return {
    type: ACTIONS.UNSELECTED_ITEM,
  }
}
