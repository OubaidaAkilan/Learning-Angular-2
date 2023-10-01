import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipesService } from '../recipes.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css'],
})
export class EditRecipeComponent implements OnInit {
  id: number | any;
  editMode: boolean = false;
  recipeFrom: FormGroup | any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipesService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      // console.log(undefined == null); // true 😶
      this.editMode = params['id'] ? true : false;
      this.initForm();
    });
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray(<any>[]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      if (recipe['ingredients']) {
        for (let ingredient of recipe['ingredients']) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, {
                validators: [Validators.required],
              }),
              amount: new FormControl(ingredient.amount, {
                validators: [
                  Validators.required,
                  Validators.pattern(/^[1-9]+[0-9]*$/),
                ],
              }),
            })
          );
        }
      }
    }

    this.recipeFrom = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients,
    });
  }

  get controls() {
    // a getter!
    return (this.recipeFrom.get('ingredients') as FormArray).controls;
  }

  onAddIngredient(): void {
    (<FormArray>this.recipeFrom.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, {
          validators: [
            Validators.required,
            Validators.pattern(/^[1-9]+[0-9]*$/),
          ],
        }),
      })
    );
  }

  onCancel(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDeleteIngredint(index: number): void {
    (this.recipeFrom.get('ingredients') as FormArray).removeAt(index);
  }

  onSubmitRecipeForm(): void {
    // const newRecipe = new Recipe(
    //   // The orderd is important
    //   this.recipeFrom.value['name'],
    //   this.recipeFrom.value['description'],
    //   this.recipeFrom.value['imagePath'],
    //   this.recipeFrom.value['ingredients']
    // );
    // console.log(this.recipeFrom.value);

    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeFrom.value);
    } else {
      this.recipeService.addRecipe(this.recipeFrom.value);
    }
    this.editMode = false;
  }
}
