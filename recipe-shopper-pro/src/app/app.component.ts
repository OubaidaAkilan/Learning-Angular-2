import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AuthService } from './auth/auth.service';

@Component( {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
} )
export class AppComponent implements OnInit {
  currentTap: string = 'recipes';

  setFeature( feature: string ) {
    this.currentTap = feature;
  }

  constructor ( private authService: AuthService ) { }


  ngOnInit(): void {
    this.authService.autoLogin()
  }

}
