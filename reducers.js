const { SHOW_UP_BUTTON, SHOW_DOWN_BUTTON } = ButtonsStates;

function getNewButtonsStateByIndex(index, listSize) {
  const result = [];
  // debugger;
  if (index === null) {
    return result;
  }
  if (index !== listSize - 1) {
    result.push(SHOW_DOWN_BUTTON);
  }
  if (index !== 0) {
    result.push(SHOW_UP_BUTTON)
  }
  return result;
}

function foodManipulator(state, action) {
  const { type, index } = action;
  const { currentOrderOfFood, selectedIndex } = state;

  switch (type) {
    case SET_BUTTONS_STATE:
      if (index !== null && index !== selectedIndex) {
        return {
          ...state,
          selectedIndex: index,
          buttonsState: getNewButtonsStateByIndex(index, currentOrderOfFood.length)
        }
      } else {
        return {
          ...state,
          selectedIndex: null,
          buttonsState: getNewButtonsStateByIndex(null, currentOrderOfFood.length)
        }
      }
    case MOVE_UP_FOOD:
      return {
        ...state,
        currentOrderOfFood: currentOrderOfFood.map((foodId, currentIndex, food) => {
          // debugger;
          if (currentIndex === selectedIndex) {
            return food[selectedIndex - 1]
          }
          if (currentIndex === selectedIndex - 1) {
            return food[selectedIndex]
          }
          return foodId;
        }),
        selectedIndex: selectedIndex - 1,
        buttonsState: getNewButtonsStateByIndex(
          selectedIndex - 1, currentOrderOfFood.length
        )
      };
    case MOVE_DOWN_FOOD:
      return {
        ...state,
        currentOrderOfFood: currentOrderOfFood.map((foodId, currentIndex, food) => {
          if (currentIndex === selectedIndex) {
            return food[currentIndex + 1]
          }
          if (currentIndex === selectedIndex + 1) {
            return food[selectedIndex]
          }
          return foodId;
        }),
        selectedIndex: selectedIndex + 1,
        buttonsState: getNewButtonsStateByIndex(
          selectedIndex + 1, currentOrderOfFood.length
        )
      };
    default:
      return state;
  }
}

