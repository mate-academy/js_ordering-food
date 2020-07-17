const MOVE_UP = 'move_up';
const MOVE_DOWN = 'move_down';
const SELECT = 'select';

const moveUp = () => ({ type: MOVE_UP });
const moveDown = () => ({ type: MOVE_DOWN });
const select = (value) => ({ type: SELECT, value });
const actions = {
  moveUp,
  moveDown,
  select,
};

module.exports = {
  actions,
  MOVE_UP,
  MOVE_DOWN,
  SELECT,
};