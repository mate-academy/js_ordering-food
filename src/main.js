'use strict';

const orderingFood = document.getElementById('ordering-food');
const list = document.getElementById('list');
const foods = ['Apple', 'Bread', 'Carrot', 'Dumplings', 'Eggs', 'Fish', 'Garlic', 'Honey', 'Ice cream', 'Jam'];
let indexLi = null;

const showList = function (list, items) {
  items.map(item => list.insertAdjacentHTML('beforeend', `
    <li>${item}</li>
  `));
}
const addButtons = function() {
  orderingFood.insertAdjacentHTML('beforeend', `
    <button id="btn-up" disabled data-moove="up">Up</button>
    <button id="btn-down" disabled data-moove="down">Down</button>
  `);
}

function btnDisabler() {
  const btnUp = document.getElementById('btn-up');
  const btnDown = document.getElementById('btn-down');
  if (indexLi === 0) {
    btnUp.disabled = true;
  }
  if (indexLi !== 0) {
    btnUp.disabled = false;
  }
  if (indexLi === foods.length - 1) {
    btnDown.disabled = true;
  }
  if (indexLi !== foods.length - 1) {
    btnDown.disabled = false;
  }
  if (indexLi === null) {
    btnDown.disabled = true;
    btnUp.disabled = true;
  }
}

function moveLi(act) {
  const item = foods[indexLi];
  foods.splice(indexLi, 1);
  foods.splice(indexLi + act, 0, item);
  list.innerHTML = '';
  indexLi = indexLi + act;
  showList(list, foods);
  btnDisabler()
}

orderingFood.addEventListener('click', function () {
  if (event.target.tagName === 'LI') {
    indexLi = foods.findIndex(item => item === event.target.innerText);
    btnDisabler()
  }
  if (event.target.dataset.moove === 'down') {
    moveLi(1);
  }
  if (event.target.dataset.moove === 'up') {
    moveLi(-1);
  }
  if (event.target.tagName !== 'LI' && event.target.tagName !== 'BUTTON') {
    indexLi = null;
    btnDisabler();
  }

});

showList(list, foods);
addButtons();
