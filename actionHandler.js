const actionHandler = {
    [SELECT_ITEM]: (state, { payload: selectedIndex }) => {
      return {
        ...state,
        selectedIndex
      }
    },
  
    [CLEAR_SELECTION]: (state) => {
      return {
        ...state,
        selectedIndex: null
      }
    },
  
    [MOVE_SELECTION_UP]: (state) => {
      const { foodList, selectedIndex } = state;
      if (selectedIndex === 0) {
        return state;
      }
      const newFoodCour = [...foodList];
      const selectedFoodCore = newFoodCour.splice(selectedIndex, 1);
      newFoodCour.splice(selectedIndex - 1, 0, selectedFoodCore[0]);
      return {
        foodList: newFoodCour,
        selectedIndex: selectedIndex - 1
      };
    },
  
    [MOVE_SELECTION_DOWN]: (state) => {
      const { foodList, selectedIndex } = state;
      if (selectedIndex === foodList.length - 1) {
        return state;
      }
      const newFoodCour = [...foodList];
      const selectedFoodCore = newFoodCour.splice(selectedIndex, 1);
      newFoodCour.splice(selectedIndex + 1, 0, selectedFoodCore[0]);
      return {
        foodList: newFoodCour,
        selectedIndex: selectedIndex + 1
      };
    }
  };
  