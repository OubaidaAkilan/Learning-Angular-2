import { Component } from '@angular/core';
import { ShoppingListService } from './shopping-list/shopping-list.service';

@Component( {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],

} )
export class AppComponent {
  currentTap: string = 'recipes';

  setFeature( feature: string ) {
    this.currentTap = feature;
  }

  constructor (

  ) { }
}
