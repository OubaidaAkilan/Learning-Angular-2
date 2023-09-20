import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  decrementCounter,
  inecrementCounter,
} from './store/counterState/counter.actions';
import { selectTheNumber } from './store/counterState/counter.selectors';
import { StoreState } from './store/store';

@Component( {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
} )
export class AppComponent {
  public count = this.store.select( selectTheNumber );

  // 5- Inject The Store within Component
  // To watch the stor you should inject the Store
  constructor ( private store: Store<StoreState> ) {
    // this.store.subscribe((data) => (this.count = data.counter.num));
    // using Selector
    
  }

  increase(): void {
    // 6- Using Dispatch to determin the type of action to update on store
    // To dispatch the action into stor
    console.log( this.count );
    this.store.dispatch( inecrementCounter( { increaseBy: 2 } ) );
  }

  decrease(): void {
    this.store.dispatch( decrementCounter( { decreaseBy: 1 } ) );
  }
}
