import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  servers: string[] = [];
  serverName: string = 'the default server';
  addNewServer() {
    this.servers.push(this.serverName);
  }

  removeServer(index: number) {
    const position = index + 1;
    this.servers.splice(position, 1);
  }
}
