import {expect} from 'chai';
import reducer from '../src/reducer';

describe('reducer', () => {

  it('handles CREATE_BOARD', () => {
    const initialState = {};
    const action = {
      type: 'CREATE_BOARD',
      size: 3
    };
    const state = reducer(initialState, action);

    expect(state).to.be.like({
       0: [undefined, undefined, undefined],
       1: [undefined, undefined, undefined],
       2: [undefined, undefined, undefined]
     });
  });

  it('handles ADD_TICK', () => {
    const initialState = {};
    const actions = [
      {type: 'CREATE_BOARD', size: 3},
      {type: 'ADD_TICK', tick: [1,0,'x']}
    ];
    const state = actions.reduce(reducer, initialState);

    expect(state).to.be.like({
      0: [undefined, 'x', undefined],
      1: [undefined, undefined, undefined],
      2: [undefined, undefined, undefined]
    });
  });

  it('handles CHECK_COLUMN', () => {
    const initialState = {};
    const actions = [
      {type: 'CREATE_BOARD', size: 3},
      {type: 'ADD_TICK', tick: [0,0,'x']},
      {type: 'ADD_TICK', tick: [0,1,'x']},
      {type: 'ADD_TICK', tick: [0,2,'x']},
      {type: 'CHECK_COLUMN', column:0, tick: 'x'}
    ];
    const state = actions.reduce(reducer, initialState);
    expect(state).to.equal(true);
  });

  it('handles CHECK_ROW', () => {
    const initialState = {};
    const actions = [
      {type: 'CREATE_BOARD', size: 3},
      {type: 'ADD_TICK', tick: [0,0,'x']},
      {type: 'ADD_TICK', tick: [1,0,'x']},
      {type: 'ADD_TICK', tick: [2,0,'x']},
      {type: 'CHECK_ROW', row:0, tick: 'x'}
    ];
    const state = actions.reduce(reducer, initialState);
    expect(state).to.equal(true);
  });

  it('handles CHECK_DIAGONAL_RIGHT', () => {
    const initialState = {};
    const actions = [
      {type: 'CREATE_BOARD', size: 3},
      {type: 'ADD_TICK', tick: [0,0,'x']},
      {type: 'ADD_TICK', tick: [1,1,'x']},
      {type: 'ADD_TICK', tick: [2,2,'x']},
      {type: 'CHECK_DIAGONAL_RIGHT', tick: 'x'}
    ];
    const state = actions.reduce(reducer, initialState);
    expect(state).to.equal(true);
  });

  it('handles CHECK_DIAGONAL_LEFT', () => {
    const initialState = {};
    const actions = [
      {type: 'CREATE_BOARD', size: 3},
      {type: 'ADD_TICK', tick: [2,0,'x']},
      {type: 'ADD_TICK', tick: [1,1,'x']},
      {type: 'ADD_TICK', tick: [0,2,'x']},
      {type: 'CHECK_DIAGONAL_LEFT', tick: 'x'}
    ];
    const state = actions.reduce(reducer, initialState);
    expect(state).to.equal(true);
  });

});
