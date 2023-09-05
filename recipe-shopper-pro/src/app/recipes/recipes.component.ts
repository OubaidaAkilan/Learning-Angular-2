import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipesService } from './recipes.service';
import { Ingredient } from '../shared/ingredient.model';
@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {
  onRecipeItemSelected: Recipe = {
    name: '',
    description: '',
    imagePath: '',
    ingredients: [],
  };

  constructor(private recipesService: RecipesService) {}

  ngOnInit() {
    this.recipesService.recipeSelected.subscribe((recipe: Recipe) => {
      this.onRecipeItemSelected = recipe;
    });
  }
}
