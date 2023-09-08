import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private route: Router, private authServic: AuthService) {}

  ngOnInit() {}

  loadServer1(id: number): void {
    this.route.navigate(['/servers', id, 'edit'], {
      queryParams: { allowEdit: '1' },
      fragment: 'loading',
    });
  }

  login() {
    this.authServic.login();
  }

  logout() {
    this.authServic.logout();
  }
}
