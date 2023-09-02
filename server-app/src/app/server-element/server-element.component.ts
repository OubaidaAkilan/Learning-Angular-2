import { Component, Input } from '@angular/core';
import { Server } from './server.model';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
})
export class ServerElementComponent {
  @Input('srvElement') element: Server ={
    type: '',
    name: '',
    content: ''
  };
}
