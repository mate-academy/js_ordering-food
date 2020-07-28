const { createStore } = require('./redux.min');

const actions = {
  MOVE_UP: 'MOVE_UP',
  MOVE_DOWN: 'MOVE_DOWN',
  SELECT: 'SELECT'
};

const moveUp = () => ({type: actions.MOVE_UP});
const moveDown = () => ({type: actions.MOVE_DOWN});
const select = (value) => ({type: actions.SELECT, value});

const initialState = {
  goods: ['Apple', 'Bread', 'Carrot', 'Dumplings', 'Eggs', 'Fish', 'Garlic', 'Honey', 'Ice', 'cream', 'Jam'], 
  selectedItem: null,
};

const reducer = (state = initialState, action) => {
    const goodsClone = [...state.goods];

    switch (action.type) {
      case actions.MOVE_UP:
        const deletedItemU = goodsClone.splice(state.selectedItem, 1);

        goodsClone.splice(state.selectedItem - 1, 0, deletedItemU[0]);
        
        return {
          ...state,
          goods: goodsClone,
          selectedItem: state.selectedItem - 1,
        };
      case actions.MOVE_DOWN:
        const deletedItemD = goodsClone.splice(state.selectedItem, 1);

        goodsClone.splice(state.selectedItem + 1, 0, deletedItemD[0]);
        
        return {
          ...state,
          goods: goodsClone,
          selectedItem: state.selectedItem + 1,
        };
      case actions.SELECT:
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
