import { Injectable } from '@angular/core';
import { CounterService } from './counter.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  activeUsers = ['Max', 'Anna'];
  inActiveUsers = ['Chris', 'Manu'];

  constructor(private counterService: CounterService) {}

  setToActive(index: number): void {
    this.activeUsers.push(this.inActiveUsers[index]);
    this.inActiveUsers.splice(index, 1);
    this.counterService.incrementalCounterFrominActiveToActive();
    console.log(
      this.counterService.counterInActiveToActive,
      'inactive to active'
    );
  }

  setToInActive(index: number): void {
    this.inActiveUsers.push(this.activeUsers[index]);
    this.activeUsers.splice(index, 1);
    this.counterService.incrementalCounterFromActiveToInActive();
    console.log(
      this.counterService.counterActiveToInActive,
      'active to inactive'
    );
  }
}
