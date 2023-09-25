import { Component, EventEmitter, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipesService } from '../recipes/recipes.service';

@Component( {
  selector: 'app-header',
  templateUrl: './header.component.html',
} )
export class HeaderComponent {
  @Output() onFeatured = new EventEmitter<string>();

  constructor ( private DSS: DataStorageService, private recipeService: RecipesService ) { }

  onSelected( feature: string ) {
    this.onFeatured.emit( feature );
  }

  onSaveRecipe(): void {
    this.DSS.storageRecipes();
  }

  onFetchRecipes(): any {
    this.DSS.fetchRecipes().subscribe();
  }
}
