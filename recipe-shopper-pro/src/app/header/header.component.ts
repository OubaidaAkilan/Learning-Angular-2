import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipesService } from '../recipes/recipes.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component( {
  selector: 'app-header',
  templateUrl: './header.component.html',
} )
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() onFeatured = new EventEmitter<string>();

  isAuthenticated: boolean = false;

  userSub!: Subscription;

  constructor ( private DSS: DataStorageService, private recipeService: RecipesService, private authService: AuthService ) { }

  ngOnInit(): void {


    this.userSub = this.authService.user.subscribe( ( user ) => {

      // this.isAuthenticated = !user ? false:true;
      this.isAuthenticated = !!user;

    } )
  }

  onSelected( feature: string ) {
    this.onFeatured.emit( feature );
  }

  onSaveRecipe(): void {
    this.DSS.storageRecipes();
  }

  onFetchRecipes(): any {
    this.DSS.fetchRecipes().subscribe();
  }

onLogout():void{
  this.authService.logout();
}

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
