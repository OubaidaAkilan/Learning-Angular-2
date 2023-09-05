import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipesService } from '../../recipes.service';
@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {
  @Input('recipeItem') recipe: Recipe = {
    name: '',
    description: '',
    imagePath: '',
    ingredients: [],
  };

  selectRecipe() {
    this.recipesService.recipeSelected.emit(this.recipe);
  }

  constructor(private recipesService: RecipesService) {}

  ngOnInit() {}
}
