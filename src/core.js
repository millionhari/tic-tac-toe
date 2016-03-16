// TODO: ALTERNATE BETWEEN X AND O in add tick

function alternateTicks(tick){
  if (tick === 'x'){
    return 'o';
  } else {
    return 'x';
  }
}

export function addTick(state, input){
  if (state.board[input[0]][input[1]] === undefined){
    const newState = state;
    let tick = alternateTicks(state.lastTick.tick);
    newState.board[input[0]][input[1]] = tick;
    newState.lastTick = {
      yAxis: input[0],
      xAxis: input[1],
      tick: tick,
      numberOfTicks: state.lastTick.numberOfTicks+1
    };
    return newState;
  } else {
    return state;
  }
}

export function createBoard(n) {
  let state = {
    lastTick: {
      xAxis: undefined,
      yAxis: undefined,
      tick: undefined,
      numberOfTicks: 0
    }
  };
  let board = {};
  for (let i = 0; i < n; i++){
    let row = [];
    for (let j = 0; j < n; j++){
      row.push(undefined);
    }
    board[i] = row;
  }
  state.board = board;
  return state;
}

export function checkColumn(state, column, tick){
  if (state === true){
    return true;
  } else {
    for (let i in state.board){
      if (state.board[i][column] !== tick){
        return state;
      }
    }
    return true;
  }
}

export function checkRow(state, row, tick) {
  if (state === true){
    return true;
  } else {
    for (let i = 0; i < state.board[row].length; i++){
      if (state.board[row][i] !== tick){
        return state;
      }
    }
    return true;
  }
}

export function checkDiagonalRight(state, tick) {
  if (state === true){
    return true;
  } else {
    let position = 0;
    for (let i in state.board){
      if (state.board[i][position] !== tick){
        return state;
      }
      position++;
    }
    return true;
  }
}

export function checkDiagonalLeft(state, tick) {
  if (state === true){
    return true;
  } else {
    let position = state.board[0].length-1;
    for (let i in state.board){
      if (state.board[i][position] !== tick){
        return state;
      }
      position--;
    }
    return true;
  }
}
