function moveUp() {
  store.dispatch(MOVE_UP())
}

function moveDown() {
  store.dispatch(MOVE_DOWN())
}

function selectItem(index) {
  store.dispatch(SELECTED_ITEM(index))
}

function unSelectItem() {
  store.dispatch(UNSELECTED_ITEM())
}
