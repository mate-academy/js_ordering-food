import { createStore } from 'redux';
import reducer from '../redux/reducer';

const initialState = {
  fruits: [
    'Apple',
    'Bread',
    'Carrot',
    'Dumplings',
    'Eggs',
    'Fish',
    'Garlic',
    'Honey',
    'Ice cream',
    'Jam'
  ],
  selectedItem: null,
}

export const store = createStore(reducer, initialState);
