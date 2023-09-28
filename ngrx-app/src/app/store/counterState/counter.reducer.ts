import { createReducer, on } from '@ngrx/store';
import { decrementCounter, inecrementCounter } from './counter.actions';

export interface CounterState {
  num: number;
}

export const initinalState: CounterState = { num: 0 };

export const counterReducer = createReducer(
  // Supply the initial state
  initinalState,
  // Increase the number of counter
  on( inecrementCounter, ( state, { increaseBy } ) => ( {
    num: state.num + increaseBy,
  } ) ),
  // Decrease the number of counter
  on( decrementCounter, ( state, { decreaseBy } ) => ( {
    num: state.num - decreaseBy,
  } ) )
);
