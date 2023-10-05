import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component( {
  templateUrl: './auth.component.html',
  styleUrls: [ './auth.component.css' ],
} )
export class AuthComponent {
  constructor ( private authService: AuthService, private router: Router ) { }

  isLoginMode: boolean = false;
  isLoading: boolean = false;
  errorMsg: any;
  isError: boolean = false;

  switchTo(): void {
    this.isLoginMode = !this.isLoginMode;
    
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
        this.router.navigate( [ '/recipes' ] );
        this.isLoading = true;
      },
      error: ( err: any ) => {
        this.errorMsg = err;
        this.isLoading = false;
        this.isError = true;
      },
    } );
  }
}
