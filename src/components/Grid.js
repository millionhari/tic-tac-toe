import React from 'react';
import reducer from '../reducer';
import TickBox from './TickBox';
import WinBox from './WinBox';

class Grid extends React.Component {
  constructor(props) {
    super(props);
    let nGrid = parseInt(prompt('Please enter a number for the NxN board do you want to play with'));
    while (isNaN(nGrid)){
      nGrid = parseInt(prompt('Please enter a valid number'));
    }
    this.state = this.createBoardData(nGrid);
  }

  createBoardData(size) {
    const initialState = {};
    const action = {type: 'CREATE_BOARD', size: size};
    const state = reducer(initialState, action);
    return state;
  }

  restartState() {
    const freshState = this.createBoardData(this.state.board[0].length);
    this.setState(freshState);
  }

  checkWin(state) {
    const actions = [
      {type: 'CHECK_COLUMN', column:state.lastTick.xAxis, tick: state.lastTick.tick},
      {type: 'CHECK_ROW', row:state.lastTick.yAxis, tick: state.lastTick.tick},
      {type: 'CHECK_DIAGONAL_RIGHT', tick: state.lastTick.tick},
      {type: 'CHECK_DIAGONAL_LEFT', tick: state.lastTick.tick}
    ];
    let win = actions.reduce(reducer, state);
    if (win === true){
      state.winner = state.lastTick.tick;
      return;
    }
    if (state.lastTick.numberOfTicks === Math.pow(state.board[0].length,2)){
      state.winner = 'TIE';
    }
  }

  componentWillUpdate(prevProps, state) {
    this.checkWin(state);
  }

  _stringToArrayOfInt(coordinates) {
    return coordinates.split(',').map(tickPoints => parseInt(tickPoints));
  }

  tickBox(state, event) {
    if (!state.winner){
      const clickedBox = this._stringToArrayOfInt(event.target.getAttribute('data-key'));
      const [tick, xAxis, yAxis] = ['x', clickedBox[0], clickedBox[1]];
      const addTickAction = { type: 'ADD_TICK', tick: [xAxis, yAxis, tick] };
      const nextState = reducer(state, addTickAction);
      this.setState(nextState);
    }
  }

  createBoardComponents(state) {
    let rowNode = [];
    let boardNode = [];
    for (let row in state.board){
      rowNode.push(state.board[row].map((tick, column) =>
        <td key={[row, column]}
        data-key={[row, column]}
        onClick={this.tickBox.bind(this, state)}
        className='tick'><TickBox tick={tick}/></td>
      ));
    }
    rowNode.forEach((row, index) => boardNode.push(<tr key={index}>{row}</tr>));
    return <table className='tic-tac-toe-board'><tbody>{boardNode}</tbody></table>
  }

  render() {
    return (
      <div>
        <div className='grid-wrapper'>
          <div className='grid'>
              {this.createBoardComponents(this.state)}
          </div>
        </div>
        <WinBox restart={this.restartState.bind(this)} winner={this.state.winner}/>
      </div>
    );
  }
}

export default Grid;
