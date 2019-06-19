const createElement = (className = '', content = '', tag = 'div') => {
  const element = document.createElement(tag);

  element.classList.add(...className.split(' '));

  if (typeof content === 'string') {
    element.textContent = content;
  } else if (Array.isArray(content)) {
    element.append(...content);
  } else {
    element.appendChild(content);
  }

  return element;
};

const createBtn = (direction, isDisabled, dispatch, action) => {
  const btn = createElement('button button--up', `Move ${direction}`, 'button');
  isDisabled
    ? btn.setAttribute('disabled', 'disabled')
    : btn.removeAttribute('disabled');
  btn.addEventListener('click', event => {
    event.stopPropagation();

    dispatch(action);
  });
  return btn;
};

export {createElement, createBtn};
