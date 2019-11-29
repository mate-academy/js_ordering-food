const MOVE_UP = 'moveUp';
const MOVE_DOWN = 'moveDown';
const SELECT = 'selectItem';
const UNSELECT = 'unselectItem';

const initialState = {
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
    'Jam'
  ],
  selectedItem: -1
};

const moveUp = () => ({ type: MOVE_UP });
const moveDown = () => ({ type: MOVE_DOWN });
const selectItem = (index) => ({ type: SELECT, index });
const unselectItem = () => ({ type: UNSELECT });
