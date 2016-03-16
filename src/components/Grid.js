import React from 'react';
import reducer from '../reducer';
import TickBox from './TickBox';
import WinScreen from './WinScreen';
import TieScreen from './TieScreen';

class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.createBoardData(3);
  }
  createBoardData(size) {
    const initialState = {};
    const action = {type: 'CREATE_BOARD', size: size};
    const state = reducer(initialState, action);
    return state;
  }

  restartState() {
    const freshState = this.createBoardData(3);
    this.setState(freshState);
  }

  componentWillUpdate(prevProps, state) {
    const actions = [
      {type: 'CHECK_COLUMN', column:state.lastTick.xAxis, tick: state.lastTick.tick},
      {type: 'CHECK_ROW', row:state.lastTick.yAxis, tick: state.lastTick.tick},
      {type: 'CHECK_DIAGONAL_RIGHT', tick: state.lastTick.tick},
      {type: 'CHECK_DIAGONAL_LEFT', tick: state.lastTick.tick}
    ];
    let win = actions.reduce(reducer, state);
    if (win === true){
      state.win = <WinScreen winState={win} winner={state.lastTick.tick} restartState={this.restartState.bind(this)}/>
      return;
    }
    if (state.lastTick.numberOfTicks === Math.pow(state.board[0].length,2)){
      state.win = <TieScreen restartState={this.restartState.bind(this)}/>
    }
  }

  _stringToArrayOfInt(coordinates) {
    return coordinates.split(',').map(tickPoints => parseInt(tickPoints));
  }

  tickBox(state, event) {
    const clickedBox = this._stringToArrayOfInt(event.target.getAttribute('data-key'));
    const [tick, xAxis, yAxis] = ['x', clickedBox[0], clickedBox[1]];
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
        className='tick'><TickBox tick={tick}/></td>
      ));
    }
    rowNode.forEach((row, index) => boardNode.push(<tr key={index}>{row}</tr>));
    return <table className='tic-tac-toe-board'><tbody>{boardNode}</tbody></table>
  }

  render() {
    return (
      <div>
        {this.state.win}
        <div className='grid-wrapper'>
          <div className='grid'>
              {this.createBoardComponents(this.state)}
          </div>
        </div>
      </div>
    );
  }
}

export default Grid;
