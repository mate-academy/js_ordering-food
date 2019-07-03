const SELECT_ITEM = 'selectItem';
const UNSELECT_ITEM = 'unselectItem';
const MOVE_ITEM_UP = 'moveItemUp';
const MOVE_ITEM_DOWN = 'moveItemDown';

function selectItem(index) {
  return {
    type: SELECT_ITEM,
    payload: index
  };
}

function unselectItem() {
  return {
    type: UNSELECT_ITEM
  };
}

function MOVE_ITEM_UP() {
  return {
    type: MOVE_ITEM_UP
  };
}

function MOVE_ITEM_DOWN() {
  return {
    type: MOVE_ITEM_DOWN
  };
}