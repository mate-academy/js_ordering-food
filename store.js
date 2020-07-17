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

const MOVE_DOWN = () => {
    return {
        type: ACTIONS.MOVE_DOWN,
    }
}

const MOVE_UP = (index) => {
    return {
        type: ACTIONS.MOVE_UP,
    }
}

const SELECT_ITEM = (index) => {
    return {
        type: ACTIONS.SELECT_ITEM,
        index,
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'MOVE_UP':
            console.log("in move up")
            const tempState = [...state.items];
            const temp = tempState[state.index];
            tempState[state.index] = tempState[state.index + 1];
            tempState[state.index + 1] = temp;
            return {
                ...state,
                items: [...tempState],
            }
        case 'MOVE_DOWN':
            const tempState2 = [...state.items];
            const temp2 = tempState2[state.index];
            tempState2[state.index] = tempState2[state.index - 1];
            tempState2[state.index - 1] = temp2;
            return {
                ...state,
                items: [...tempState2]
            }
        case 'SELECT_ITEM': 
        console.log('selected')
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
