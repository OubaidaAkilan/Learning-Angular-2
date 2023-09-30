import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable( {
  providedIn: 'root',
} )
export class AuthService {
  constructor ( private http: HttpClient ) { }

  private handleError( errorRes: HttpErrorResponse ) {
    let errorMsg = 'An unknown error occurred!';

    if ( !errorRes.error || !errorRes.error.error ) {
      return throwError( () => {
        new Error( errorMsg );
      } );
    }

    switch ( errorRes.error.error.message ) {
      case 'EMAIL_EXISTS':
        errorMsg = 'This email exists already ';
        break;

      case 'INVALID_LOGIN_CREDENTIALS':
        errorMsg = 'Verfiy your email or password';
        break;
    }

    return throwError( () => {
      return errorMsg;
    } );
  }

  signup( email: string, password: string ): any {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC40h1P5VZoEWateh6tA5CzwxgXK-krUxI',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe( catchError( this.handleError ) );
  }

  login( email: string, password: string ): any {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC40h1P5VZoEWateh6tA5CzwxgXK-krUxI',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe( catchError( this.handleError ) );
  }
}
