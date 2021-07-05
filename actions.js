const SELECT_ITEM = 'select_item';
const UP_ITEM = 'up_item';
const DOWN_ITEM = 'down_item';

function selectItem(index) {
  return {
    type: SELECT_ITEM,
    payload: index,
  };
}

function moveItemUp() {
  return {
    type: UP_ITEM,
  };
}

function moveItemDown() {
  return {
    type: DOWN_ITEM,
  };
}
