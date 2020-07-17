const { createStore } = require('./redux.min');

const MOVE_UP = 'MOVE_UP';
const MOVE_DOWN = 'MOVE_DOWN';
const SELECT = 'SELECT';

const food = ['Apple', 'Bread', 'Carrot', 'Dumplings', 'Eggs', 'Fish', 'Garlic', 'Honey', 'Ice cream', 'Jam']

const initialState = {
  itemsOfFood: [...food],
  selectedItem: null
};

const selectItem = (index) => ({type:SELECT, index})
const moveUp = () => ({type: MOVE_UP});
const moveDown = () => ({type: MOVE_DOWN});

function reducer(state = initialState, action) {
  switch(action.type) {
    case SELECT:
      return {
        ...state,
        selectedItem: action.index
      };

      case MOVE_UP: {
          const newItemsOfFood = [...state.itemsOfFood];
          const item = newItemsOfFood.splice(state.selectedItem, 1);
          newItemsOfFood.splice(state.selectedItem - 1, 0, item[0])

          return {
            ...state,
            itemsOfFood: newItemsOfFood,
            selectedItem: state.selectedItem - 1
          };
      }

      case MOVE_DOWN: {
        const newItemsOfFood = [...state.itemsOfFood];
        const item = newItemsOfFood.splice(state.selectedItem, 1);
        newItemsOfFood.splice(state.selectedItem + 1, 0, item[0])

        return {
          ...state,
          itemsOfFood: newItemsOfFood,
          selectedItem: state.selectedItem + 1
        };
      }

      default:
        return state;
  }

}

const store = createStore(reducer);

store.dispatch(selectItem(2))
store.dispatch(moveDown());
store.dispatch(moveDown());

console.log(store.getState());


module.export = {
  store,
  moveUp,
  moveDown,
  selectItem
};