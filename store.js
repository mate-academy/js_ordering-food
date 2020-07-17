const { createStore } = require('./redux.min');

const MOVE_UP = 'move_up';
const MOVE_DOWN = 'move_down';
const SELECT = 'select';

const moveUp = () => ({type: MOVE_UP});
const moveDown = () => ({type: MOVE_DOWN});
const select = (value) => ({type: SELECT, value});

const initialState = {
  goods: ['Apple', 'Bread', 'Carrot', 'Dumplings', 'Eggs', 'Fish', 'Garlic', 'Honey', 'Ice', 'cream', 'Jam'], 
  selectedItem: null,
};

const reducer = (state = initialState, action) => {
    const goodsClone = [...state.goods];

    switch (action.type) {
      case MOVE_UP:
        const deletedItemU = goodsClone.splice(state.selectedItem, 1);

        goodsClone.splice(state.selectedItem - 1, 0, deletedItemU[0]);
        
        return {
          ...state,
          goods: goodsClone,
          selectedItem: state.selectedItem - 1,
        };
      case MOVE_DOWN:
        const deletedItemD = goodsClone.splice(state.selectedItem, 1);

        goodsClone.splice(state.selectedItem + 1, 0, deletedItemD[0]);
        
        return {
          ...state,
          goods: goodsClone,
          selectedItem: state.selectedItem + 1,
        };
      case SELECT:
        return {
          ...state,
          selectedItem: action.value,
        };
      default:
        return state;
    }
  }

const store = createStore(reducer);

store.dispatch(select(0))
store.dispatch(moveDown());
store.dispatch(moveDown());

console.log(store.getState());


module.export = {
  store,
  moveUp,
  moveDown,
  select
};


