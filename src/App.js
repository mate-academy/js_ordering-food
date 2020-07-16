import React from 'react';
import './App.css';
import { connect } from 'react-redux'
import FoodList from './components/FoodList/FoodList';
import { moveDown, moveUp} from './redux/actions';
import { Button } from 'semantic-ui-react';

function App({ moveUp, moveDown, fruits, selectedItem }) {
  return (
    <>
      <FoodList />
      <Button
        className='button'
        onClick={ moveUp } disabled={selectedItem === 0 || selectedItem === null}>
        MOVE_UP
      </Button>
      <Button
        className='button'
        onClick={ moveDown }
        disabled={selectedItem === fruits.length - 1 || selectedItem === null}>
        MOVE_DOWN
      </Button>
    </>
  );
}

function mapState2Props(state) {
  return {
    fruits: state.fruits,
    selectedItem: state.selectedItem
  };
}


function mapDispatch2Props(dispatch) {
  return {
    moveUp: () => dispatch(moveUp()),
    moveDown: () => dispatch(moveDown()),
  }
}

export default connect(mapState2Props, mapDispatch2Props)(App);
