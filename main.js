const MOVE_UP = "MOVE_UP";
const MOVE_DOWN = "MOVE_DOWN";
const SELECT = "SELECT";
const UNSELECT = "UNSELECT";
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
  selectedIndex: null,
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
        selectedIndex: selectedIndex - 1,};

    case MOVE_DOWN:
      [newFoodList[selectedIndex + 1], newFoodList[selectedIndex]] = [
        newFoodList[selectedIndex],
        newFoodList[selectedIndex + 1]
      ];
      return {
        foods: newFoodList,
        selectedIndex: selectedIndex + 1
      };

    case SELECT:
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

    case UNSELECT:
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
        type: SELECT,
        index: i
      });
      changeColor(store.getState().selectedIndex)
    });
    foodCourt.append(newLi);
  }
}

const store = Redux.createStore(controlElement);

function changeColor(index) {
  let changeColorItem = document.getElementsByTagName("li")[index];
  changeColorItem.classList.add('color');
}

document.getElementById("up").addEventListener("click", () => {
  store.dispatch({
    type: MOVE_UP
  });
  changeColor(store.getState().selectedIndex);
  event.stopPropagation();
});

document.getElementById("down").addEventListener("click", () => {
  store.dispatch({
    type: MOVE_DOWN
  });
  changeColor(store.getState().selectedIndex)
  event.stopPropagation();
});

document.addEventListener("click", () => {
  store.dispatch({
    type: UNSELECT
  });
});

store.subscribe(() => render());

render();
