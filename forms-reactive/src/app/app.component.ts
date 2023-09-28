import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  FormControl,
  FormGroup,
  Validators,
  AsyncValidatorFn,
  FormArray,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup | any;
  forbiddenUsernams: string[] = ['Chris', 'Anna'];

  ngOnInit(): void {
    // build the structure of our form
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [
          Validators.required,
          this.forbiddenNames.bind(this),
        ]),
        email: new FormControl(null, {
          validators: [Validators.required, Validators.email],
          asyncValidators: [
            this.forbiddenEmails.bind(this) as AsyncValidatorFn,
          ],
          updateOn: 'blur',
        }),
      }),

      gender: new FormControl('male'),
      hobbies: new FormArray([]),
    });
  }

  onSubmit(): void {
    console.log(this.signupForm);
  }

  get controls() {
    return (this.signupForm.get('hobbies') as FormArray).controls;
  }

  onAddHobby(): void {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  //=====Create custom validator
  forbiddenNames(control: FormControl): { [s: string]: boolean } | null {
    if (this.forbiddenUsernams.indexOf(control.value) !== -1) {
      return { nameIsForbidden: true };
    }
    return null;
  }

  // Create Asynchronous validator
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
}
