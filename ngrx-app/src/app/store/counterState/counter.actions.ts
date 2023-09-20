import { createAction, props } from '@ngrx/store';

export const inecrementCounter = createAction(
  '[Counter Page] Inecrement Counter',
  props<{ increaseBy: number }>()
);

export const decrementCounter = createAction(
  '[Counter Page] Decrement Counter',
  props<{ decreaseBy: number }>()
);
