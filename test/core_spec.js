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
            xAxis: undefined
          }
        }
      );
    });
  });

  describe('add tick', () => {
    it('should add x,y ticks to the board', () => {
      const state = createBoard(3);
      const nextState = addTick(state, [0,0,'x']);
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
            xAxis: 0
          }
        }
      );
    });
  });

  describe('check to see if player won', () => {
    it('should check to see if column won', () => {
      const state = createBoard(3);
      const nextState1 = addTick(state, [0,1,'x']);
      const nextState2 = addTick(state, [1,1,'x']);
      const nextState3 = addTick(state, [2,1,'x']);
      const win = checkColumn(nextState3, 1, 'x');
      expect(win).to.equal(true);
    });

    it('should check to see if column did not win', () => {
      const state = createBoard(3);
      const nextState1 = addTick(state, [0,0,'x']);
      const nextState2 = addTick(state, [1,1,'x']);
      const nextState3 = addTick(state, [2,1,'x']);
      const win = checkColumn(nextState3, 1, 'x');
      expect(win).to.equal(nextState3);
    });

    it('should check to see if row won', () => {
      const state = createBoard(3);
      const nextState1 = addTick(state, [0,0,'x']);
      const nextState2 = addTick(state, [0,1,'x']);
      const nextState3 = addTick(state, [0,2,'x']);
      const win = checkRow(nextState3, 0, 'x');
      expect(win).to.equal(true);
    });

    it('should check to see if row did not win', () => {
      const state = createBoard(3);
      const nextState1 = addTick(state, [1,0,'x']);
      const nextState2 = addTick(state, [0,1,'x']);
      const nextState3 = addTick(state, [0,2,'x']);
      const win = checkRow(nextState3, 0, 'x');
      expect(win).to.equal(nextState3);
    });

    it('should check to see if diagonal right won', () => {
      const state = createBoard(3);
      const nextState1 = addTick(state, [0,0,'x']);
      const nextState2 = addTick(state, [1,1,'x']);
      const nextState3 = addTick(state, [2,2,'x']);
      const win = checkDiagonalRight(nextState3, 'x');
      expect(win).to.equal(true);
    });

    it('should check to see if diagonal right did not win', () => {
      const state = createBoard(3);
      const nextState1 = addTick(state, [1,0,'x']);
      const nextState2 = addTick(state, [1,1,'x']);
      const nextState3 = addTick(state, [2,2,'x']);
      const win = checkDiagonalRight(nextState3, 'x');
      expect(win).to.equal(nextState3);
    });

    it('should check to see if diagonal left won', () => {
      const state = createBoard(3);
      const nextState1 = addTick(state, [0,2,'x']);
      const nextState2 = addTick(state, [1,1,'x']);
      const nextState3 = addTick(state, [2,0,'x']);
      const win = checkDiagonalLeft(nextState3, 'x');
      expect(win).to.equal(true);
    });

    it('should check to see if diagonal left did not win', () => {
      const state = createBoard(3);
      const nextState1 = addTick(state, [0,0,'x']);
      const nextState2 = addTick(state, [1,1,'x']);
      const nextState3 = addTick(state, [2,0,'x']);
      const win = checkDiagonalLeft(nextState3, 'x');
      expect(win).to.equal(nextState3);
    });
  });

});
