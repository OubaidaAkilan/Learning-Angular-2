import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';
import { Router } from '@angular/router';

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
  constructor ( private http: HttpClient, private router: Router ) { }

  user = new BehaviorSubject<User | null>( null );

  tokenExpirationTimer: any;

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
      .pipe(
        catchError( this.handleError ),
        tap( ( resData ) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        } )
      );
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
      .pipe(
        catchError( this.handleError ),
        tap( ( resData ) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        } )
      );
  }

  logout() {
    this.user.next( null );
    this.router.navigate( [ '/auth' ] );
    localStorage.removeItem( 'userData' );

    if ( this.tokenExpirationTimer ) {
      clearTimeout( this.tokenExpirationTimer );
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout( expirationDuration: number ) {
    this.tokenExpirationTimer = setTimeout( () => {
      this.logout();
    }, expirationDuration );
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationData: string;
    } = JSON.parse( localStorage.getItem( 'userData' )! );

    if ( !userData ) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date( userData._tokenExpirationData )
    );

    if ( loadedUser.token ) {

      const expirationDuration =
        new Date( userData._tokenExpirationData ).getTime() -
        new Date().getTime();

      this.autoLogout( expirationDuration );

      this.user.next( loadedUser );
    }
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date( new Date().getTime() + expiresIn * 1000 );

    const user = new User( email, userId, token, expirationDate );

    this.user.next( user );

    this.autoLogout( expiresIn * 1000 );
    localStorage.setItem( 'userData', JSON.stringify( user ) );
  }

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
}
