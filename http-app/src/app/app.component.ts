import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription, map } from 'rxjs';
import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component( {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
} )
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isLoading: boolean = false;
  error: any = null
  private errorSub: Subscription | undefined;
  constructor ( private http: HttpClient, private postsService: PostsService ) { }


  ngOnInit() {

    this.errorSub = this.postsService.error.subscribe( errMsg => {
      this.error = errMsg;
    } )


    this.isLoading = true;
    this.postsService.fetchPosts().subscribe( {
      next: ( res ) => {
        this.loadedPosts = res;
        this.isLoading = false;
      },
      error: ( err ) => {
        this.error = err.message
        this.isLoading = false;

      },
    } );

  }

  onCreatePost( postData: Post ) {
    // Send Http request
    this.postsService.createAndStorPost( postData.title, postData.content );

  }

  onFetchPosts() {
    // Send Http request
    this.isLoading = true;
    this.postsService.fetchPosts().subscribe( {
      next: ( res ) => {
        this.loadedPosts = res;
        this.isLoading = false;
      },
      error: ( err ) => {
        this.error = err.message
        this.isLoading = false;

      },
    } );
  }

  onClearPosts() {
    // Send Http request
    this.isLoading = true;

    this.postsService.deletePosts().subscribe( () => {

      this.loadedPosts = [];
      this.isLoading = false;

    } );
  }

  onHandleError(): void {
    this.error = null;
  }

  ngOnDestroy(): void {
    this.errorSub?.unsubscribe();
  }
}
