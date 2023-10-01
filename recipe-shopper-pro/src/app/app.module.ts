import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';

import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { EditRecipeComponent } from './recipes/recipe-edit/edit-recipe.component';

import { DropdownMenuDirective } from './shared/directives/dropdown-menu.directive';

import { ShoppingListService } from './shopping-list/shopping-list.service';
import { DataStorageService } from './shared/data-storage.service';
import { RecipesService } from './recipes/recipes.service';
import { AuthComponent } from './auth/auth.component';
import { SpinnerLoadingComponent } from './shared/spinner-loading/spinner-loading.component';

@NgModule( {
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropdownMenuDirective,
    RecipeStartComponent,
    EditRecipeComponent,
    AuthComponent,
    SpinnerLoadingComponent,
  ],
  imports: [ BrowserModule, FormsModule, ReactiveFormsModule, AppRoutingModule, HttpClientModule ],
  providers: [ ShoppingListService, RecipesService, DataStorageService ],
  bootstrap: [ AppComponent ],
} )
export class AppModule { }
