const initialState = {
  foodList: [
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
  index: -1,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'currentFood': 
      return {
      ...state,
      index: action.index,
    };
    case 'unselect': 
      return {
        ...state,
        index: -1,
      }
    case 'upButton': 
      const newFoodList = [...state.foodList];
      newFoodList[state.index] = newFoodList[state.index + 1];
      newFoodList[state.index + 1] = state.foodList[state.index];
      return {
        index: state.index + 1,
        foodList: newFoodList,
      };
    case 'downButton':
      const newFoodList1 = [...state.foodList];
      newFoodList1[state.index] = newFoodList1[state.index - 1];
      newFoodList1[state.index - 1] = state.foodList[state.index];
      return {
        index: state.index - 1,
        foodList: newFoodList1,
      };
    default:
      return state;
  }
};

function render(state) {
  const ul = document.createElement('ul');
  ul.style.width = 'min-content';
  for (let i = 0; i < state.foodList.length; i++) {
    const li = document.createElement('li');
    li.innerText = state.foodList[i];
    if (i === state.index) {
      li.style.color = 'red';
    }
    li.addEventListener('click', () => store.dispatch({
      type: 'currentFood',
      index: i
    }));
    ul.append(li);
  }
  document.body.innerHTML = '';
  document.body.append(ul);
  if (state.index > 0) {
    const up = document.createElement('button');
    up.innerText = 'Move Up'
    up.addEventListener('click', () => store.dispatch({
      type: 'downButton',
    }))
    console.log(state.index);
    document.body.append(up);
  }
  if (state.index < (state.foodList.length - 1) && state.index !== -1) {
    const down = document.createElement('button');
    down.innerText = 'Move Down'
    down.addEventListener('click', () => store.dispatch({
      type: 'upButton',
    }))
    document.body.append(down);
  }
};


const store = Redux.createStore(reducer, initialState);
render(store.getState(), store.dispatch);
store.subscribe(() => render(store.getState(), store.dispatch));