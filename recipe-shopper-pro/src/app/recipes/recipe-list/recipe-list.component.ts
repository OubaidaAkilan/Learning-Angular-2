import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { RecipesService } from '../recipes.service';

import { Recipe } from '../recipe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component( {
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: [ './recipe-list.component.css' ],
} )
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes!: Recipe[];

  subscription: Subscription | undefined

  constructor (
    private recipesServices: RecipesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit() {
    this.recipes = this.recipesServices.getRecipesList();

    this.subscription = this.recipesServices.recipesChange.subscribe( ( res ) => {

      this.recipes = res;

    } )

  }

  newRecipe(): void {
    this.router.navigate( [ 'new' ], { relativeTo: this.route } );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
