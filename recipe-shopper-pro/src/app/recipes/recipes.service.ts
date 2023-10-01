import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {

 

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'A Big Burger',
  //     'This is simply a test',
  //     'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
  //     [new Ingredient('Meat', 10), new Ingredient('French Fires', 10)]
  //   ),
  //   new Recipe(
  //     'A Test Recipe',
  //     'This is simply a test',
  //     'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
  //     [new Ingredient('Buns', 2), new Ingredient('Meat', 10)]
  //   ),
  // ];

  private recipes: Recipe[] = []


  recipesChange = new BehaviorSubject<Recipe[]>( this.recipes );

  constructor(private slService: ShoppingListService) {}

  setRecipesList( newRecipes: Recipe[] ): any {
  
    this.recipes = newRecipes;
    this.recipesChange.next( newRecipes );

  }

  getRecipesList(): Recipe[] {
    return this.recipes ;
  }

  getRecipe(index: number): Recipe {
    return this.recipes[index];
  }

  addRecipe(newRecipe: Recipe): void {
    this.recipes.push(newRecipe);
    
    // this.recipesChange.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe): void {
    this.recipes[index] = newRecipe;
  }

  deleteRecipe(index: number): void {
    this.recipes.splice(index, 1);
    
  }
  addIngredientToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
}
