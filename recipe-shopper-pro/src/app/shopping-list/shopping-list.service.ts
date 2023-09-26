import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  getIngrdientsList(): Ingredient[] {
    return this.ingredients;
  }

  getIngrdient(index: number): Ingredient {
    return this.ingredients[index];
  }

  addNewIngredient(item: Ingredient): void {
    this.ingredients.push(item);
  }

  updateIngredient(index: number, newIngredient: Ingredient): void {
    this.ingredients[index] = newIngredient;
  }

  addIngredients(ingredients: Ingredient[]): void {
    // for (let ingredient of ingredients) {
    //   this.addNewIngredient(ingredient);
    // }

    this.ingredients.push(...ingredients);
  }

  deleteIngredient(index: number): void {
    this.ingredients.splice(index, 1);
  }
  constructor() {}
}
