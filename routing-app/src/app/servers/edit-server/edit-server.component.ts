import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CanComponentDeactivate } from './can-deactivate-guard.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css'],
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: { id: number; name: string; status: string } = {
    id: 0,
    name: '',
    status: '',
  };

  serverName = '';
  serverStatus = '';
  allowEdit: boolean = false;
  changesSaved: boolean = false;

  constructor(
    private serversService: ServersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.params['id']; // id = '1' so I add the pluse to convert string into number
    this.server = this.serversService.getServer(id);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;

    // this.route.params.subscribe((params: Params) => {
    //   this.server = this.serversService.getServer(+params['id']); // id = '1' so I add the pluse to convert string into number
    //   this.serverName = this.server.name;
    //   this.serverStatus = this.server.status;
    // });

    this.route.queryParams.subscribe((queryParams: Params) => {
      this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
    });
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {
      name: this.serverName,
      status: this.serverStatus,
    });
    this.changesSaved = true;
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  canDeactivateComponent(): Observable<boolean> | Promise<boolean> | boolean {
    // Here I will add all my logic to decide
    if (!this.allowEdit) {
      return true;
    }
    if (
      (this.server.name !== this.serverName ||
        this.server.status !== this.serverStatus) &&
      !this.changesSaved
    ) {
      return confirm('Do you want this card to changes?');
    } else {
      return true;
    }
  }
}
