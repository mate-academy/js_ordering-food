const ul = document.getElementById('ul');
const moveUpButton = document.getElementById('moveUp');
const moveDownButton = document.getElementById('moveDown');
const MOVE_UP = 'moveUp';
const MOVE_DOWN = 'MoveDown';
const CHOOSE_FOOD = 'chooseFood';
const REMOVE_CHOSEN_FOOD = 'removeChosenFood';
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
        'Jam'
    ],
    currentFoodIndex: null,
};

const actionMoveUp = () => {
    return {
        type: MOVE_UP
    }
};

const actionMoveDown = () => {
    return {
        type: MOVE_DOWN
    }
};

const actionChooseFood = payload => {
    return {
        type: CHOOSE_FOOD,
        payload ,
    }
};

const actionRemoveChosenFood = () => {
    return {
        type: REMOVE_CHOSEN_FOOD,
    }
};

function reducer(state = initialState, action) {
    let chosenFoodName;

    switch(action.type) {
        case CHOOSE_FOOD :
            return {
                foods: state.foods,
                currentFoodIndex: action.payload,
            };
        case MOVE_UP :
            chosenFoodName = state.foods.splice(state.currentFoodIndex, 1).join();
            state.foods.splice(state.currentFoodIndex - 1, 0, chosenFoodName);

            return {
                currentFoodIndex: state.foods.indexOf(chosenFoodName),
                foods: state.foods,
            };
        case MOVE_DOWN :
            chosenFoodName = state.foods.splice(state.currentFoodIndex, 1).join();
            state.foods.splice(state.currentFoodIndex + 1, 0, chosenFoodName);

            return {
                currentFoodIndex: state.foods.indexOf(chosenFoodName),
                foods: state.foods,
            };
        case REMOVE_CHOSEN_FOOD:
            return {
                foods: state.foods,
                currentFoodIndex: null,
            };
        default :
            return  state;
    }
}

function render() {
    const { currentFoodIndex, foods } = store.getState();
    const container = ul;

    while(container.firstChild) {
        ul.removeChild(container.firstChild);
    }

    foods.forEach((food, index) => {
        const span = document.createElement('span');
        const li = document.createElement('li');

        span.addEventListener('click', () => store.dispatch(actionChooseFood(index)));

        if (currentFoodIndex === index) {
            span.setAttribute('class', 'active');
        }

        span.textContent = food;

        li.appendChild(span);
        ul.appendChild(li)
    });

    const isCurrentFoodIndex = currentFoodIndex === null;

    moveUpButton.disabled = currentFoodIndex === 0 || isCurrentFoodIndex;
    moveDownButton.disabled = currentFoodIndex === 9 || isCurrentFoodIndex;
}

const store = Redux.createStore(reducer);

store.subscribe(() => {
    render();
});

moveUpButton.addEventListener('click', () => store.dispatch(actionMoveUp()));
moveDownButton.addEventListener('click', () => store.dispatch(actionMoveDown()));
document.addEventListener('load', render());
document.addEventListener('click', (event) => {
    if (event.target.nodeName !== 'SPAN'&& event.target.nodeName !== 'BUTTON') {
        store.dispatch(actionRemoveChosenFood());
    }
});
