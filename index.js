const { createStore } = Redux;

const foodList = [
  { name: "Apple", emoji: "🍎" },
  { name: "Bread", emoji: "🍞" },
  { name: "Carrot", emoji: "🥕" },
  { name: "Dumplings", emoji: "🥟" },
  { name: "Eggs", emoji: "🥚" },
  { name: "Fish", emoji: "🐟" },
  { name: "Garlic", emoji: "&#xF9C4" },
  { name: "Honey", emoji: "🍯" },
  { name: "Ice cream", emoji: "🍨" },
  { name: "Jam", emoji: "🥞" }
];
const initialFoodBox = initStore(foodList);

function initStore(foodList) {
  const food = foodList.reduce(
    (acc, food, index) => ({ ...acc, [index]: food }),
    {}
  );
  const currentOrderOfFood = Object.keys(food);

  return {
    selectedIndex: null,
    food,
    currentOrderOfFood,
    buttonsState: []
  }
}

const store = createStore(foodManipulator, initialFoodBox);

const foodContainer = document.getElementById("food-container");
const upButton = document.getElementById("move-up-button");
const downButton = document.getElementById("move-down-button");

const callbacksOnClickFor = new Map();
const initCallbacksOnClick = () => {
  Array.from(foodContainer.children).forEach(element =>
    callbacksOnClickFor.set(element, (piece) => {
      store.dispatch(handleSelection(parseInt(piece.dataset.index)));
    })
  );
  callbacksOnClickFor.set(upButton, () => {
    store.dispatch(moveUpFood(store.getState().selectedIndex));
  });
  callbacksOnClickFor.set(downButton, () => {
    store.dispatch(moveDownFood(store.getState().selectedIndex));
  });
};

const renderStore = () => {
  const { currentOrderOfFood, food, selectedIndex, buttonsState } = store.getState();
  currentOrderOfFood.forEach(
    (pieceId, index) => {
      const { name, emoji } = food[pieceId];
      const pieceHTMLElement = foodContainer.children[index];

      pieceHTMLElement.dataset.index = index.toString();
      if (selectedIndex === index) {
        pieceHTMLElement.classList.add("selected");
      } else {
        pieceHTMLElement.classList.remove("selected");
      }
      pieceHTMLElement.innerHTML = `<span>${emoji}</span>&nbsp;&blacktriangleright;&nbsp;${name}`;
    }
  );

  upButton.disabled = !buttonsState.includes(ButtonsStates.SHOW_UP_BUTTON);
  downButton.disabled = !buttonsState.includes(ButtonsStates.SHOW_DOWN_BUTTON);
};

const handleDocumentClick = event => {
  const { target } = event;

  if (callbacksOnClickFor.has(target)) {
    callbacksOnClickFor.get(target)(target);
  } else  if (callbacksOnClickFor.has(target.closest('button'))) {
    callbacksOnClickFor.get(target.closest('button'))(
      target.closest('button')
    );
  } else {
    store.dispatch(handleSelection(null));
  }
};

const unsubscribe = store.subscribe(() => {
  renderStore();
});

document.addEventListener('click', handleDocumentClick);
document.addEventListener('close', () => {
  unsubscribe();
});

for (let i = 0; i < foodList.length; i++) {
  foodContainer.appendChild(document.createElement('li'));
}
initCallbacksOnClick();
renderStore();
