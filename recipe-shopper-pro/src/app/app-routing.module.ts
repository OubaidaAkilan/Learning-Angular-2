import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { EditRecipeComponent } from './recipes/recipe-edit/edit-recipe.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    component: RecipesComponent,
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
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
