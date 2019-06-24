export const SELECT_ITEM = 'SELECT_ITEM';
export const CLEAR_SELECTION = 'CLEAR_SELECTION';
export const MOVE_SELECTION_UP = 'MOVE_SELECTION_UP';
export const MOVE_SELECTION_DOWN = 'MOVE_SELECTION_DOWN';

export const selectItem = (index) => {
  return {
    type: SELECT_ITEM,
    payload: index,
  }
};

export const clearSelection = () => {
  return {
    type: CLEAR_SELECTION,
  }
};

export const moveSelectionUp = () => {
  return {
    type: MOVE_SELECTION_UP,
  }
};

export const moveSelectionDown = () => {
  return {
    type: MOVE_SELECTION_DOWN,
  }
};
