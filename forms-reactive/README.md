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
