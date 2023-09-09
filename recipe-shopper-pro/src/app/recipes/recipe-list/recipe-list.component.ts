import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RecipesService } from '../recipes.service';

import { Recipe } from '../recipe.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] | undefined;

  constructor(
    private recipesServices: RecipesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.recipes = this.recipesServices.getRecipesList();
  }

  newRecipe(): void {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
