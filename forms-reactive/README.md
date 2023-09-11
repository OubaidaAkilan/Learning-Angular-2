# Reactive-Form

This README provides instructions on how to create and work with a reactive form in your Angular application. A reactive form is a powerful way to manage forms in Angular using TypeScript.


## Bind the Form (HTML file) with Business Logic (TS file)

1- Import the `ReactiveFormsModule` within your `app.module.ts` file:

   ```typescript
   import { ReactiveFormsModule } from '@angular/forms';
   
   @NgModule({
     imports: [ReactiveFormsModule],
     // ...
   })
   export class AppModule { }
  ```
2- Inside your TypeScript file, define the structure of your form using `FormGroup` and `FormControl` classes:
   ```typescript
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

this.signupForm = new FormGroup({
  userData: new FormGroup({
    username: new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
    email: new FormControl(null, {
      validators: [Validators.required, Validators.email],
      asyncValidators: [this.forbiddenEmails.bind(this)],
      updateOn: 'blur',
    }),
  }),
  gender: new FormControl('male'),
  hobbies: new FormArray([]),
});

  ```
3- The `FormControl` object takes three arguments:

  - The first argument is the initial value.
  - The second argument is an array of validators.
  - The third argument is for asynchronous validators (optional).

4- To connect the TypeScript file with the HTML file (the structure of your form with elements within HTML), add the `[formGroup]="signupForm"` directive to the form tag:
   ```html
<form [formGroup]="signupForm">
  ```
5- Add the `formControlName` directive to input tags to bind them with FormControl:
   ```html
<input formControlName="username" />
  ```
6- Ensure the form has a submit button, If you want to use other buttons, make sure to set their type to "button.":
   ```html
<button type="submit">Add</button>
  ```

7- Don't forget to add the ngSubmit event to submit the form:
   ```html
<form [formGroup]="signupForm" (ngSubmit)="onSubmit">
  ```
8- When working with reactive forms, you cannot use ngModel to access controls. Instead, use the following approach:
   ```html
<span class="err_text" *ngIf="signupForm.get('userData.username').hasError('nameIsForbidden')">
  This name is invalid
</span>

  ```
## Validations
Note that you cannot use HTML attribute validations (e.g., `required`, `email`, `pattern`) with reactive forms. Instead, use the following methods:
1- Built-in Validators:
```typescript
email: new FormControl(null, {
  validators: [Validators.required, Validators.email],
})
```
  - `Validators.required`: Ensures that the field cannot be left empty.
  - `Validators.email`: Validates that the field contains a valid email address.
2- Create Custom Validators:
- To create a synchronous custom validator, follow these steps:
```typescript
//=====How to invoke a synch custom validator
username: new FormControl(null, [
  Validators.required,
  this.forbiddenNames.bind(this),
]);

// Define the custom validator function
forbiddenNames(control: FormControl): { [s: string]: boolean } | null {
  if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
    return { nameIsForbidden: true };
  }
  return null;
}

```
- To create an asynchronous custom validator, use the following code:
```typescript
 //=====How to invoke an asynch custom validator
email: new FormControl(null, {
  validators: [Validators.required, Validators.email],
  asyncValidators: [  this.forbiddenEmails.bind(this) as AsyncValidatorFn,],
  updateOn: 'blur',
});

// Define the asynchronous custom validator function
forbiddenEmails(control: FormControl): Promise<any> | Observable<any> | null {
  return new Promise<any>((resolve, reject) => {
    setTimeout(() => {
      if (control.value === 'oubaida.jehad@outlook.com') {
        resolve({ emailIsForbidden: true });
      } else {
        resolve(null);
      }
    }, 1500);
  });
}

```

## Form Array
 Is a class in Angular's reactive forms that represents an array of form controls or form groups. It's used to manage a collection of related form controls within a form.
After creating this recipeIngredients FormArray, you can add form controls or form groups to it dynamically using methods like push, insert, or removeAt. It's a way to manage a dynamic list of form elements within a reactive form.
```typescript
  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
// 1
    let recipeIngredients = new FormArray(<any>[]); //===== creating a new instance of a `FormArray` in Angular.

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      if (recipe['ingredients']) {
        for (let ingredient of recipe['ingredients']) {
// 2
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name),
              amount: new FormControl(ingredient.amount),
            })
          );
        }
      }
    }

    this.recipeFrom = new FormGroup({
      name: new FormControl(recipeName),
      imagePath: new FormControl(recipeImagePath),
      description: new FormControl(recipeDescription),
      ingredients: recipeIngredients,
    });
  }

// 3 
  get controls() {
    // a getter!  To access a specific control within an Angular reactive form using the get method and casting it to the FormArray type.
    return (this.recipeFrom.get('ingredients') as FormArray).controls;
  }
```
html.file
```html
      <div class="row">
        <div class="col-xs-12" formArrayName="ingredients">
          <div
            [ngStyle]="{ marginBottom: '1.5rem' }"
            class="row"
            *ngFor="let ingredientCtrl of controls; let i = index"
            [formGroupName]="i"
          >
<!-- The formGroupName directive above ensures that the form control structure is correctly associated with each <div> element,
allowing for effective data binding and form handling.
 -->
            <div class="col-xs-8">
              <input type="text" class="form-control" formControlName="name" />
            </div>
            <div class="col-xs-2">
              <input
                type="number"
                class="form-control"
                formControlName="amount"
              />
            </div>
            <div class="col-xs-2">
              <button class="btn btn-danger" type="button">X</button>
            </div>
          </div>
        </div>
      </div>
```
