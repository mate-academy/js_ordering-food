const initialState = {
  goods: [
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

  selected: null,
} 

const ACTIONS = {
  SELECT_INDEX: 'SELECT_INDEX',
  MOVE_UP: 'MOVE_UP',
  MOVE_DOWN: 'MOVE_DOWN',
  UNSELECT: 'UNSELCT'
};

function selectIndex(selected) {
  return {
    type: ACTIONS.SELECT_INDEX,
    payload: selected,
  };
}

function moveUp() {
  return {
    type: ACTIONS.MOVE_UP,
  };
}

function moveDown() {
  return {
    type: ACTIONS.MOVE_DOWN,
  };
}

function unselect() {
  return {
    type: ACTIONS.UNSELECT,
  };
}

function moveElement(list, index, shift) {
  const goodsList = [...list];
  [goodsList[index], goodsList[index + shift]] = [goodsList[index + shift], goodsList[index]];

  return goodsList;
}

const reducer = function(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.SELECT_INDEX:
      return {
        ...state,
        selected: action.payload,
      };

    case ACTIONS.MOVE_UP:
      if (state.selected === 0 || state.selected === null) {
        return state;
      }

      return {
        ...state,
        goods: moveElement(state.goods, state.selected, -1),
        selected: state.selected - 1,
      };

    case ACTIONS.MOVE_DOWN:
      if (state.selected === state.goods.length - 1 || state.selected === null) {
        return state;
      }

      return {
        ...state,
        goods: moveElement(state.goods, state.selected, 1),
        selected: state.selected + 1,
      };
      
    case ACTIONS.UNSELECT:
      return {
        ...state,
        selected: null,
      }  

    default: 
      return state;
  }
}

const store = Redux.createStore(reducer);

function getActiveItem(index) {
  store.dispatch(selectIndex(index));
}

function raiseItem() {
  store.dispatch(moveUp());
}

function lowItem() {
  store.dispatch(moveDown());
}

function render() {
  console.log('s')
  const state = store.getState();
  const container = document.querySelector('.container');

  container.innerHTML = `
    <ul class="listContainer">
      ${state.goods.map((item, index) => 
        `<li 
          class="${index === state.selected ? 'activeItem' : ''}"
          onclick="getActiveItem(${index})"
         >
          ${item}
         </li>`
      ).join('')}
    </ul>
    <button 
      class="ui blue basic button"
      onclick="raiseItem()" 
      ${state.selected === 0 || state.selected === null ? 'disabled' : ''}>Move Up
    </button>
    <button  
      class="ui violet basic button"
      onclick="lowItem()"
      ${state.selected === state.goods.length - 1 || state.selected === null ? 'disabled' : ''}>Move Down
    </button>
  `;
}

document.addEventListener('click', (event) => {
  if (!event.target.closest('li') && !event.target.closest('button')) {
    store.dispatch(unselect());
  }
});

render();
store.subscribe(render);