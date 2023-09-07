import { Component } from '@angular/core';
import { RecipesService } from './recipes/recipes.service';
import { ShoppingListService } from './shopping-list/shopping-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [RecipesService, ShoppingListService],
})
export class AppComponent {
  currentTap: string = 'recipes';

  setFeature(feature: string) {
    this.currentTap = feature;
  }

  constructor(
    private recipesServices: RecipesService,
    private shoppingListService: ShoppingListService
  ) {}
}
