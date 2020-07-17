const initialState = {
  items: ['Apple', 'Bread', 'Carrot', 'Dumplings', 'Eggs', 'Fish', 'Garlic', 'Honey', 'Ice creame', 'Jam'],
  index: null,

}

function itemUp(index) {
  return {
    type: 'item_up',
    index
  }
}

function itemDown (index) {
  return {
    type: 'item_down',
    index
  }
}

function selectedItem (index) {
  return {
    type: 'selected_item',
    index
  }
}

function getNextState(state = initialState, action) {
  switch(action.type) {
    case 'item_up':
      const newArr1 = [...state.items];
        [newArr1[state.index-1], newArr1[state.index]] = [newArr1[state.index], newArr1[state.index-1]];
      return {
        ...state,
        items: newArr1,
        index: state.index - action.index
      };
    case 'item_down':
      const newArr2 = [...state.items];
        [newArr2[state.index], newArr2[state.index +1 ]] = [newArr2[state.index +1], newArr2[state.index]];
      return {
        ...state,
        items: newArr2,
        index: state.index - action.index
      };
    case 'selected_item':
      return {
        ...state,
        index: action.index
      };
    default:
      return state;
  }
}

store = Redux.createStore(getNextState);

document.querySelector('.button-up').addEventListener('click', (event) => {
  const state = store.getState();
  if (state.index !== 0) {
    store.dispatch(itemUp(+1))
  }
})

document.querySelector('.button-down').addEventListener('click', (event) => {
  const state = store.getState();
  if (state.index !== state.items.length -1 && state.index !== null) {
    store.dispatch(itemDown(-1))
  }
})

document.querySelector('.list').addEventListener('click', (event) => {
    const state = store.getState();
    store.dispatch(selectedItem(state.items.indexOf(event.target.textContent)))
})

document.body.addEventListener('click', (event) => {
  if (event.target.nodeName!=="LI" && event.target.nodeName!=="BUTTON") {
    store.dispatch(selectedItem(null))
  }
})

function buttonsActive() {
  const buttonUp = document.querySelector('.button-up');
  const buttonDown = document.querySelector('.button-down');
  const state = store.getState();

  if(state.index > 0 && state.index < state.items.length - 1) {
    document.querySelectorAll('button').forEach(item => item.disabled = false);
    } else if(state.index === 0) {
      buttonUp.disabled = true;
      buttonDown.disabled = false;
    } else if(state.index === state.items.length - 1)  {
      buttonDown.disabled = true;
      buttonUp.disabled = false;
    } else {
      buttonDown.disabled = true;
      buttonUp.disabled = true;
    }

  if (!buttonUp.disabled) {
    buttonUp.classList.add('active')
  } else {
    buttonUp.classList.remove('active')
  }

  if (!buttonDown.disabled) {
    buttonDown.classList.add('active')
  } else {
    buttonDown.classList.remove('active')
  }
}


function render() {
  const state = store.getState();
  const list = document.querySelector('.list');
  list.innerHTML = '';
  for (const item of state.items) {
    const listItem = document.createElement('li');
    listItem.textContent = item;
    if(state.items.indexOf(listItem.textContent) === state.index && state.index !== null) {
      listItem.className = 'active';
    }
    list.append(listItem)
  }
}

store.subscribe(() => {
  render()
  buttonsActive()
})
render()
buttonsActive()
