export function addTick(state, input){
  const newState = state;
  newState[input[1]][input[0]] = input[2];
  return newState;
}

export function createBoard(n) {
  let board = {};
  for (let i = 0; i < n; i++){
    let row = [];
    for (let j = 0; j < n; j++){
      row.push(undefined);
    }
    board[i] = row;
  }
  return board;
}

export function checkColumn(state, column, tick){
  let flag = true;
  if (flag){
    for (let i in state){
      if (state[i][column] !== tick){
        return false;
      }
    }
  }
  return flag;
}

export function checkRow(state, row, tick) {
  let flag = true;
  if (flag){
    for (let i = 0; i < state[row].length; i++){
      if (state[row][i] !== tick){
        return false;
      }
    }
  }
  return flag;
}

export function checkDiagonalRight(state, tick) {
  let flag = true;
  let position = 0;
  for (let i in state){
    if (state[i][position] !== tick){
      return false;
    }
    position++;
  }
  return flag;
}

export function checkDiagonalLeft(state, tick) {
  let flag = true;
  let position = state[0].length-1;
  for (let i in state){
    if (state[i][position] !== tick){
      return false;
    }
    position--;
  }
  return flag;
}

export const INITIAL_STATE = createBoard(3);
