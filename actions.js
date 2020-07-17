export const select = (index) => ({
  type: SELECT,
  index,
})

export const moveUp = () => ({
  type: MOVE_UP,
})

export const moveDown = () => ({
  type: MOVE_DOWN,
})