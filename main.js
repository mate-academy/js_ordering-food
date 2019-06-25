const MOVE_UP = "move_up";
const MOVE_DOWN = "move_down";
const SELECT_ELEMENT = "select_element";
const CANCEL_SELECT_ELEMENT = "CANCEL_SELECTELEMENT";

let initialState = {
  foods: [
    "Apple",
    "Bread",
    "Carrot",
    "Dumplings",
    "Eggs",
    "Fish",
    "Garlic",
    "Honey",
    "Ice Cream",
    "Jam"
  ],
  activeUpButton: false,
  activeDownButton: false,
  selectedIndex: null
};

function controlElement(state = initialState, action) {
  const { foods, selectedIndex } = state;
  let newFoodList = [...foods];
  switch (action.type) {
    case MOVE_UP:
      [newFoodList[selectedIndex], newFoodList[selectedIndex - 1]] = [
        newFoodList[selectedIndex - 1],
        newFoodList[selectedIndex]
      ];
      return {
        foods: newFoodList,
        selectedIndex: selectedIndex - 1
      };

    case MOVE_DOWN:
      [newFoodList[selectedIndex + 1], newFoodList[selectedIndex]] = [
        newFoodList[selectedIndex],
        newFoodList[selectedIndex + 1]
      ];
      return {
        foods: newFoodList,
        selectedIndex: selectedIndex + 1
      };

    case SELECT_ELEMENT:
      if (selectedIndex === action.index) {
        return {
          ...state,
          selectedIndex: null
        };
      }
      return {
        ...state,
        selectedIndex: action.index
      };

    case CANCEL_SELECT_ELEMENT:
      return {
        ...state,
        selectedIndex: null
      };

    default:
      return state;
  }
}

function render() {
  const foodCourt = document.getElementById("foodCourt");
  foodCourt.innerHTML = "";

  const { foods, selectedIndex } = store.getState();
  
  document.getElementById("up").disabled =
    selectedIndex === null || selectedIndex === 0;

  document.getElementById("down").disabled =
    selectedIndex === null || selectedIndex === foods.length - 1;

  for (let i = 0; i < foods.length; i++) {
    const newLi = document.createElement("li");
    newLi.innerHTML = foods[i];
    newLi.addEventListener("click", event => {
      event.stopPropagation();
      store.dispatch({
        type: SELECT_ELEMENT,
        index: i
      });
    });
    foodCourt.append(newLi);
  }
}

const store = Redux.createStore(controlElement);

document.getElementById("up").addEventListener("click", () => {
  store.dispatch({
    type: MOVE_UP
  });
  event.stopPropagation();
});

document.getElementById("down").addEventListener("click", () => {
  store.dispatch({
    type: MOVE_DOWN
  });
  event.stopPropagation();
});

document.addEventListener("click", () => {
  store.dispatch({
    type: CANCEL_SELECT_ELEMENT
  });
});

store.subscribe(() => render());

render();
