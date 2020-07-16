import {
    UP_MOVE,
    DOWN_MOVE,
    FOOD_CHOOSE,
    CHOSEN_FOOD_REMOVE,
} from './constants.js';

export const moveUp = () => {
    return {
        type: UP_MOVE
    };
};

export const moveDown = () => {
    return {
        type: DOWN_MOVE
    };
};

export const foodChoose = foodIndex => {
    return {
        type: FOOD_CHOOSE,
        payload: foodIndex,
    };
};

export const chosenFoodRemove = () => {
    return {
        type: CHOSEN_FOOD_REMOVE,
    };
};
