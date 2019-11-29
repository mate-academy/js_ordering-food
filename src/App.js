import React from 'react';
import { connect } from "react-redux";
import './App.css';

class App extends React.Component {
  render() {
    const {food, onSelect, onDown, onUp} = this.props;
    return (
      <div className="App">
        {food.map(item => {
          return (
            <label
              className={`list-group-item ${item.selected ? "active" : ""}`}
              key={item.id}
            >
              {item.name} || {item.id} || {item.selected.toString()}
              <input
                hidden={true}
                onChange={() => onSelect(item.id)}
                type="checkbox"
                value={item.selected}
              ></input>
            </label>
          );
        })}
        <button
          className="btn btn-primary"
          disabled={food[0].selected}
          onClick={onUp}
        >
          onUp
        </button>
        <button
          className="btn btn-primary"
          disabled={food[9].selected}
          onClick={onDown}
        >
          onDown
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    food: state.food
  }
}

const ItemUp = "MOVE_ITEM_UP";
const ItemDown = "MOVE_ITEM_DOWN";
const Select = "SELECT"
const unSelected = "UNSELECTED"

function mapDispathToProps(dispath) {
  return {
    onUp: id => dispath({type: ItemUp, payload: id}),
    onDown: id => dispath({type: ItemDown, payload: id}),
    onSelect: number => dispath({type: Select, payload: number}),
    unSelected: () => dispath({type: unSelected}),
  }
}

export default connect(mapStateToProps, mapDispathToProps)(App);
