import chai, {expect} from 'chai';
import {addTick,
        createBoard,
        checkColumn,
        checkRow,
        checkDiagonalRight,
        checkDiagonalLeft} from '../src/core';


describe('application logic', () => {

  describe('create board', () => {
    it('should create a matrix of n by n', () => {
      const board = createBoard(3);
      expect(board).to.be.like(
       {
          board:{
            0: [undefined, undefined, undefined],
            1: [undefined, undefined, undefined],
            2: [undefined, undefined, undefined]
          },
          lastTick: {
            tick: undefined,
            yAxis: undefined,
            xAxis: undefined,
            numberOfTicks: 0
          }
        }
      );
    });
  });

  describe('add tick', () => {
    it('should add x,y ticks to the board', () => {
      const state = createBoard(3);
      const nextState = addTick(state, [0,0]);
      expect(nextState).to.be.like(
       {
          board:{
            0: ['x', undefined, undefined],
            1: [undefined, undefined, undefined],
            2: [undefined, undefined, undefined]
          },
          lastTick: {
            tick: 'x',
            yAxis: 0,
            xAxis: 0,
            numberOfTicks: 1
          }
        }
      );
    });
  });

  describe('check to see if player won', () => {
    it('should check to see if column won', () => {
      const state = createBoard(3);
      const nextStateX1 = addTick(state, [0,1]);
      const nextStateO1 = addTick(state, [0,0]);
      const nextStateX2 = addTick(state, [1,1]);
      const nextStateO2 = addTick(state, [0,2]);
      const nextStateX3 = addTick(state, [2,1]);
      const win = checkColumn(nextStateX3, 1, 'x');
      expect(win).to.equal(true);
    });

    it('should check to see if column did not win', () => {
      const state = createBoard(3);
      const nextStateX1 = addTick(state, [0,0]);
      const nextStateO1 = addTick(state, [1,0]);
      const nextStateX2 = addTick(state, [1,1]);
      const nextStateO2 = addTick(state, [2,0]);
      const nextStateX3 = addTick(state, [2,1]);
      const win = checkColumn(nextStateX3, 1, 'x');
      expect(win).to.equal(nextStateX3);
    });

    it('should check to see if row won', () => {
      const state = createBoard(3);
      const nextStateX1 = addTick(state, [0,0]);
      const nextStateO1 = addTick(state, [1,0]);
      const nextStateX2 = addTick(state, [0,1]);
      const nextStateO2 = addTick(state, [2,0]);
      const nextStateX3 = addTick(state, [0,2]);
      const win = checkRow(nextStateX3, 0, 'x');
      expect(win).to.equal(true);
    });

    it('should check to see if row did not win', () => {
      const state = createBoard(3);
      const nextStateX1 = addTick(state, [1,0]);
      const nextStateO1 = addTick(state, [0,0]);
      const nextStateX2 = addTick(state, [0,1]);
      const nextStateO2 = addTick(state, [2,0]);
      const nextStateX3 = addTick(state, [0,2]);
      const win = checkRow(nextStateX3, 0, 'x');
      expect(win).to.equal(nextStateX3);
    });

    it('should check to see if diagonal right won', () => {
      const state = createBoard(3);
      const nextStateX1 = addTick(state, [0,0]);
      const nextStateO1 = addTick(state, [1,0]);
      const nextStateX2 = addTick(state, [1,1]);
      const nextStateO2 = addTick(state, [2,0]);
      const nextStateX3 = addTick(state, [2,2]);
      const win = checkDiagonalRight(nextStateX3, 'x');
      expect(win).to.equal(true);
    });

    it('should check to see if diagonal right did not win', () => {
      const state = createBoard(3);
      const nextStateX1 = addTick(state, [1,0]);
      const nextStateX2 = addTick(state, [1,1]);
      const nextStateX3 = addTick(state, [2,2]);
      const win = checkDiagonalRight(nextStateX3, 'x');
      expect(win).to.equal(nextStateX3);
    });

    it('should check to see if diagonal left won', () => {
      const state = createBoard(3);
      const nextStateX1 = addTick(state, [0,2]);
      const nextStateO1 = addTick(state, [1,0]);
      const nextStateX2 = addTick(state, [1,1]);
      const nextStateO2 = addTick(state, [0,0]);
      const nextStateX3 = addTick(state, [2,0]);
      const win = checkDiagonalLeft(nextStateX3, 'x');
      expect(win).to.equal(true);
    });

    it('should check to see if diagonal left did not win', () => {
      const state = createBoard(3);
      const nextStateX1 = addTick(state, [0,0]);
      const nextStateX2 = addTick(state, [1,1]);
      const nextStateX3 = addTick(state, [2,0]);
      const win = checkDiagonalLeft(nextStateX3, 'x');
      expect(win).to.equal(nextStateX3);
    });
  });

});
