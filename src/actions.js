const SELECT_ITEM = 'SELECT_ITEM';
const CLEAR_SELECTION = 'CLEAR_SELECTION';
const MOVE_SELECTION_UP = 'MOVE_SELECTION_UP';
const MOVE_SELECTION_DOWN = 'MOVE_SELECTION_DOWN';

const selectItem = index => {
  return {
    type: SELECT_ITEM,
    payload: index,
  };
};

const clearSelection = () => {
  return {
    type: CLEAR_SELECTION,
  };
};

const moveSelectionUp = () => {
  return {
    type: MOVE_SELECTION_UP,
  };
};

const moveSelectionDown = () => {
  return {
    type: MOVE_SELECTION_DOWN,
  };
};

export {
  SELECT_ITEM,
  CLEAR_SELECTION,
  MOVE_SELECTION_UP,
  MOVE_SELECTION_DOWN,
  selectItem,
  clearSelection,
  moveSelectionUp,
  moveSelectionDown
}
