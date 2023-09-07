import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipeItemSelected: Recipe = {
    name: '',
    description: '',
    imagePath: '',
    ingredients: [],
  };
  constructor(private recipesService: RecipesService) {}

  onAddToShoppingList(): void {
    this.recipesService.addIngredientToShoppingList(
      this.recipeItemSelected.ingredients
    );
  }

  ngOnInit() {}
}
