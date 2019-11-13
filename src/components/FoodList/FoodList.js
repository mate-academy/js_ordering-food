import React, { useEffect } from 'react';
import { clickDown, clickUp, clickOnFood, getIndex, getFoodList } from '../Store'; 
import { connect } from 'react-redux';

const FoodList = ({ foodList, currentIndex, clickDown, clickUp, clickOnFood }) => {
  const cancelStyle = (e) => {
    if (e.target.nodeName === 'LI' || e.target.nodeName === 'BUTTON' || e.target.nodeName === 'DIV') {
      return 
    } else {clickOnFood(-1)}
  }

  useEffect(() => {
    document.addEventListener('click', (e) => cancelStyle(e)); 

    return () => {
      document.removeEventListener('click', cancelStyle); 
    }
  }, [])

  return (
    <div className="wrapper">
      <ul>
        {foodList
          .map((food, index) => 
            <li 
              key={index} 
              onClick={() => clickOnFood(index)}
              className={currentIndex === index ? 'select-item' : ""}
            >
              {food}
            </li>
          )}
      </ul>
      <div className='buttons-block'>
        <button 
          className="ui active button"
          onClick={clickUp}
          disabled={currentIndex === 0 ? true : false}
        >
          Up
        </button>
        <button 
          className="ui active button"
          attached='right'
          onClick={clickDown}
          disabled={currentIndex === foodList.length - 1 ? true: false}
        >
          Down
        </button>
      </div>
    </div>
  )
}

const getData = state => ({
  foodList: getFoodList(state),  
  currentIndex: getIndex(state)
}); 

const getMethod = dispatch => ({
  clickDown: () => dispatch(clickDown()), 
  clickUp: () => dispatch(clickUp()),
  clickOnFood: (index) => dispatch(clickOnFood(index))
}); 

export default connect(
  getData, 
  getMethod
)(FoodList);