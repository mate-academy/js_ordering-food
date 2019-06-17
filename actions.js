const MOVE_UP_FOOD = 'move_up_food';
const MOVE_DOWN_FOOD = 'food_move_down';
const SET_BUTTONS_STATE = 'set_buttons_state';

const ButtonsStates = {
  SHOW_UP_BUTTON: 'show_up_button',
  SHOW_DOWN_BUTTON: 'show_down_button',
};

function moveUpFood(index) {
  return {
    type: MOVE_UP_FOOD, index
  }
}

function moveDownFood(index) {
  return {
    type: MOVE_DOWN_FOOD, index
  }
}

function handleSelection(index) {
  return {
    type: SET_BUTTONS_STATE, index
  }
}
