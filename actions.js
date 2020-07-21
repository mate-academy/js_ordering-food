const MOVE_UP = 'MOVE_UP';
const MOVE_DOWN = 'MOVE_DOWN';
const SELECT = 'SELECT';
const items = ['Apple', 'Bread', 'Carrot', 'Dumplings', 'Eggs', 'Fish','Garlic', 'Honey', 'Ice cream', 'Jam'];

const actions = {
  MOVE_UP,
  MOVE_DOWN,
  SELECT,
}

const actionCreators = {
  moveup : () => ({
    type: MOVE_UP,
  }),

  movedown : () => ({
    type: MOVE_DOWN,
  }),

  select : (selectedIndex) => ({
    type: SELECT,
    selectedIndex,
  }),
}
const initialState = {
  items,
  selectedIndex: null,
}

module.exports = {
  initialState,
  actionCreators,
  actions,
}
