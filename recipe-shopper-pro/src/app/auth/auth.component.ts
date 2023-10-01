import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Component( {
  templateUrl: './auth.component.html',
  styleUrls: [ './auth.component.css' ],
} )
export class AuthComponent {
  constructor ( private authService: AuthService ) { }

  isLoginMode: boolean = false;
  isLoading: boolean = false;
  errorMsg: any;
  isError: boolean = false;

  switchTo(): void {
    this.isLoginMode = !this.isLoginMode;
    console.log( this.isLoginMode );
  }

  onSubmit( form: NgForm ): void {
    this.isLoading = true;

    let authObs: Observable<AuthResponseData>;

    if ( !form.valid ) {
      return;
    }
    const { email, password } = form.value;

    if ( this.isLoginMode ) {
      authObs = this.authService.login( email, password );
    } else {
      authObs = this.authService.signup( email, password );
    }

    authObs.subscribe( {
      next: ( resData: any ) => {
        this.isLoading = false;
      },
      error: ( err: any ) => {
        this.errorMsg = err;
        this.isLoading = false;
        this.isError = true;
      },
    } );
  }
}
