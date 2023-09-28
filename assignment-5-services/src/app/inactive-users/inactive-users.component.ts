import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrls: ['./inactive-users.component.css'],
})
export class InactiveUsersComponent implements OnInit {
  users: string[] = [];

  constructor(private userService: UsersService) {}
  ngOnInit() {
    this.users = this.userService.inActiveUsers;
  }
  onSetToActive(idx: number) {
    this.userService.setToActive(idx);
  }
}
