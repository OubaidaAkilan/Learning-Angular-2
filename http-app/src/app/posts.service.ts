import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject, catchError, map, throwError } from 'rxjs';
import { Post } from './post.model';

@Injectable( {
  providedIn: 'root',
} )
export class PostsService {
  error = new Subject<string>();

  constructor ( private http: HttpClient ) { }

  //=====Post a post
  createAndStorPost( title: string, content: string ): void {
    // Send Http request
    const postData = { title, content };
    this.http
      .post<{ name: string }>(
        'https://angular-test-f1a3b-default-rtdb.firebaseio.com/posts.json',
        postData
      )
      .subscribe( {
        next: ( responseData ) => {
          console.log( responseData );
        },
        error: ( err ) => {
          this.error.next( err.message );
        },
      } );
  }

  //=====Get all Posts
  fetchPosts(): Observable<any> {
    //---To add multiple params
    let searchParams = new HttpParams();
    searchParams = searchParams.append( 'print', 'pretty' );
    searchParams = searchParams.append( 'custom', 'key' );


    return this.http
      .get<{ [ key: string ]: Post }>(
        'https://angular-test-f1a3b-default-rtdb.firebaseio.com/posts.json',
        {
          headers: new HttpHeaders( {
            'Custom-Header': 'Hello'
          } ),
          params: searchParams
        }
      )
      .pipe(
        map( ( responseData: { [ key: string ]: Post } ): Post[] => {
          const postArray: Post[] = [];

          for ( const key in responseData ) {
            if ( responseData.hasOwnProperty( key ) )
              postArray.push( { ...responseData[ key ], id: key } );
          }

          return postArray;
        } ),
        catchError( ( errMsg ) => {
          return throwError(
            () =>
              new Error(
                errMsg.message +
                ' 🙋‍♂️ Hello Hello Custom Error From Catch Error Operator'
              )
          );
        } )
      );
  }

  // Delete all Posts
  deletePosts(): Observable<any> {
    return this.http.delete(
      'https://angular-test-f1a3b-default-rtdb.firebaseio.com/posts.json'
    );
  }
}
