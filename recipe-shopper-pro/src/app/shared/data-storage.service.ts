import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipesService } from '../recipes/recipes.service';
import { Recipe } from '../recipes/recipe.model';
import { Observable, exhaustMap, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable( {
  providedIn: 'root',
} )
export class DataStorageService {
  constructor (
    private recipeService: RecipesService,
    private http: HttpClient,
    private authService: AuthService
  ) { }

  //===Edit and Store Recipes
  storageRecipes(): void {
    let recipes: Recipe[] = this.recipeService.getRecipesList();

    this.http
      .put(
        'https://ng-recipe-shopper-pro-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe( ( res ) => {
        console.log( res );
      } );
  }

  //===Get List Of Recipes
  fetchRecipes(): any {
    return this.http
      .get<Recipe[]>(
        'https://ng-recipe-shopper-pro-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        tap( ( data ) => {
          this.recipeService.setRecipesList( data );
        } )
      );
  }
}
