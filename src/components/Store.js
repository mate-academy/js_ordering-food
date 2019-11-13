import { createStore } from 'redux'; 

let initialState = {
  foodList: ['Apple', 'Bread', 'Carrot', 'Dumplings', 'Eggs', 'Fish', 'Garlic', 'Honey', 'Ice cream', 'Jam'], 
  currentIndex: -1
}

//action types
const TYPE_CLICK = 'click on food'; 
const TYPE_UP = 'up'; 
const TYPE_DOWN = 'down'; 

//action creators
export const clickOnFood = (currentIndex) => ({ type: TYPE_CLICK, currentIndex });
export const clickUp = () => ({ type: TYPE_UP }); 
export const clickDown = () => ({ type: TYPE_DOWN }); 

//selectors
export const getIndex = state => state.currentIndex; 
export const getFoodList = state => state.foodList; 

let changeFoodPosition = (index, pos, list) => {
  let food = [...list]; 
  if (pos === 'up') {
    food[index] = list[index - 1]; 
    food[index - 1] = list[index]; 
  } else if (pos === 'down') {
    food[index] = list[index + 1]; 
    food[index + 1] = list[index]; 
  }

  return food; 
}

let reducer = (state, action) => {
  switch(action.type) {
    case TYPE_CLICK: 
      return { 
        ...state, 
        currentIndex: action.currentIndex
      }
    case TYPE_UP: 
      if (state.currentIndex === 0) {
        return state;  
      } 

      return {
        currentIndex: state.currentIndex - 1,
        foodList: changeFoodPosition(state.currentIndex, 'up', state.foodList)
      }
    case TYPE_DOWN: 
      if (state.currentIndex === state.foodList.length - 1) {
        return state;  
      } 

      return {
        currentIndex: state.currentIndex + 1,
        foodList: changeFoodPosition(state.currentIndex, 'down', state.foodList)
      }
    default: 
      return state; 
  }
}

let store = createStore(reducer, initialState);
export default store;

