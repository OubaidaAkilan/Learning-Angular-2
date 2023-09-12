import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  id: number | any;
  recipe: Recipe = {
    name: '',
    description: '',
    imagePath: '',
    ingredients: [],
  };

  constructor(
    private recipesService: RecipesService,
    private activedRoute: ActivatedRoute,
    private router: Router
  ) {}

  onAddToShoppingList(): void {
    this.recipesService.addIngredientToShoppingList(this.recipe.ingredients);
  }

  onDeleteRecipe(): void {
    this.recipesService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

  ngOnInit() {
    this.activedRoute.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipe = this.recipesService.getRecipe(this.id);
    });
  }
}
