function reducer(state = initialState, action) {
  switch (action.type) {
    case MOVE_UP:
      return {
        ...state,
        items: state.items.map((item, index) => {
          const prevItem = state.items[state.selectedItem - 1];

          if (index === state.selectedItem - 1) {
            return state.items[state.selectedItem];
          }
          if (index === state.selectedItem) {
            return prevItem;
          }

          return item;
        }),
        selectedItem: state.selectedItem - 1
      };
    case MOVE_DOWN:
      return {
        ...state,
        items: state.items.map((item, index) => {
          const nextItem = state.items[state.selectedItem + 1];

          if (index === state.selectedItem + 1) {
            return state.items[state.selectedItem];
          }
          if (index === state.selectedItem) {
            return nextItem;
          }

          return item;
        }),
        selectedItem: state.selectedItem + 1
      };
    case SELECT:
      return {
        ...state,
        selectedItem: action.index,
      };
    case UNSELECT:
      return {
        ...state,
        selectedItem: -1,
      };
    default:
      return state;
  }
}

const store = Redux.createStore(reducer, initialState);
