const { createStore } = require('redux.min.js')
const items = ['Apple', 'Bread', 'Carrot', 'Dumplings', 'Eggs', 'Fish', 'Garlic', 'Honey', 'Ice cream', 'Jam'];


const initialState = {
    items: [...items],
    index: -1,
};

const ACTIONS = {
    moveDown: 'MOVE_UP',
    moveUp: 'MOVE_DOWN',
    selectItem : 'SELECT_ITEM',
  };

const moveDown = (index) => {
    return {
        type: ACTIONS.MOVE_DOWN,
        index: index - 1,
    }
}

const moveUp = (index) => {
    return {
        type: ACTIONS.MOVE_UP,
        index: index + 1,
    }
}

const selectItem = (index) => {
    return {
        type: ACTIONS.SELECT_ITEM,
        index,
    }
}

const reducer = (state = initialState, action) => {
    switch (action) {
        case 'MOVE_UP':
            const tempState = [...state.items];
            const temp = tempState[state.index];
            tempState[state.index] = tempState[state.index + 1];
            tempState[state.index + 1] = temp;
            return {
                ...state,
                items: [...tempState],
                index: state.index + 1,
            }
        case 'MOVE_DOWN':
            const tempState2 = [...state.items];
            const temp2 = tempState2[state.index];
            tempState2[state.index] = tempState2[state.index - 1];
            tempState2[state.index - 1] = temp2;
            return {
                ...state,
                items: [...tempState2],
                index: state.index - 1,
            }
        case 'SELECT_ITEM': 
            return {
                ...state,
                index: action.index,
            };
        default:
            return state;
    }
}
const store = Redux.createStore(reducer);

const nexState = store.getState();
store.dispatch(actions.SELECT, 0);
store.dispatch(actions.MOVE_DOWN);
store.dispatch(actions.MOVE_DOWN);

const updatedState = store.getState();

console.log(nextState, updatedState);

console.log(items, up, down)