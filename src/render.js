import { createElement, createBtn } from './utils.js';
import { clearSelection, moveSelectionDown, moveSelectionUp, selectItem } from './actions.js';

const renderButtons = (state, dispatch) => {
  const { selectedIndex, foodList } = state;

  const isUpDisabled = selectedIndex === null || selectedIndex === 0;
  const upButton = createBtn('Up', isUpDisabled, dispatch, moveSelectionUp());

  const isDownDisabled = selectedIndex === null || selectedIndex === (foodList.length - 1);
  const downButton = createBtn('Down', isDownDisabled, dispatch, moveSelectionDown());

  return createElement('buttons', [upButton, downButton]);
};

const renderList = (state, dispatch) => {
  const { selectedIndex, foodList } = state;
  const list = foodList.map((item, index) => {
    const isSelected = selectedIndex === index;
    const foodItem = createElement(
      `food-item${isSelected ? ' is-selected' : ''}`,
      `${item}`,
      'li',
    );

    foodItem.addEventListener('click', (event) => {
      event.stopPropagation();

      dispatch(
        isSelected
          ? clearSelection()
          : selectItem(index),
      );
    });

    return foodItem;
  });

  return createElement('food', list, 'ul');
};

export {renderButtons, renderList};
