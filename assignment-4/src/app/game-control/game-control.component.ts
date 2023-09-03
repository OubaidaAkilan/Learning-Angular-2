import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css'],
})
export class GameControlComponent {
  @ViewChild('incrementingNumber') incrementingNumber: ElementRef | undefined;

  lastNumber: number = 0;

  @Output('holdNumberStart') holdNumberStart = new EventEmitter<number>();

  @Output('stopTimer') stopTimer = new EventEmitter<any>();

  interval: any;

  onStart() {
    this.lastNumber = this.incrementingNumber?.nativeElement.textContent * 1;
    this.interval = setInterval(() => {
      this.holdNumberStart.emit(this.lastNumber + 1);
      this.lastNumber++;
    }, 1000);
  }

  clearTimer() {
    clearInterval(this.interval);
  }
}
