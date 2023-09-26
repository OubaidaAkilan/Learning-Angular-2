import { CounterState, counterReducer } from './counterState/counter.reducer';

export interface StoreState {
  // State 1
  counter: CounterState;

  // State 2
}


export const reducers = {
  counter: counterReducer,
};
