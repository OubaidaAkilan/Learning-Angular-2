# NgrxApp

1- Create the Store

- Define the StoreState interface that will contain all the states, this step will help me to reacting with the (selectors).

```typescript
export interface StoreState {
  // We will return here to define states that we will work to create them.
}
```

- Define the reducers constant to collect all reducers inside it, this step will help me to import them one time inside app.module.ts file.

```typescript
export const reducers = {
  // We will return here to define reducers that we will work to create them.
};
```

store.ts

```typescript
export interface StoreState {}

export const reducers = {};
```

2- Create the Actions

- Import the `createAction` and `props` functoins.

- Create your actions.

- `createAction`: recive two arguments, the first on is a string that represent the type of action and the second one is optional that represents the payload of action.
- `props`: allow us to specify the shape of the action payload.

counter.actions.ts

```typescript
import { createAction, props } from "@ngrx/store";

export const inecrementCounter = createAction("[Counter Page] Inecrement Counter", props<{ increaseBy: number }>());

export const decrementCounter = createAction("[Counter Page] Decrement Counter", props<{ decreaseBy: number }>());
```

3- Create the Reducer

- Import the `createReducer` and `on` functions.

- Define a blueprint for your state how to should be, this step is so important, it will help us a lot to defind it within StoreState and this blueprint will represent the initial state for us.

```typescript
export interface CounterState {
  num: number;
}
```

- `createReducer`:this reducer handles the state changes in response to the actions.

- `on`:this function is used to specify how the state should change when these actions are dispatched.

counter.reducer.ts

```typescript
import { createReducer, on } from "@ngrx/store";
import { decrementCounter, inecrementCounter } from "./counter.actions";

export interface CounterState {
  num: number;
}

export const initinalState: CounterState = { num: 0 };

export const counterReducer = createReducer(
  // Supply the initial state
  initinalState,
  // Increase the number of counter, this fun. will trigger when dispatch the same action.
  on(inecrementCounter, (state, { increaseBy }) => ({
    num: state.num + increaseBy,
  })),
  // Decrease the number of counter, this fun. will trigger when dispatch the same action.
  on(decrementCounter, (state, { decreaseBy }) => ({
    num: state.num - decreaseBy,
  }))
);
```

4- Now, we will back into `store.ts` file in order to `Define` your state(`counterState`) within `StoreState` interface and `Define` you reducer(`counterReducer`) within reducers constant.

- Define all the initial States within StoreState

```typescript
export interface StoreState {
  // ConterState here represents the interface of initial state for counter
  counter: CounterState;
}
```

- Collect all the reducers within reducers constant

```typescript
export const reducers = {
  counter: counterReducer,
};
```

store.ts

```typescript
import { CounterState, counterReducer } from "./counterState/counter.reducer";

export interface StoreState {
  // ConterState here represents the interface of initial state for counter
  counter: CounterState;
}

export const reducers = {
  counter: counterReducer,
};
```

5- Now, we want to watch our state(`counterState`) using seclector function.

- Import the `createSelector` function.

- We want to find and get a specific part of the state which we previously defined in the store(StateStore).

```typescript
export const selectCounter = (state: StoreState) => state.counter;
```

- Then we will create a new selector using `createSelector` that recive two functions, the first one to select the part of our state related to our state (Here it represents the `selectCounter`), and the second function that takes the selected our state and retrieves the specific part(`num`).

```typescript
// We can simply use `selectTheNumber` to directly get the `num` from the store, which is inside the 'counter' part of our data.
export const selectTheNumber = createSelector(selectCounter, (state: CounterState) => state.num);
```

counter.selectors.ts

```typescript
import { createSelector } from "@ngrx/store";
import { CounterState } from "./counter.reducer";
import { StoreState } from "../store";

export const selectCounter = (state: StoreState) => state.counter;

export const selectTheNumber = createSelector(selectCounter, (state: CounterState) => state.num);
```

6- Go into your main module (our main module here is app.module.ts) and import your `reducers` constant then tell the NgRx to set up the state management system for your angular app.

> In an NgRx-powered Angular application, it's a common practice to have a single centralized store that manages the state for the entire application. This single store contains all the application's state, and various feature modules can use and update the portions of the state that they need.

app.module.ts

```typescript
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { StoreModule } from "@ngrx/store";
import { reducers } from "./store/store";

@NgModule({
  declarations: [AppComponent],

  imports: [BrowserModule, AppRoutingModule, StoreModule.forRoot(reducers)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

7- Inject the Store within your component.

- Import the Store type from ngrx/store.

```typescript
import { Store } from "@ngrx/store";
```

- Inside the constructor of your component Inject this store and give it the type of your state .

```typescript
constructor(private store: Store<StoreState>) {}

```

- To watch the we will use the `select` method to select specific piece of data from your store, which is defiend by the `selectTheNumber` selector, here we will select a number from the store.

> In NgRx, when you use the store.select() method, it returns an Observable that emits values over time. The type of the emitted values is determined by the selector you provide, so if your `selectTheNumber` selector returns a number, the type of count would be `Observable<number>`. and to extract the value you can do `subscribe` and assign value into another property or use the `async` pipe with `count` property in your html file.

```typescript
 currentCount: number = 0;
  public count = this.store.select( selectTheNumber ).subscribe( value => {
    this.currentCount = value;
  } );
```

```html
<h1>{{currentCount }}</h1>
```

OR

```typescript
public count = this.store.select( selectTheNumber );
```

```html
<h1>{{count | async }}</h1>
```

8- Finally we will dispatch our actions.

- Dispatching an action means you are sending a message to the store, indicating that you want to perform a certain operation or change the state.

```typescript
  increase(): void {
    this.store.dispatch( inecrementCounter( { increaseBy: 2 } ) );
  }
```
