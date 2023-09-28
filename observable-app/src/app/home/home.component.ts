import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSubscription: Subscription | undefined;

  constructor() {}

  ngOnInit() {
    const customIntervalObservable =new Observable((observer: any) => {
      let count = 0;
      setInterval(() => {
        if (count === 5) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error('Counter is greater than 3'));
        } else {
          observer.next(count);
        }
        count++;
      }, 1000);
    });

    this.firstObsSubscription = customIntervalObservable
      .pipe(
        map((data: any) => {
          return 'Round :' + data;
        })
      )
      .subscribe(
        (data: any) => {
          console.log(data);
        },
        (error: any) => {
          console.log(error);
        },
        () => {
          console.log('Completed');
        }
      );
  }

  ngOnDestroy(): void {
    this.firstObsSubscription?.unsubscribe();
  }
}
