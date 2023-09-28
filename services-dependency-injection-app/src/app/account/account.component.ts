import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoggingServiceService } from '../logging-service.service';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent {
  @Input() account: { name: string; status: string } = { name: '', status: '' };
  @Input() id: number = 0;

  constructor(
    private accountService: AccountService,
    private LoggingServiceService: LoggingServiceService
  ) {}

  SetTo(status: string) {
    this.accountService.updateStatus({ id: this.id, newStatus: status });
    this.LoggingServiceService.logStatus(status);
    this.accountService.statusUpdated.emit(status);
  }
}
