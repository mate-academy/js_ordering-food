const store = Redux.createStore(reducer);

function render() {
  const state = store.getState()
  const container = document.querySelector('.container')

  container.innerHTML = `
  <ul class="list">
    ${state.fruits.map((item, index) => `<li onclick="selectItem(${index})" class="list__item ${state.selectedItem === index ? 'active' : ''}">${item}</li>`).join('')}
  </ul>  
    <button ${state.selectedItem === null || state.selectedItem === 0 ? `disabled` : ''}
      onclick="moveUp()"
      class="ui labeled icon button"
    >
      <i class="angle double up icon">
      </i>
        UP
    </button>

    <button ${state.selectedItem === null || state.selectedItem === state.fruits.length - 1 ? `disabled` : ''}
      onclick="moveDown()"class="ui right labeled icon button"><i class="angle double down icon"></i> DOWN </button>
  `
}

render()
store.subscribe(render)