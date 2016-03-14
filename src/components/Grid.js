import React from 'react';
import reducer from '../reducer';

class Grid extends React.Component {
  createBoardData(size) {
    let initialState = {};
    let action = {type: 'CREATE_BOARD', size: size}
    // let state = actions.reduce(reducer, initialState);
    let state = reducer(initialState, action);
    return state;
  }

  tickBox(event) {
    console.log(event.target);
  }

  createBoardComponents(board) {
    let rowArr = [];
    let boardArr = [];
    for (let row in board){
      rowArr.push(board[row].map((tick, column) =>
        <td key={[row, column]}
        data-key={[row,column]}
        onClick={this.tickBox.bind(this)}
        className="tick">{row, column}</td>
      ));
    }
    rowArr.forEach((row, index) => boardArr.push(<tr key={index}>{row}</tr>));
    console.log(boardArr);
    return <table><tbody>{boardArr}</tbody></table>
  }

  render() {
    let board = this.createBoardData(3);
    return (
      <div className="grid">
        <h1>Tic Tac Toe</h1>
          {this.createBoardComponents(board)}
      </div>
    );
  }
}

export default Grid;
