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
       {0: [undefined, undefined, undefined],
        1: [undefined, undefined, undefined],
        2: [undefined, undefined, undefined]}
      );
    });
  });

  describe('add tick', () => {
    it('should add x,y ticks to the board', () => {
      const state = {
        0: [undefined, undefined, undefined],
        1: [undefined, undefined, undefined],
        2: [undefined, undefined, undefined]
      };
      const nextState = addTick(state, [0,0,'x']);
      expect(nextState).to.be.like(
        {
          0: ['x', undefined, undefined],
          1: [undefined, undefined, undefined],
          2: [undefined, undefined, undefined]
        }
      );
    });
  });

  describe('check to see if player won', () => {
    it('should check to see if column won', () => {
      const state = {
        0: [undefined, 'x', undefined],
        1: [undefined, 'x', 'y'],
        2: [undefined, 'x', 'y']
      };
      const win = checkColumn(state, 1, 'x');
      expect(win).to.equal(true);
    });

    it('should check to see if column did not win', () => {
      const state = {
        0: [undefined, undefined, undefined],
        1: [undefined, 'x', 'y'],
        2: [undefined, 'x', 'y']
      };
      const win = checkColumn(state, 1, 'x');
      expect(win).to.equal(false);
    });

    it('should check to see if row won', () => {
      const state = {
        0: [undefined, undefined, undefined],
        1: ['x', 'x', 'x'],
        2: [undefined, 'y', 'y']
      };
      const win = checkRow(state, 1, 'x');
      expect(win).to.equal(true);
    });

    it('should check to see if diagonal right won', () => {
      const state = {
        0: ['x', 'y', 'y'],
        1: [undefined, 'x', 'x'],
        2: ['y', undefined, 'x']
      };
      const win = checkDiagonalRight(state, 'x');
      expect(win).to.equal(true);
    });

    it('should check to see if diagonal right won', () => {
      const state = {
        0: ['x', 'y', 'y'],
        1: [undefined, 'x', 'x'],
        2: ['y', undefined, 'x']
      };
      const win = checkDiagonalRight(state, 'x');
      expect(win).to.equal(true);
    });

    it('should check to see if diagonal right did not win', () => {
      const state = {
        0: ['x', 'y', 'y'],
        1: [undefined, 'x', 'x'],
        2: ['y', undefined, 'y']
      };
      const win = checkDiagonalRight(state, 'x');
      expect(win).to.equal(false);
    });

    it('should check to see if diagonal left won', () => {
      const state = {
        0: ['y', 'x', 'x'],
        1: [undefined, 'x', 'y'],
        2: ['x', undefined, 'y']
      };
      const win = checkDiagonalLeft(state, 'x');
      expect(win).to.equal(true);
    });

    it('should check to see if diagonal left did not win', () => {
      const state = {
        0: ['y', 'x', 'x'],
        1: [undefined, 'y', 'y'],
        2: ['x', undefined, 'y']
      };
      const win = checkDiagonalLeft(state, 'x');
      expect(win).to.equal(false);
    });
  });

});
