import {addTick,
        createBoard,
        checkColumn,
        checkRow,
        checkDiagonalRight,
        checkDiagonalLeft,
        INITIAL_STATE} from './core';

export default function reducer(state = INITIAL_STATE, action){
  switch (action.type) {
    case 'CREATE_BOARD':
      return createBoard(action.size);
    case 'ADD_TICK':
      return addTick(state, action.tick);
    case 'CHECK_COLUMN':
      return checkColumn(state, action.column, action.tick);
    case 'CHECK_ROW':
      return checkRow(state, action.row, action.tick);
    case 'CHECK_DIAGONAL_RIGHT':
      return checkDiagonalRight(state, action.tick);
    case 'CHECK_DIAGONAL_LEFT':
      return checkDiagonalLeft(state, action.tick);
  }
  return state;
}
