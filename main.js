const ul = document.getElementById('ul');
const moveUpButton = document.getElementById('moveUp');
const moveDownButton = document.getElementById('moveDown');
let InitialState = {
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
    currentFoodName: null,
    currentFoodIndex: null,
    isDisabledMoveUp: true,
    isDisableMoveDown: true,
};

const actionMoveUp = {
    type: 'moveUp'
};

const actionMoveDown = {
    type: 'MoveDown'
};

const actionChooseFood = (chosenFoodName) => {
    return {
        type: 'chooseFood',
        chosenFoodName,
    }
};

const actionRemoveChosenFood = () => {
    return {
        type: 'removeChosenFood',
    }
};

function getNextState(state = InitialState, action) {
    let newState;
    let chosenFoodName;

    switch(action.type) {
        case 'chooseFood' :
            newState = {
                foods: state.foods,
                currentFoodName: action.chosenFoodName,
                currentFoodIndex: state.foods.indexOf(action.chosenFoodName),
                isDisabledMoveUp: state.foods.indexOf(action.chosenFoodName) === 0,
                isDisableMoveDown: state.foods.indexOf(action.chosenFoodName) === 9,
            };
            break;
        case 'moveUp' :
            chosenFoodName = state.foods.splice(state.currentFoodIndex, 1).join();
            state.foods.splice(state.currentFoodIndex - 1, 0, chosenFoodName);

            newState = {
                currentFoodName: chosenFoodName,
                currentFoodIndex: state.foods.indexOf(chosenFoodName),
                foods: state.foods,
                isDisabledMoveUp: state.foods.indexOf(state.currentFoodName) === 0,
                isDisableMoveDown: state.foods.indexOf(state.currentFoodName) === 9,
            };
            break;
        case 'MoveDown' :
            chosenFoodName = state.foods.splice(state.currentFoodIndex, 1).join();
            state.foods.splice(state.currentFoodIndex + 1, 0, chosenFoodName);

            newState = {
                currentFoodName: chosenFoodName,
                currentFoodIndex: state.foods.indexOf(chosenFoodName),
                foods: state.foods,
                isDisabledMoveUp: state.foods.indexOf(state.currentFoodName) === 0,
                isDisableMoveDown: state.foods.indexOf(state.currentFoodName) === 9,
            };
            break;
        case 'removeChosenFood':
            newState = {
                foods: state.foods,
                currentFoodName: null,
                currentFoodIndex: null,
                isDisabledMoveUp: true,
                isDisableMoveDown: true,
            };
            break;
        default :
            newState = state;
    }

    return newState;
}

function showFoods() {
    const activeItem = store.getState().currentFoodName;
    const container = ul;

    while(container.firstChild) {
        ul.removeChild(container.firstChild);
    }

    store.getState().foods.forEach(food => {
        const span = document.createElement('span');
        const li = document.createElement('li');

        if (activeItem === food) {
            span.setAttribute('class', 'active');
        }

        span.textContent = food;
        li.appendChild(span);
        ul.appendChild(li)
    });

    moveUpButton.disabled = store.getState().isDisabledMoveUp;
    moveDownButton.disabled = store.getState().isDisableMoveDown;
}

const store = Redux.createStore(getNextState);

store.subscribe(() => {
    showFoods();
});

document.addEventListener('load', showFoods());
ul.addEventListener('click', (event) => {
    if (event.target.nodeName === 'SPAN') {
        return store.dispatch(actionChooseFood(event.target.innerText));
    }

    store.dispatch(actionRemoveChosenFood());
});
moveUpButton.addEventListener('click', () => store.dispatch(actionMoveUp));
moveDownButton.addEventListener('click', () => store.dispatch(actionMoveDown));

moveUpButton.disabled = store.getState().isDisabledMoveUp;
moveDownButton.disabled = store.getState().isDisableMoveDown;
