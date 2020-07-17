const MOVE_UP = 'MOVE_UP';
const MOVE_DOWN = 'MOVE_DOWN';
const SELECT = 'SELECT';

const moveup = () => ({
  type: MOVE_UP,
})
const movedown = () => ({
  type: MOVE_DOWN,
})

const select = (index) => ({
  type: SELECT,
  index,
})

const actions = {
  MOVE_UP: moveup, 
  MOVE_DOWN: movedown,
  SELECT: select
}

const defaultState = {
  items: [
  'Apple',
  'Bread',
  'Carrot',
  'Dumplings',
  'Eggs',
  'Fish',
  'Garlic',
  'Honey',
  'Ice cream',
  'Jam'],
  index: null,
}

module.exports = {
  defaultState,
  actions,
}
