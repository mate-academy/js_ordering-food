'use strict';

const MOVE_UP = 'foods_move_up';
const MOVE_DOWN = 'foods_move_down';
const SELECT_FOOD = 'foods_selected';
const CANCEL_SELECT_FOOD = 'foods_cancel_selected';


function getMoveUpAction(index) {
    return {
        type: MOVE_UP
    };
}

function getMoveDownAction(index) {
    return {
        type: MOVE_DOWN
    };
}

function getSelectAction(index) {
    return {
        type: SELECT_FOOD,
        index
    };
}

function getCancelSelectAction() {
    return {
        type: CANCEL_SELECT_FOOD,
    };
}
