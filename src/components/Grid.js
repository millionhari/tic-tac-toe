import React from 'react';
import reducer from '../reducer';

class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.createBoardData(3);
  }
  createBoardData(size) {
    let initialState = {};
    let action = {type: 'CREATE_BOARD', size: size};
    let state = reducer(initialState, action);
    return state;
  }

  componentWillUpdate(prevProps, state) {
    let actions = [
      {type: 'CHECK_COLUMN', column:state.lastTick.xAxis, tick: state.lastTick.tick},
      {type: 'CHECK_ROW', row:state.lastTick.yAxis, tick: state.lastTick.tick},
      {type: 'CHECK_DIAGONAL_RIGHT', tick: state.lastTick.tick},
      {type: 'CHECK_DIAGONAL_LEFT', tick: state.lastTick.tick}
    ];
    let win = actions.reduce(reducer, state);
    if (win === true){
      console.log(`${state.lastTick.tick} wins!`);
    }
  }

  _stringToArrayOfInt(coordinates) {
    return coordinates.split(',').map(tickPoints => parseInt(tickPoints));
  }

  tickBox(state, event) {
    let clickedBox = this._stringToArrayOfInt(event.target.getAttribute('data-key'));
    let [tick, xAxis, yAxis] = ['x', clickedBox[0], clickedBox[1]];
    const addTickAction = { type: 'ADD_TICK', tick: [xAxis, yAxis, tick] };
    const nextState = reducer(state, addTickAction);
    this.setState(nextState);
  }

  createBoardComponents(state) {
    let rowNode = [];
    let boardNode = [];
    for (let row in state.board){
      rowNode.push(state.board[row].map((tick, column) =>
        <td key={[row, column]}
        data-key={[row, column]}
        onClick={this.tickBox.bind(this, state)}
        className='tick'>{tick}</td>
      ));
    }
    rowNode.forEach((row, index) => boardNode.push(<tr key={index}>{row}</tr>));
    return <table><tbody>{boardNode}</tbody></table>
  }

  render() {
    return (
      <div className='grid'>
          {this.createBoardComponents(this.state)}
      </div>
    );
  }
}

export default Grid;
