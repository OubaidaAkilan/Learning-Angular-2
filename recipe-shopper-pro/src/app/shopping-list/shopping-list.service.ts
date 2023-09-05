import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  getIngrdientsList(): Ingredient[] {
    return this.ingredients;
  }

  addNewIngredient(item: Ingredient): void {
    this.ingredients.push(item);
  }

  addIngredients(ingredients: Ingredient[]): void {
    // for (let ingredient of ingredients) {
    //   this.addNewIngredient(ingredient);
    // }

    this.ingredients.push(...ingredients);
  }
  constructor() {}
}
