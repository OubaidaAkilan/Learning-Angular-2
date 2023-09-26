import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('f') signupForm: NgForm | undefined;

  submitted: boolean = false;
  user: any = {
    username: '',
    email: '',
    secret: '',
    answer: '',
    gender: '',
  };
  suggestUsername(): void {
    const suggestedName = 'Superuser';

    // ==========Using setValue
    // this.signupForm?.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: 'tes@test',
    //   },
    //   secret: 'pet',
    //   questionAnswer: '',
    //   gender: 'male',
    // });
    // ==========Using setValue
    this.signupForm?.form.patchValue({
      userData: {
        username: suggestedName,
      },
    });
  }

  defaultQuestion: string = 'teacher';

  answer: string = '';
  genders: string[] = ['male', 'female'];

  // onSubmit(form: NgForm): void {
  //   console.log(form);
  // }

  onSubmit(): void {
    this.submitted = true;

    this.user.username = this.signupForm?.value.userData.username;
    this.user.email = this.signupForm?.value.userData.email;
    this.user.secret = this.signupForm?.value.secret;
    this.user.answer = this.signupForm?.value.questionAnswer;
    this.user.gender = this.signupForm?.value.gender;

    this.signupForm?.reset();
  }
}
