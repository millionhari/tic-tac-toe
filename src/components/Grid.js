import React from 'react';
import reducer from '../reducer';

class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: this.createBoardData(3)
    };
  }
  createBoardData(size) {
    let initialState = {};
    let action = {type: 'CREATE_BOARD', size: size};
    // let state = actions.reduce(reducer, initialState);
    let state = reducer(initialState, action);
    return state;
  }

  componentDidUpdate(prevProps, state) {
    console.log(state.board);
  }

  _stringToArrayOfInt(coordinates) {
    return coordinates.split(',').map(tickPoints => parseInt(tickPoints));
  }

  tickBox(state, event) {
    let clickedBox = this._stringToArrayOfInt(event.target.getAttribute('data-key'));
    let [tick, xAxis, yAxis] = ['x', clickedBox[0], clickedBox[1]];
    const addTickAction = { type: 'ADD_TICK', tick: [xAxis, yAxis, tick] };
    this.setState({board: reducer(state, addTickAction)});
  }

  createBoardComponents(board) {
    let rowNode = [];
    let boardNode = [];
    for (let row in board){
      rowNode.push(board[row].map((tick, column) =>
        <td key={[column, row]}
        data-key={[column, row]}
        onClick={this.tickBox.bind(this, board)}
        className='tick'>{row, column}</td>
      ));
    }
    rowNode.forEach((row, index) => boardNode.push(<tr key={index}>{row}</tr>));
    return <table><tbody>{boardNode}</tbody></table>
  }

  render() {
    return (
      <div className='grid'>
          {this.createBoardComponents(this.state.board)}
      </div>
    );
  }
}

export default Grid;
