const MOVE_UP = 'up'
const MOVE_DOWN = 'down'
const SELECT = 'select'

const initialState = {
  items: [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
  ],

  selected: -1,
}

const action = (operation, element=null) => {
  
  return {
    type: operation,
    select: element,
  }
}

const reducer = (state, action) => {

  const interimState = [...state.items];

    switch (action.type) {

      case MOVE_DOWN:
        
        if(state.selected !== -1) {
          interimState.splice(state.selected-1, 2, state.items[state.selected], state.items[state.selected-1])
        }

        return interimState;
  
      case MOVE_UP:
        
        if(state.selected !== -1) {
          interimState.splice(state.selected, 2, state.items[state.selected+1], state.items[state.selected])
        }

        return interimState;
  
      case SELECT:
        initialState.selected = interimState.findIndex(subjectOfSearch => subjectOfSearch === action.select)
  
        return interimState;
    
      default:
        return interimState;
    }
}

let newState = reducer(initialState, action(SELECT, '5'));
newState = reducer(initialState, action(MOVE_DOWN));

