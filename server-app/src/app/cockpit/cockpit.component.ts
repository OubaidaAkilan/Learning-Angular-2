import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css'],
})
export class CockpitComponent {
  // serverName: string = '';
  // serverContent: string = '';

  @ViewChild('inputServerContent') inputServerContent: ElementRef | undefined;

  @Output()
  serverCreated = new EventEmitter<{
    name: string;
    content: string;
  }>();

  @Output('bpCreated') blueprintCreated = new EventEmitter<{
    name: string;
    content: string;
  }>();

  /* 
  The emit method simply informs Angular that the event has occurred and carries any data
  you specify. Angular then ensures that the parent component,
  which is listening for this event, responds accordingly. 
  */
  onAddServer(inputServeName: HTMLInputElement) {
    this.serverCreated.emit({
      name: inputServeName.value,
      content: this.inputServerContent?.nativeElement.value,
    });
  }

  onAddBlueprint(inputServeName: HTMLInputElement) {
    this.blueprintCreated.emit({
      name: inputServeName.value,
      content: this.inputServerContent?.nativeElement.value,
    });
  }

  // removeServer(index: number) {
  //   const position = index;
  //   this.serverElements.splice(position, 1);
  // }
}
