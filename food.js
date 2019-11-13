'use strict';

const initialState = {
    foods: [
        'Apple',
        'Bread',
        'Carrot',
        'Dumplings',
        'Eggs',
        'Fish',
        'Garlic',
        'Honey',
        'Ice cream',
        'Jam'],
    selectedItem: -1,
};

const selectItem = (selectedItem) => ({ type: 'SELECT', selectedItem });
const moveUp = () => ({ type: 'MOVE_UP' });
const moveDown = () => ({ type: 'MOVE_DOWN' });
const unselectItem = () => ({ type: 'UNSELECT' });

function reducer(state = initialState, action) {
    switch(action.type) {
        case 'SELECT':
            return {
                ...state,
                selectedItem: action.selectedItem
            };
        case 'MOVE_UP':
            return {
                ...state,
                foods: state.foods.map((item, selectedItem) => {
                    const prevItem = state.foods[state.selectedItem - 1];

                    if (selectedItem === state.selectedItem - 1) {
                        return state.foods[state.selectedItem];
                    }
                    if (selectedItem === state.selectedItem) {
                        return prevItem;
                    }

                    return item;
                }),
                selectedItem: state.selectedItem - 1
            };
        case 'MOVE_DOWN':
            return {
                ...state,
                foods: state.foods.map((item, selectedItem) => {
                    const currentItem = state.foods[state.selectedItem];
                    if (selectedItem === state.selectedItem) {
                        return state.foods[state.selectedItem + 1];
                    }
                    if (selectedItem === state.selectedItem + 1) {
                        return currentItem;
                    }

                    return item;
                }),
                selectedItem: state.selectedItem + 1
            };
        case 'UNSELECT':
            return {
                ...state,
                selectedItem: -1
            };
        default:
            return state;
    }
}

const store = Redux.createStore(reducer, initialState);
const container = document.querySelector('#food-list');
const buttonUp = document.querySelector('#move-up');
const buttonDown = document.querySelector('#move-down');

function render() {
    const lastIndex = store.getState().foods.length - 1;
    const stateIndex = store.getState().selectedItem;
    container.innerHTML = '';

    store.getState().foods.forEach((item, selectedItem) => {
        const li = document.createElement('li');
        li.innerHTML = `<div class="${item}"></div>${item}`;
        li.addEventListener('click', () => {
            store.dispatch(selectItem(selectedItem));
        });

        container.append(li);
    });

    if (stateIndex >= 0 && stateIndex !== -1) {
        container.childNodes[stateIndex].classList.add('active');
    }

    if (stateIndex === 0) {
        buttonUp.setAttribute('disabled', 'disabled');
        buttonDown.removeAttribute('disabled');
    } else if (stateIndex === lastIndex) {
        buttonDown.setAttribute('disabled', 'disabled');
        buttonUp.removeAttribute('disabled');
    } else if (stateIndex === -1) {
        buttonUp.setAttribute('disabled', 'disabled');
        buttonDown.setAttribute('disabled', 'disabled');
    } else {
        buttonUp.removeAttribute('disabled');
        buttonDown.removeAttribute('disabled');
    }
}

document.addEventListener('click', (event) => {
    if (!event.target.closest('button') && !event.target.closest('li')) {
        store.dispatch(unselectItem());
    }
});

buttonUp.addEventListener('click', () => {
    store.dispatch(moveUp());
});

buttonDown.addEventListener('click', () => {
    store.dispatch(moveDown());
});

store.subscribe(() => {
    render();
});

render();
