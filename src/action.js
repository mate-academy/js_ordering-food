'use strict'

const MOVE_UP = 'move_up';
const MOVE_DOWN = 'move_down';
const SELECT_INDEX = 'selected_index'

function moveUpAction() {
  return {
    type: MOVE_UP
  };
};

function moveDownAction() {
  return {
    type: MOVE_DOWN
  };
};

function selectedIndexAction(index) {
  return {
    type: SELECT_INDEX,
    index
  };
};