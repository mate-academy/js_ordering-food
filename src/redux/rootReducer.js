
const ItemUp = "MOVE_ITEM_UP";
const ItemDown = "MOVE_ITEM_DOWN";
const Select = "SELECT";
const unSelected = "UNSELECTED"

const initialState = { food: [
  { name: "Apple", id: 0, position: 0, selected: false, },
  { name: "Bread", id: 1, position: 1, selected: false, },
  { name: "Carrot", id: 2, position: 2, selected: false, },
  { name: "Dumplings", id: 3, position: 3, selected: false, },
  { name: "Eggs", id: 4, position: 4, selected: false, },
  { name: "Fish", id: 5, position: 5, selected: false, },
  { name: "Garlic", id: 6, position: 6, selected: false, },
  { name: "Honey", id: 7, position: 7, selected: false, },
  { name: "Ice cream", id: 8, position: 8, selected: false, },
  { name: "Jam", id: 9, position: 9, selected: false, },
], };

function rootReducer (state = initialState, action) {
    switch (action.type) {

    case ItemUp:
      const upItems = [...state.food];
      const infoForButton = {...state.infoForButton};
      state.food.forEach( (item, index) => {
        if(item.selected && index !== 0) {
          upItems[index-1] = upItems.splice(index, 1, upItems[index-1])[0];
        }
      });
      return {
        food: [...upItems],
        infoForButton: {...infoForButton}, 
      };

    case ItemDown:
      const downItems = [...state.food];
      for (let index = 9; index >= 0; index--) {
        let item = state.food[index];
        if (item.selected && index !== 9) {
          downItems[index+1] = downItems.splice(index, 1, downItems[index+1])[0];
        }
      };
      return {
        food: [...downItems],
      };

    case Select:
      return {
        food: [...state.food].map( item => {
          if(item.id === action.payload) {
            item.selected = !item.selected;
          }
          return item;
        } )
      };

    case unSelected:
      return {
        food: [...state.food].map( item => {
          return {...item, selected: false};
        } )
      };

    default:
      return state;
  }
}

export default rootReducer;