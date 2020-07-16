/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import './FoodList.css';
import { selectItem } from '../../redux/actions';
import { connect } from 'react-redux';

const FoodList = ({ fruits, selectItem, selectedItem }) => {

  const cancelStyle = (e) => {
    if (e.target.nodeName === 'LI' || e.target.closest('.button')) {
      return 
    } else {selectItem(null)}
  }

  useEffect(() => {
    document.addEventListener('click', cancelStyle); 

    return () => {
      document.removeEventListener('click', cancelStyle); 
    };
  }, [])

  return (
    <ul>
      {fruits.map((item, index) =>
        <li
          onClick={ () => selectItem(index) }
          key={item}
          className={selectedItem === index ? 'active' : ''}
        >
          {item}
        </li>)}
    </ul>
  );
};

function mapState2Props(state) {
  return {
    fruits: state.fruits,
    selectedItem: state.selectedItem
  };
}

function mapDispatch2Props(dispatch) {
  return {
    selectItem: (index) => dispatch(selectItem(index))
  };
}

export default connect(mapState2Props, mapDispatch2Props)(FoodList);
