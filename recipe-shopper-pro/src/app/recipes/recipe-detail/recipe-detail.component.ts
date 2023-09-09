import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  id: number = 0;
  recipe: Recipe = {
    name: '',
    description: '',
    imagePath: '',
    ingredients: [],
  };

  constructor(
    private recipesService: RecipesService,
    private activedRoute: ActivatedRoute
  ) {}

  onAddToShoppingList(): void {
    this.recipesService.addIngredientToShoppingList(this.recipe.ingredients);
  }

  ngOnInit() {
    
    this.activedRoute.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipe = this.recipesService.getRecipe(this.id);

    });
  }
}
