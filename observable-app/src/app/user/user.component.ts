import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from './user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit, OnDestroy {
  id: number = 0;
  isActivated: boolean = false;
  activatedSub: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
    });

    this.activatedSub = this.userService.activatedEmmiter.subscribe(
      (status) => {
        this.isActivated = status;
      }
    );
  }

  ngOnDestroy(): void {
    this.activatedSub?.unsubscribe();
  }

  activated(): void {
    this.userService.activatedEmmiter.next(!this.isActivated);
  }
}
