import { Component, EventEmitter, Output } from '@angular/core';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
})
export class NewAccountComponent {
  constructor(private accountService: AccountService) {
    this.accountService.statusUpdated.subscribe((status: string): void => {
      alert('the status is' + status);
    });
  }

  createAccount(accountName: string, accountStatus: string) {
    this.accountService.addAccount({
      name: accountName,
      status: accountStatus,
    });

    console.log('A server status changed, new status: ' + accountStatus);
  }
}
