import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CounterService {
  counterActiveToInActive: number = 0;
  counterInActiveToActive: number = 0;

  incrementalCounterFromActiveToInActive(): void {
    this.counterActiveToInActive++;
  }

  incrementalCounterFrominActiveToActive(): void {
    this.counterInActiveToActive++;
  }
  constructor() {}
}
