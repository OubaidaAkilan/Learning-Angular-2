import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';

@Injectable( {
  providedIn: 'root'
} )
export class RecipesResolveService implements Resolve<Recipe[]> {

  constructor ( private DDS: DataStorageService ) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): any {
    return this.DDS.fetchRecipes();
  }
}

