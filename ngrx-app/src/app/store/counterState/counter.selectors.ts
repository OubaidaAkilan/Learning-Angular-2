import { createSelector } from '@ngrx/store';
import { CounterState } from './counter.reducer';
import { StoreState } from '../store';

export const selectCounter = ( state: StoreState ) => state.counter;

export const selectTheNumber = createSelector(
  selectCounter,
  ( state: CounterState ) => state.num
);
