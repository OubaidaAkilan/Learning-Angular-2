import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { EditRecipeComponent } from './recipes/recipe-edit/edit-recipe.component';
import { RecipesResolveService } from './recipes/recipes-resolve.service';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';

const appRoutes: Routes = [

  {
    path: 'recipes',
    component: RecipesComponent,
    canActivate: [ AuthGuard ],
    children: [
      { path: '', component: RecipeStartComponent, pathMatch: 'full' },
      {
        path: 'new',
        component: EditRecipeComponent,
        pathMatch: 'full',
      },
      {
        path: ':id',
        component: RecipeDetailComponent,
        pathMatch: 'full',
        resolve: [ RecipesResolveService ]
      },
      {
        path: ':id/edit',
        component: EditRecipeComponent,
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'shopping-list',
    component: ShoppingListComponent,
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: AuthComponent,
    pathMatch: 'full',
  },
  { path: '', redirectTo: 'recipes', pathMatch: 'full' },
];
@NgModule( {
  imports: [ RouterModule.forRoot( appRoutes ) ],
  exports: [ RouterModule ],
} )
export class AppRoutingModule { }
