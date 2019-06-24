import {
    UP_MOVE,
    DOWN_MOVE,
    FOOD_CHOOSE,
    CHOSEN_FOOD_REMOVE,
} from './constants.js';

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

export function reducer(state = initialState, action) {
    let chosenFoodName;
    let copyFoods;

    switch (action.type) {
        case FOOD_CHOOSE :
            return {
                ...state,
                currentFoodIndex: action.payload,
            };
        case UP_MOVE :
            copyFoods = state.foods.slice();
            chosenFoodName = copyFoods.splice(state.currentFoodIndex, 1).join();
            copyFoods.splice(state.currentFoodIndex - 1, 0, chosenFoodName);

            return {
                currentFoodIndex: state.currentFoodIndex - 1,
                foods: copyFoods,
            };
        case DOWN_MOVE :
            copyFoods = state.foods.slice();
            chosenFoodName = copyFoods.splice(state.currentFoodIndex, 1).join();
            copyFoods.splice(state.currentFoodIndex + 1, 0, chosenFoodName);
            return {
                currentFoodIndex: state.currentFoodIndex + 1,
                foods: copyFoods,
            };
        case CHOSEN_FOOD_REMOVE:
            return {
                ...state,
                currentFoodIndex: null,
            };
        default :
            return state;
    }
}
