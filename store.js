const { createStore } = require('./redux.min.js')
const items = ['Apple', 'Bread', 'Carrot', 'Dumplings', 'Eggs', 'Fish', 'Garlic', 'Honey', 'Ice cream', 'Jam'];


const initialState = {
    items: [...items],
    index: 0,
};

const ACTIONS = {
    MOVE_UP: 'MOVE_UP',
    MOVE_DOWN: 'MOVE_DOWN',
    SELECT_ITEM : 'SELECT_ITEM',
  };

const MOVE_DOWN = () => ({
    type: ACTIONS.MOVE_DOWN,
})


const MOVE_UP = (index) => ({
    type: ACTIONS.MOVE_UP,
})


const SELECT_ITEM = (index) => ({
    type: ACTIONS.SELECT_ITEM,
    index,
})

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.MOVE_UP:
            const tempStateUp = [...state.items];
            const tempUp = tempStateUp[state.index];
            tempStateUp[state.index] = tempStateUp[state.index + 1];
            tempStateUp[state.index + 1] = tempUp;
            return {
                ...state,
                items: [...tempStateUp],
            }
        case ACTIONS.MOVE_DOWN:
            const tempStateDown = [...state.items];
            const tempDown = tempStateDown[state.index];
            tempStateDown[state.index] = tempStateDown[state.index - 1];
            tempStateDown[state.index - 1] = tempDown;
            return {
                ...state,
                items: [...tempStateDown]
            }
        case ACTIONS.SELECT_ITEM: 
            return {
                ...state,
                index: action.index,
            };
        default:
            return state;
    }
}
const store = createStore(reducer);
store.dispatch({ type: ACTIONS.SELECT_ITEM, index: 6 });
store.dispatch({ type: ACTIONS.MOVE_UP });

const updatedState = store.getState();

console.log(updatedState);
