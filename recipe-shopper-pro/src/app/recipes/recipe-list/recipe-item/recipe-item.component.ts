import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipesService } from '../../recipes.service';
@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {
  @Input('recipeId') id: number = 0;
  @Input('recipeItem') recipe: Recipe = {
    name: '',
    description: '',
    imagePath: '',
    ingredients: [],
  };



  constructor(private recipesService: RecipesService) {}

  ngOnInit() {}
}
